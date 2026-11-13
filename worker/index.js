/* Entry point. Every request passes through here before any file is served
   (run_worker_first in wrangler.jsonc), so nothing but the sign-in page is
   reachable without a session. */

import { json, redirect, methodNotAllowed, withSecurityHeaders, sameOrigin, readJsonObject } from './http.js';
import {
  passphraseMatches, createSession, readSession, endSession, endAllSessions, clearedCookie,
  clientKey, retryAfter, recordFailure, tidyAfterSignIn,
} from './auth.js';
import { getProgress, putProgress } from './progress.js';

/* The only paths served to a browser that is not signed in. */
const PUBLIC_PATHS = new Set(['/login', '/login.css', '/login.js']);
const LOGIN_BODY_BYTES = 2048;

async function signIn(request, env, now) {
  if (!sameOrigin(request)) return json({ error: 'forbidden' }, 403);

  const client = await clientKey(request, env);
  const wait = await retryAfter(env, client, now);
  if (wait) return json({ error: 'too_many_attempts', retryAfter: wait }, 429, { 'Retry-After': String(wait) });

  const body = await readJsonObject(request, LOGIN_BODY_BYTES);
  const passphrase = body.value && typeof body.value.passphrase === 'string' ? body.value.passphrase : '';
  if (!passphrase || !(await passphraseMatches(passphrase, env))) {
    await recordFailure(env, client, now);
    return json({ error: 'unauthorized' }, 401);
  }

  await tidyAfterSignIn(env, client, now);
  return json({ ok: true }, 200, { 'Set-Cookie': await createSession(env, now) });
}

/* Body { "everywhere": true } ends the session on every device. */
async function signOut(request, env, now) {
  if (!sameOrigin(request)) return json({ error: 'forbidden' }, 403);
  const session = await readSession(request, env, now);
  if (session) {
    const body = await readJsonObject(request, LOGIN_BODY_BYTES);
    if (body.value && body.value.everywhere === true) await endAllSessions(env);
    else await endSession(env, session.id);
  }
  return json({ ok: true }, 200, { 'Set-Cookie': clearedCookie() });
}

async function api(request, env, path, session, now) {
  if (!session) return json({ error: 'unauthorized' }, 401);
  if (path !== '/api/progress') return json({ error: 'not_found' }, 404);

  if (request.method === 'GET') return getProgress(env);
  if (request.method === 'PUT') {
    if (!sameOrigin(request)) return json({ error: 'forbidden' }, 403);
    return putProgress(request, env, now);
  }
  return methodNotAllowed('GET, PUT');
}

async function page(request, env, path, session) {
  if (request.method !== 'GET' && request.method !== 'HEAD') return methodNotAllowed('GET, HEAD');

  if (PUBLIC_PATHS.has(path)) {
    if (path === '/login' && session) return redirect('/');
  } else if (!session) {
    return redirect('/login');
  }

  const asset = await env.ASSETS.fetch(request);
  const out = new Response(asset.body, asset);
  /* Never stored by shared caches, and the browser re-checks with us before reusing a copy. */
  out.headers.set('Cache-Control', 'private, no-cache');
  return out;
}

async function handle(request, env) {
  if (!env.SYNC_TOKEN) return json({ error: 'server_not_configured' }, 500);

  const path = new URL(request.url).pathname;
  const now = Date.now();

  if (path === '/api/login') return request.method === 'POST' ? signIn(request, env, now) : methodNotAllowed('POST');
  if (path === '/api/logout') return request.method === 'POST' ? signOut(request, env, now) : methodNotAllowed('POST');

  const session = await readSession(request, env, now);
  const response = path.startsWith('/api/')
    ? await api(request, env, path, session, now)
    : await page(request, env, path, session);
  if (session && session.cookie) response.headers.append('Set-Cookie', session.cookie);   // sliding expiry
  return response;
}

export default {
  async fetch(request, env) {
    try {
      return withSecurityHeaders(await handle(request, env));
    } catch (error) {
      console.error(error);
      return withSecurityHeaders(json({ error: 'internal_error' }, 500));
    }
  },
};
