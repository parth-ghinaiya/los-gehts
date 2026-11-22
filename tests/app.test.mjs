// App logic checks: runs the real public/js files with a stub DOM against the local server.
// Needs `npx wrangler dev --port 47615 --ip 127.0.0.1` running, with .dev.vars copied from .dev.vars.example.
// It empties the LOCAL database tables. usage: node tests/app.test.mjs [base-url] [passphrase]
import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';
import http from 'node:http';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const [BASE = 'http://127.0.0.1:47615', PASS = 'change-me-local-only'] = process.argv.slice(2);
const KEY = 'los-gehts-v1', LEGACY = 'los-gehts-sync';
// Same scripts, same order, as index.html.
const page = fs.readFileSync(path.join(root, 'public/index.html'), 'utf8');
const src = [...page.matchAll(/<script src="([^"]+)"><\/script>/g)].map((m) => fs.readFileSync(path.join(root, 'public', m[1]), 'utf8'));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const sql = (command) => execFileSync('npx', ['wrangler', 'd1', 'execute', 'los-gehts', '--local', '--json', '--command', command], { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });

let bad = 0;
const check = (name, cond, extra) => { if (!cond) bad++; console.log((cond ? 'PASS ' : 'FAIL ') + name + (cond ? '' : ' -> ' + JSON.stringify(extra))); };

// An element that accepts anything and remembers what was assigned to it.
const makeEl = () => {
  const own = {};
  return new Proxy(function () {}, {
    get: (t, k) => (k in own ? own[k] : k === 'classList' ? { toggle() {}, add() {}, remove() {}, contains: () => false }
      : k === 'dataset' || k === 'style' ? {} : k === Symbol.toPrimitive ? () => '' : k === 'then' ? undefined : makeEl()),
    set: (t, k, v) => { own[k] = v; return true; },
    apply: () => makeEl(),
  });
};

async function login() {
  const r = await fetch(BASE + '/api/login', { method: 'POST', headers: { Origin: BASE, 'Content-Type': 'application/json' }, body: JSON.stringify({ passphrase: PASS }) });
  return (r.headers.get('set-cookie') || '').split(';')[0];
}

/* What a browser adds by itself: the cookie, and Origin on non-GET requests. */
async function device(storage, { cookie = '', base = BASE, protocol = 'http:', hash = '', wait = 500 } = {}) {
  const store = new Map(Object.entries(storage));
  const d = { store, calls: [], sent: [], replaced: [], els: {}, failPut: false, failLogout: false };
  const win = {
    location: { protocol, hash, replace: (u) => d.replaced.push(u) },
    history: { replaceState() {} },
    localStorage: { getItem: (k) => (store.has(k) ? store.get(k) : null), setItem: (k, v) => store.set(k, String(v)), removeItem: (k) => store.delete(k) },
    document: {
      getElementById: (id) => (d.els['#' + id] ||= makeEl()),
      querySelector: (q) => (d.els[q] ||= makeEl()),
      querySelectorAll: () => [], addEventListener() {}, createElement: () => makeEl(),
      body: makeEl(), documentElement: makeEl(), visibilityState: 'visible',
    },
    addEventListener() {}, scrollTo() {},
    fetch: async (u, init = {}) => {
      const method = init.method || 'GET';
      d.calls.push(method + ' ' + u);
      d.sent.push(init);
      if ((d.failPut && method === 'PUT') || (d.failLogout && u === '/api/logout')) throw new TypeError('network down');
      const headers = { ...(init.headers || {}) };
      if (cookie) headers.Cookie = cookie;
      if (method !== 'GET') headers.Origin = base;
      return fetch(base + u, { ...init, headers, redirect: 'manual', keepalive: false });
    },
    setTimeout, clearTimeout, Date, JSON, Math, console, URL, Blob, encodeURIComponent,
  };
  win.window = win;
  vm.createContext(win);
  for (const s of src) vm.runInContext(s, win);
  await sleep(wait);
  d.local = () => JSON.parse(store.get(KEY) || 'null');
  return d;
}

