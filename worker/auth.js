/* Sign-in for a single user: one passphrase (the SYNC_TOKEN secret), server-side sessions
   in D1, and a per-client limit on failed attempts. */

const COOKIE = '__Host-session';   // __Host- pins the cookie to this exact host, HTTPS only
const DAY_MS = 24 * 60 * 60 * 1000;
const IDLE_MS = 30 * DAY_MS;       // signed out after this long without a visit
const ABSOLUTE_MS = 180 * DAY_MS;  // signed out this long after sign-in, however active
const TOUCH_MS = DAY_MS;           // how often a visit extends the session
const MAX_FAILURES = 5;
const WINDOW_MS = 15 * 60 * 1000;

const enc = new TextEncoder();
const hex = (buffer) => Array.from(new Uint8Array(buffer), (b) => b.toString(16).padStart(2, '0')).join('');

/* Keyed hash with the passphrase as key. Stored values are useless without the passphrase,
   and changing the passphrase makes every stored session id unreachable: rotation signs
   every device out. */
async function mac(env, label, value) {
  const key = await crypto.subtle.importKey('raw', enc.encode(env.SYNC_TOKEN), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  return hex(await crypto.subtle.sign('HMAC', key, enc.encode(label + '\n' + value)));
}

/* Hash both sides to a fixed length, then compare in constant time,
   so neither the secret's content nor its length leaks through timing. */
export async function passphraseMatches(provided, env) {
  const [a, b] = await Promise.all([
    crypto.subtle.digest('SHA-256', enc.encode(provided)),
    crypto.subtle.digest('SHA-256', enc.encode(env.SYNC_TOKEN)),
  ]);
  return crypto.subtle.timingSafeEqual(a, b);
}

/* ---------- cookie ---------- */

function cookieHeader(value, maxAgeSeconds) {
  return `${COOKIE}=${value}; Path=/; Max-Age=${maxAgeSeconds}; HttpOnly; Secure; SameSite=Lax`;
}

export const clearedCookie = () => cookieHeader('', 0);

function readCookie(request) {
  const header = request.headers.get('Cookie') || '';
  for (const part of header.split(';')) {
    const i = part.indexOf('=');
    if (i > 0 && part.slice(0, i).trim() === COOKIE) return part.slice(i + 1).trim();
  }
  return '';
}

/* ---------- sessions ---------- */

function newToken() {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  return btoa(String.fromCharCode(...bytes)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

/* Returns the Set-Cookie value for a fresh session. */
export async function createSession(env, now) {
  const token = newToken();
  const expires = now + IDLE_MS;
  await env.DB.prepare('INSERT INTO sessions (id, created_at, last_seen, expires_at) VALUES (?, ?, ?, ?)')
    .bind(await mac(env, 'session', token), now, now, expires).run();
  return cookieHeader(token, Math.floor((expires - now) / 1000));
}

/* Returns null when the request is not signed in. Otherwise { id, cookie }, where cookie
   is a refreshed Set-Cookie value when this visit extended the session, else null. */
export async function readSession(request, env, now) {
  const token = readCookie(request);
  if (!/^[A-Za-z0-9_-]{43}$/.test(token)) return null;
  const id = await mac(env, 'session', token);
  const row = await env.DB.prepare('SELECT created_at, last_seen, expires_at FROM sessions WHERE id = ?').bind(id).first();
  if (!row || row.expires_at <= now) return null;

  let cookie = null;
  if (now - row.last_seen >= TOUCH_MS) {
    const expires = Math.min(now + IDLE_MS, row.created_at + ABSOLUTE_MS);
    await env.DB.prepare('UPDATE sessions SET last_seen = ?, expires_at = ? WHERE id = ?').bind(now, expires, id).run();
    cookie = cookieHeader(token, Math.floor((expires - now) / 1000));
  }
  return { id, cookie };
}

export async function endSession(env, id) {
  await env.DB.prepare('DELETE FROM sessions WHERE id = ?').bind(id).run();
}

export async function endAllSessions(env) {
  await env.DB.prepare('DELETE FROM sessions').run();
}

/* ---------- failed sign-in limit ---------- */

export const clientKey = (request, env) => mac(env, 'client', request.headers.get('CF-Connecting-IP') || 'unknown');

/* Seconds the client must wait before trying again, or 0 if it may try now. */
export async function retryAfter(env, client, now) {
  const row = await env.DB.prepare('SELECT failures, window_start FROM login_attempts WHERE client = ?').bind(client).first();
  if (!row || row.failures < MAX_FAILURES) return 0;
  const remaining = row.window_start + WINDOW_MS - now;
  return remaining > 0 ? Math.ceil(remaining / 1000) : 0;
}

export async function recordFailure(env, client, now) {
  const windowExpired = now - WINDOW_MS;   // a window that started at or before this is over
  await env.DB.prepare(
    'INSERT INTO login_attempts (client, failures, window_start) VALUES (?, 1, ?) ' +
    'ON CONFLICT(client) DO UPDATE SET ' +
    'failures = CASE WHEN login_attempts.window_start <= ? THEN 1 ELSE login_attempts.failures + 1 END, ' +
    'window_start = CASE WHEN login_attempts.window_start <= ? THEN excluded.window_start ELSE login_attempts.window_start END'
  ).bind(client, now, windowExpired, windowExpired).run();
}

/* Called after a successful sign-in: forget this client's failures and drop stale rows. */
export async function tidyAfterSignIn(env, client, now) {
  await env.DB.batch([
    env.DB.prepare('DELETE FROM login_attempts WHERE client = ? OR window_start <= ?').bind(client, now - WINDOW_MS),
    env.DB.prepare('DELETE FROM sessions WHERE expires_at <= ?').bind(now),
  ]);
}
