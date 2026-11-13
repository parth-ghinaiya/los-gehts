// Server checks: sign-in gate, sessions, throttling, progress API.
// Needs `npx wrangler dev --port 47615 --ip 127.0.0.1` running, with .dev.vars copied from .dev.vars.example.
// It empties the LOCAL database tables. usage: node tests/server.test.mjs [base-url] [passphrase]
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const [BASE = 'http://127.0.0.1:47615', PASS = 'change-me-local-only', phase = 'main'] = process.argv.slice(2);
let failed = 0;
const check = (name, ok, detail = '') => { if (!ok) failed++; console.log((ok ? 'PASS ' : 'FAIL ') + name + (ok ? '' : '  -> ' + detail)); };

const sql = (command) => execFileSync('npx', ['wrangler', 'd1', 'execute', 'los-gehts', '--local', '--json', '--command', command], { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
const rows = (command) => JSON.parse(sql(command))[0].results;

const req = (path, { method = 'GET', cookie, origin, body, headers = {} } = {}) => {
  const h = { ...headers };
  if (cookie) h.Cookie = cookie;
  if (origin) h.Origin = origin === true ? BASE : origin;
  if (body !== undefined) h['Content-Type'] = 'application/json';
  return fetch(BASE + path, { method, headers: h, body, redirect: 'manual' });
};
const login = async (passphrase = PASS) => {
  const r = await req('/api/login', { method: 'POST', origin: true, body: JSON.stringify({ passphrase }) });
  const set = r.headers.get('set-cookie') || '';
  return { r, set, cookie: set.split(';')[0] };
};
const toLogin = (r) => r.status === 302 && r.headers.get('location') === '/login';

if (phase === 'rotated') {
  // usage: node tests/server.test.mjs <base-url> <new-passphrase> rotated <old-cookie> <old-passphrase>
  const old = process.argv[5];
  check('rotation: old session rejected for pages', toLogin(await req('/', { cookie: old })));
  check('rotation: old session rejected for API', (await req('/api/progress', { cookie: old })).status === 401);
  check('rotation: old passphrase rejected', (await login(process.argv[6])).r.status === 401);
  const fresh = await login();
  check('rotation: new passphrase works', fresh.r.status === 200);
  process.exit(failed ? 1 : 0);
}

sql('DELETE FROM sessions; DELETE FROM login_attempts; DELETE FROM progress;');

/* ---------- signed out ---------- */
for (const p of ['/', '/index.html', '/js/app.js', '/js/data.js', '/js/util.js', '/css/style.css', '/nope', '/favicon.ico', '/login.html', '/login/']) {
  const r = await req(p);
  check('signed out: ' + p + ' redirects to /login', toLogin(r) && !(await r.text()), r.status + ' ' + r.headers.get('location'));
}
for (const p of ['/login', '/login.css', '/login.js']) {
  const r = await req(p);
  check('signed out: ' + p + ' is served', r.status === 200, String(r.status));
}
{
  const html = await (await req('/login')).text();
  check('login page has the form and no app content', html.includes('id="passphrase"') && !html.includes('js/data.js') && !html.includes('js/app.js'));
}
check('signed out: GET /api/progress is 401', (await req('/api/progress')).status === 401);
check('signed out: PUT /api/progress is 401', (await req('/api/progress', { method: 'PUT', origin: true, body: '{"cards":{}}' })).status === 401);
check('signed out: unknown API path is 401, not 404', (await req('/api/other')).status === 401);
check('signed out: POST to a page is 405', (await req('/', { method: 'POST' })).status === 405);

/* ---------- headers ---------- */
for (const [name, r] of [['login page', await req('/login')], ['redirect', await req('/')], ['API error', await req('/api/progress')]]) {
  const h = r.headers;
  const csp = h.get('content-security-policy') || '';
  check('headers on ' + name, csp.includes("script-src 'self'") && csp.includes("frame-ancestors 'none'") && !csp.includes("script-src 'self' 'unsafe")
    && h.get('x-content-type-options') === 'nosniff' && h.get('x-frame-options') === 'DENY' && h.get('referrer-policy') === 'no-referrer'
    && (h.get('strict-transport-security') || '').includes('max-age=') && (h.get('x-robots-tag') || '').includes('noindex'), csp);
}

/* ---------- sign-in ---------- */
check('login: GET is 405', (await req('/api/login')).status === 405);
check('login: no Origin is 403', (await req('/api/login', { method: 'POST', body: JSON.stringify({ passphrase: PASS }) })).status === 403);
check('login: foreign Origin is 403', (await req('/api/login', { method: 'POST', origin: 'https://evil.example', body: JSON.stringify({ passphrase: PASS }) })).status === 403);
check('login: wrong passphrase is 401 and sets no cookie', await (async () => { const x = await login('wrong'); return x.r.status === 401 && !x.set; })());
check('login: malformed body is 401', (await req('/api/login', { method: 'POST', origin: true, body: 'not json' })).status === 401);
check('login: oversized body is 401', (await req('/api/login', { method: 'POST', origin: true, body: JSON.stringify({ passphrase: 'x'.repeat(5000) }) })).status === 401);

const A = await login();
check('login: correct passphrase is 200', A.r.status === 200, String(A.r.status));
check('login: cookie attributes', /^__Host-session=[A-Za-z0-9_-]{43}; Path=\/; Max-Age=2592000; HttpOnly; Secure; SameSite=Lax$/.test(A.set), A.set.replace(/=[A-Za-z0-9_-]{43}/, '=<token>'));
check('login: success clears the failure count', rows('SELECT count(*) AS n FROM login_attempts')[0].n === 0);
{
  const stored = rows('SELECT id FROM sessions');
  check('session: stored id is not the cookie token', stored.length === 1 && stored[0].id.length === 64 && !A.cookie.includes(stored[0].id));
}

/* ---------- signed in ---------- */
{
  const r = await req('/', { cookie: A.cookie });
  const html = await r.text();
  check('signed in: / serves the app', r.status === 200 && html.includes('js/app.js'), String(r.status));
  check('signed in: page is private, revalidated', r.headers.get('cache-control') === 'private, no-cache', r.headers.get('cache-control'));
  check('signed in: page has CSP', (r.headers.get('content-security-policy') || '').includes("default-src 'none'"));
}
for (const p of ['/js/app.js', '/js/data.js', '/css/style.css']) check('signed in: ' + p, (await req(p, { cookie: A.cookie })).status === 200);
check('signed in: /login redirects to /', await (async () => { const r = await req('/login', { cookie: A.cookie }); return r.status === 302 && r.headers.get('location') === '/'; })());
for (const p of ['/wrangler.jsonc', '/worker/index.js', '/migrations/0002_auth.sql', '/.dev.vars', '/.git/config']) {
  check('signed in: private file ' + p + ' is 404', (await req(p, { cookie: A.cookie })).status === 404);
}
check('signed in: HEAD works', (await req('/', { method: 'HEAD', cookie: A.cookie })).status === 200);

/* ---------- progress API ---------- */
const j = async (r) => ({ status: r.status, body: await r.json() });
{
  const empty = await j(await req('/api/progress', { cookie: A.cookie }));
  check('api: empty store', empty.status === 200 && empty.body.data === null);
  const doc = JSON.stringify({ cards: { 'u1|hallo': { box: 2, due: 5, seen: 3 } }, xp: 40 });
  check('api: PUT without Origin is 403', (await req('/api/progress', { method: 'PUT', cookie: A.cookie, body: doc })).status === 403);
  check('api: PUT with foreign Origin is 403', (await req('/api/progress', { method: 'PUT', cookie: A.cookie, origin: 'https://evil.example', body: doc })).status === 403);
  check('api: rejected writes stored nothing', (await j(await req('/api/progress', { cookie: A.cookie }))).body.data === null);
  check('api: PUT is 200', (await req('/api/progress', { method: 'PUT', cookie: A.cookie, origin: true, body: doc })).status === 200);
  const back = await j(await req('/api/progress', { cookie: A.cookie }));
  check('api: GET returns what was stored', back.body.data.xp === 40 && back.body.data.cards['u1|hallo'].seen === 3 && back.body.updatedAt > 0);
  check('api: invalid JSON is 400', (await req('/api/progress', { method: 'PUT', cookie: A.cookie, origin: true, body: '{' })).status === 400);
  check('api: wrong shape is 400', (await req('/api/progress', { method: 'PUT', cookie: A.cookie, origin: true, body: '{"xp":1}' })).status === 400);
  check('api: array is 400', (await req('/api/progress', { method: 'PUT', cookie: A.cookie, origin: true, body: '[]' })).status === 400);
  check('api: too large is 413', (await req('/api/progress', { method: 'PUT', cookie: A.cookie, origin: true, body: JSON.stringify({ cards: {}, pad: 'x'.repeat(600000) }) })).status === 413);
  check('api: DELETE is 405', (await req('/api/progress', { method: 'DELETE', cookie: A.cookie, origin: true })).status === 405);
  check('api: unknown path is 404', (await req('/api/other', { cookie: A.cookie })).status === 404);
  check('api: responses are not cached', (await req('/api/progress', { cookie: A.cookie })).headers.get('cache-control') === 'no-store');
}

/* ---------- forged cookies ---------- */
{
  const token = A.cookie.split('=')[1];
  const flipped = '__Host-session=' + (token[0] === 'A' ? 'B' : 'A') + token.slice(1);
  check('forged: altered token rejected', toLogin(await req('/', { cookie: flipped })));
  check('forged: garbage rejected', toLogin(await req('/', { cookie: '__Host-session=hello' })));
  check('forged: empty rejected', toLogin(await req('/', { cookie: '__Host-session=' })));
  check('forged: stored id used as token rejected', toLogin(await req('/', { cookie: '__Host-session=' + rows('SELECT id FROM sessions')[0].id })));
  check('forged: wrong cookie name rejected', toLogin(await req('/', { cookie: 'session=' + token })));
}

/* ---------- sign-out ---------- */
{
  check('logout: no Origin is 403', (await req('/api/logout', { method: 'POST', cookie: A.cookie, body: '{}' })).status === 403);
  check('logout: rejected request left the session alive', (await req('/', { cookie: A.cookie })).status === 200);
  const r = await req('/api/logout', { method: 'POST', cookie: A.cookie, origin: true, body: '{}' });
  check('logout: 200 and cookie cleared', r.status === 200 && /^__Host-session=; Path=\/; Max-Age=0; HttpOnly; Secure; SameSite=Lax$/.test(r.headers.get('set-cookie') || ''), r.headers.get('set-cookie'));
  check('logout: old cookie no longer opens pages', toLogin(await req('/', { cookie: A.cookie })));
  check('logout: old cookie no longer reaches the API', (await req('/api/progress', { cookie: A.cookie })).status === 401);
  check('logout: progress stays on the server', rows('SELECT count(*) AS n FROM progress')[0].n === 1);
  check('logout: signed-out logout is harmless', (await req('/api/logout', { method: 'POST', origin: true, body: '{"everywhere":true}' })).status === 200);
}
{
  const B = await login(), C = await login(), D = await login();
  await req('/api/logout', { method: 'POST', cookie: B.cookie, origin: true, body: '{}' });
  check('logout: one device only', (await req('/', { cookie: C.cookie })).status === 200 && toLogin(await req('/', { cookie: B.cookie })));
  await req('/api/logout', { method: 'POST', cookie: C.cookie, origin: true, body: '{"everywhere":true}' });
  check('logout everywhere: all sessions ended', toLogin(await req('/', { cookie: C.cookie })) && toLogin(await req('/', { cookie: D.cookie })) && rows('SELECT count(*) AS n FROM sessions')[0].n === 0);
}

/* ---------- expiry ---------- */
{
  const E = await login();
  check('expiry: fresh visit does not reissue the cookie', !(await req('/', { cookie: E.cookie })).headers.get('set-cookie'));
  sql(`UPDATE sessions SET last_seen = last_seen - ${2 * 86400000}`);
  const r = await req('/', { cookie: E.cookie });
  check('expiry: a visit a day later extends the session', r.status === 200 && /Max-Age=2592000/.test(r.headers.get('set-cookie') || ''), r.headers.get('set-cookie'));
  check('expiry: extension recorded', Date.now() - rows('SELECT last_seen FROM sessions')[0].last_seen < 60000);

  sql(`UPDATE sessions SET last_seen = last_seen - ${2 * 86400000}, created_at = ${Date.now() - 179.5 * 86400000}`);
  const capped = (await req('/', { cookie: E.cookie })).headers.get('set-cookie') || '';
  const age = Number((capped.match(/Max-Age=(\d+)/) || [])[1]);
  check('expiry: extension capped at 180 days from sign-in', age > 0 && age <= 43200, capped.replace(/=[A-Za-z0-9_-]{43}/, '=<token>'));

  sql('UPDATE sessions SET expires_at = 1');
  check('expiry: expired session rejected', toLogin(await req('/', { cookie: E.cookie })) && (await req('/api/progress', { cookie: E.cookie })).status === 401);
  await login();
  check('expiry: next sign-in removes expired rows', rows('SELECT count(*) AS n FROM sessions')[0].n === 1);
}

/* ---------- throttle (last: it locks this client out) ---------- */
{
  const codes = [];
  for (let i = 0; i < 5; i++) codes.push((await login('wrong-' + i)).r.status);
  check('throttle: five wrong attempts are each 401', codes.every((c) => c === 401), codes.join(','));
  const sixth = await login('wrong-6');
  const body = await sixth.r.json();
  check('throttle: sixth is 429 with Retry-After', sixth.r.status === 429 && Number(sixth.r.headers.get('retry-after')) > 0 && body.retryAfter <= 900, sixth.r.status + ' ' + sixth.r.headers.get('retry-after'));
  check('throttle: correct passphrase also refused while locked', (await login()).r.status === 429);
  check('throttle: stored client key is a hash, not an address', /^[0-9a-f]{64}$/.test(rows('SELECT client FROM login_attempts')[0].client));
  sql(`UPDATE login_attempts SET window_start = window_start - ${16 * 60000}`);
  check('throttle: lock lifts after the window', (await login('wrong-again')).r.status === 401 && rows('SELECT failures FROM login_attempts')[0].failures === 1);
  const ok = await login();
  check('throttle: sign-in works again', ok.r.status === 200);
  console.log('COOKIE ' + ok.cookie);
}

console.log(failed ? `\n${failed} FAILED` : '\nALL GATE CHECKS PASSED');
process.exit(failed ? 1 : 0);