const card = (seen, box, due) => ({ box, due, seen, ok: seen });
const server = async (cookie, method = 'GET', body) => (await fetch(BASE + '/api/progress', { method, headers: { Cookie: cookie, Origin: BASE, 'Content-Type': 'application/json' }, body: body && JSON.stringify(body) })).json();
const signedIn = async (cookie) => (await fetch(BASE + '/', { headers: { Cookie: cookie }, redirect: 'manual' })).status === 200;

sql('DELETE FROM sessions; DELETE FROM login_attempts; DELETE FROM progress;');
const cookie = await login();
check('setup: signed in', await signedIn(cookie));

/* ---------- sync needs no setup ---------- */
await server(cookie, 'PUT', { cards: { b: card(1, 1, 9), shared: card(5, 3, 30) }, xp: 50, sessions: 2, streak: { last: 100, count: 4, best: 6 }, drills: { gender: 7 } });
let d = await device({ [LEGACY]: 'old stored passphrase', [KEY]: JSON.stringify({ cards: { a: card(2, 2, 8), shared: card(2, 1, 12) }, xp: 10, sessions: 5, streak: { last: 101, count: 5, best: 5 }, drills: { gender: 3, verbs: 9 }, settings: { theme: 'dark' } }) }, { cookie });
let local = d.local(), remote = (await server(cookie)).data;
check('auto sync: starts with no stored credential', d.calls.join() === 'GET /api/progress,PUT /api/progress', d.calls);
check('auto sync: app sends no Authorization header', d.sent.every((i) => !i.headers || !('Authorization' in i.headers)));
check('auto sync: passphrase left by old version is removed', !d.store.has(LEGACY));
check('auto sync: nothing secret in storage', [...d.store.keys()].join() === KEY, [...d.store.keys()]);
check('merge: union of cards on device', ['a', 'b', 'shared'].every((k) => local.cards[k]), local.cards);
check('merge: more-practised copy wins', local.cards.shared.seen === 5 && local.cards.shared.box === 3);
check('merge: xp/sessions max, drills max', local.xp === 50 && local.sessions === 5 && local.drills.gender === 7 && local.drills.verbs === 9);
check('merge: settings stay per device', local.settings.theme === 'dark');
check('merge: server received the union', remote.cards.a && remote.cards.b && remote.xp === 50);

d = await device({ [KEY]: JSON.stringify(local) }, { cookie });
check('in sync: GET only', d.calls.join() === 'GET /api/progress', d.calls);

d = await device({}, { cookie });
check('new device: progress restored after sign-in alone', Object.keys(d.local().cards).length === 3 && d.local().xp === 50 && d.calls.join() === 'GET /api/progress', d.calls);

/* ---------- month plan ---------- */
const pl = (o) => Object.assign({ id: 500, start: 20000, pace: 30, setAt: 1, ticks: {}, done: {}, checks: {} }, o);
await server(cookie, 'PUT', { cards: {}, xp: 0, plan: pl({ pace: 45, setAt: 9, ticks: { u1a: { drill: 3, speak: 1 } }, done: { u1a: 20001 }, checks: { cp1: 60 } }) });
d = await device({ [KEY]: JSON.stringify({ cards: {}, xp: 0, plan: pl({ ticks: { u1a: { drill: 7 }, u1b: { speak: 1 } }, done: { u1a: 20000, u1b: 20002 }, checks: { cp1: 85 } }) }) }, { cookie });
local = d.local(); remote = (await server(cookie)).data;
check('plan merge: latest pace change wins', local.plan.pace === 45 && local.plan.setAt === 9, local.plan);
check('plan merge: work from both devices counts', local.plan.ticks.u1a.drill === 7 && local.plan.ticks.u1a.speak === 1 && local.plan.ticks.u1b.speak === 1 && local.plan.done.u1a === 20000 && local.plan.done.u1b === 20002, local.plan);
check('plan merge: best checkpoint score kept', local.plan.checks.cp1 === 85, local.plan.checks);
check('plan merge: server receives the combined plan', JSON.stringify(remote.plan) === JSON.stringify(local.plan), remote.plan);
await server(cookie, 'PUT', { cards: {}, xp: 0, plan: pl({ id: 900, start: 0, setAt: 900 }) });
d = await device({ [KEY]: JSON.stringify(local) }, { cookie });
check('plan merge: a newer plan (here: stopped) replaces the old one', d.local().plan.id === 900 && d.local().plan.start === 0 && Object.keys(d.local().plan.done).length === 0, d.local().plan);
await server(cookie, 'PUT', { cards: {}, plan: pl({ id: 900, start: 0, setAt: 900 }), passed: { 'dialog:u1': 20005, 'write:cp1': 20009 } });
d = await device({ [KEY]: JSON.stringify({ cards: {}, plan: pl({ id: 900, start: 0, setAt: 900 }), passed: { 'dialog:u1': 20003, 'dialog:u2': 20004 } }) }, { cookie });
check('passed merge: union, earliest day kept', JSON.stringify(d.local().passed) === JSON.stringify({ 'dialog:u1': 20003, 'dialog:u2': 20004, 'write:cp1': 20009 }), d.local().passed);
await server(cookie, 'PUT', { cards: {}, xp: 1, passed: { 'dialog:u1': 'x', 'BAD': 3, 'write:cp1': -4, 'note:u1': 5 } });
d = await device({}, { cookie });
check('hydrate: hostile passed values dropped', Object.keys(d.local().passed).length === 0, d.local().passed);
await server(cookie, 'PUT', { cards: {}, plan: { id: 'x', start: -5, pace: 7, ticks: { 'BAD KEY': { speak: 1 }, u1a: 'str' }, done: { u1a: 'soon' }, checks: { cp1: 500 } } });
d = await device({}, { cookie });
const hp = d.local().plan;
check('hydrate: hostile plan values coerced', hp.id === 0 && hp.start === 0 && hp.pace === 30 && Object.keys(hp.ticks).length === 0 && Object.keys(hp.done).length === 0 && hp.checks.cp1 === 100, hp);

d = await device({ [KEY]: JSON.stringify({ cards: {}, xp: 0, epoch: 9999999999999 }) }, { cookie });
remote = (await server(cookie)).data;
check('reset: replaces server data', Object.keys(remote.cards).length === 0 && remote.epoch === 9999999999999);
d = await device({ [KEY]: JSON.stringify({ cards: { a: card(2, 2, 8) }, xp: 10, epoch: 0 }) }, { cookie });
check('reset: stale device adopts it', Object.keys(d.local().cards).length === 0 && d.local().epoch === 9999999999999);

await server(cookie, 'PUT', { cards: { q: { box: 99, due: 'x', seen: '<img src=x onerror=alert(1)>', ok: null }, bad: 'str' }, xp: '<script>', epoch: 9999999999999, streak: 'nope', settings: { theme: '"><b>' } });
d = await device({}, { cookie });
local = d.local();
check('hydrate: hostile server values coerced', local.xp === 0 && local.cards.q.box === 6 && local.cards.q.seen === 0 && !local.cards.bad && local.streak.count === 0 && local.settings.theme === 'auto', local);

/* ---------- session ended ---------- */
const mine = JSON.stringify({ cards: { z: card(1, 1, 1) }, xp: 1, epoch: 9999999999999 });
d = await device({ [KEY]: mine }, { cookie: '' });
check('expired session: sent to the sign-in page', d.replaced.join() === '/login', d.replaced);
check('expired session: nothing written, local progress kept', !d.calls.some((c) => c.startsWith('PUT')) && d.local().cards.z && d.local().xp === 1, d.calls);

/* ---------- not hosted ---------- */
d = await device({ [KEY]: mine }, { protocol: 'file:' });
check('local file: no network calls', d.calls.length === 0, d.calls);

const plain = http.createServer((q, s) => { s.writeHead(404); s.end('not found'); }).listen(0, '127.0.0.1');
await new Promise((r) => plain.on('listening', r));
d = await device({ [KEY]: mine }, { base: 'http://127.0.0.1:' + plain.address().port });
check('plain file server: one probe, then sync turns itself off', d.calls.join() === 'GET /api/progress' && d.replaced.length === 0 && d.local().xp === 1, d.calls);
plain.close();

/* ---------- sign out ---------- */
await server(cookie, 'PUT', { cards: { a: card(2, 2, 8) }, xp: 30, epoch: 9999999999999 });
d = await device({ [KEY]: JSON.stringify({ cards: { a: card(2, 2, 8) }, xp: 30, epoch: 9999999999999, settings: { theme: 'dark' } }) }, { cookie, hash: '#/guide' });
d.failLogout = true;
await d.els['#signOut'].onclick();
check('sign out, server unreachable: stays signed in, keeps progress, says so', d.replaced.length === 0 && d.local().xp === 30 && /still signed in/.test(d.els['#signOutMsg'].textContent) && await signedIn(cookie), d.els['#signOutMsg'].textContent);
d.failLogout = false;
await d.els['#signOut'].onclick();
check('sign out: session ended on the server', !(await signedIn(cookie)));
check('sign out: local progress cleared, settings kept', d.local().xp === 0 && Object.keys(d.local().cards).length === 0 && d.local().settings.theme === 'dark', d.local());
check('sign out: sent to the sign-in page', d.replaced.join() === '/login', d.replaced);

const c2 = await login(), c3 = await login();
check('progress survives sign-out on the server', (await server(c2)).data.xp === 30);
d = await device({}, { cookie: c2, hash: '#/guide' });
check('sign back in: progress returns', d.local().xp === 30 && d.local().cards.a.seen === 2);
await d.els['#signOutAll'].onclick();
check('sign out all devices: every session ended', !(await signedIn(c2)) && !(await signedIn(c3)));

/* ---------- sign out with unsynced progress ---------- */
const c4 = await login();
d = await device({ [KEY]: JSON.stringify({ cards: { a: card(2, 2, 8), fresh: card(1, 1, 3) }, xp: 99, epoch: 9999999999999 }) }, { cookie: c4, hash: '#/guide' });
check('precondition: device and server were in sync after load', (await server(c4)).data.xp === 99);
d = await (async () => {
  const x = await device({ [KEY]: JSON.stringify({ cards: { a: card(2, 2, 8), fresh: card(1, 1, 3), newer: card(1, 1, 4) }, xp: 120, epoch: 9999999999999 }) }, { cookie: c4, hash: '#/guide', wait: 0 });
  x.failPut = true;     // the push that follows the first pull fails: progress is now unsynced
  await sleep(500);
  return x;
})();
await d.els['#signOut'].onclick();
check('unsynced sign out: stops and warns', d.replaced.length === 0 && d.local().xp === 120 && /would be lost/.test(d.els['#signOutMsg'].textContent) && d.els['#signOut'].textContent === 'Sign out anyway' && await signedIn(c4), [d.replaced, d.els['#signOutMsg'].textContent]);
check('unsynced sign out: no logout request sent yet', !d.calls.includes('POST /api/logout'), d.calls);
d.failPut = false;
await d.els['#signOut'].onclick();
check('unsynced sign out, second press: pushes first, then signs out', d.replaced.join() === '/login' && !(await signedIn(c4)));
const c5 = await login();
check('unsynced sign out: the late progress reached the server', (await server(c5)).data.xp === 120);

console.log(bad ? bad + ' FAILED' : 'ALL CLIENT CHECKS PASSED');
process.exit(bad ? 1 : 0);
