// Saves screenshots of every screen to .tmp/shots for visual review.
// Needs `npx wrangler dev --port 47615 --ip 127.0.0.1` running, with .dev.vars copied from .dev.vars.example.
// usage: node tests/screenshots.mjs [light|dark] [desktop|mobile] [base-url] [passphrase]
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const [THEME = 'light', SIZE = 'desktop', BASE = 'http://localhost:47615', PASS = 'change-me-local-only'] = process.argv.slice(2);
const OUT = path.join(root, '.tmp/shots');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const dims = SIZE === 'mobile' ? { width: 390, height: 844, deviceScaleFactor: 2, mobile: true } : { width: 1280, height: 860, deviceScaleFactor: 1, mobile: false };
fs.mkdirSync(OUT, { recursive: true });

const profile = fs.mkdtempSync(path.join(root, '.tmp/chrome-'));
const chrome = spawn(CHROME, ['--headless=new', '--remote-debugging-port=47621', '--user-data-dir=' + profile, '--no-first-run', '--hide-scrollbars', 'about:blank'], { stdio: 'ignore' });
let target;
for (let i = 0; i < 40 && !target; i++) {
  await sleep(250);
  try { target = (await (await fetch('http://127.0.0.1:47621/json')).json()).find((t) => t.type === 'page'); } catch (e) { /* not up yet */ }
}
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener('open', r));
let seq = 0;
const pending = new Map();
const problems = [];
ws.addEventListener('message', (m) => {
  const msg = JSON.parse(m.data);
  if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg); pending.delete(msg.id); return; }
  if (msg.method === 'Runtime.exceptionThrown') problems.push('exception: ' + (msg.params.exceptionDetails.exception?.description || msg.params.exceptionDetails.text));
  if (msg.method === 'Log.entryAdded' && msg.params.entry.level === 'error') problems.push(msg.params.entry.text);
});
const send = (method, params = {}) => new Promise((resolve) => { const id = ++seq; pending.set(id, resolve); ws.send(JSON.stringify({ id, method, params })); });
const js = async (expression) => (await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true })).result.result.value;
const until = async (expression, ms = 8000) => { const end = Date.now() + ms; while (Date.now() < end) { if (await js(expression)) return true; await sleep(100); } return false; };
const shot = async (name, full = false) => {
  await sleep(250);
  const r = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: full });
  fs.writeFileSync(path.join(OUT, `${SIZE}-${THEME}-${name}.png`), Buffer.from(r.result.data, 'base64'));
};
const goto = async (hash) => { await js(`location.hash = ${JSON.stringify(hash)}; window.scrollTo(0, 0); 1`); await sleep(350); };
const step = () => js(`(() => {
  const next = document.getElementById('next'); if (next) { next.click(); return 'next'; }
  const input = document.querySelector('#q input'); if (input && !input.value) input.value = 'x';
  const checkBtn = document.getElementById('check'); if (checkBtn && !checkBtn.disabled) { checkBtn.click(); return 'check'; }
  const tile = document.querySelector('#bank .tile:not(:disabled)'); if (tile) { tile.click(); return 'tile'; }
  const any = [...document.querySelectorAll('#q button:not(:disabled)')].find((b) => !b.matches('.say, .bigplay, #check, [data-ins], [data-say]')); if (any) { any.click(); return 'pick'; }
})()`);
const kind = () => js(`(() => { const q = document.getElementById('q'); if (!q) return ''; return q.querySelector('.gapline') ? 'gapfill' : q.querySelector('.gbtns') ? 'gender' : q.querySelector('#bank') ? 'build' : q.querySelector('#ans') ? 'type' : q.querySelector('.opts') ? 'mc' : ''; })()`);

try {
  for (const d of ['Runtime', 'Log', 'Page']) await send(d + '.enable');
  await send('Emulation.setDeviceMetricsOverride', dims);
  await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-color-scheme', value: THEME }] });

  await send('Page.navigate', { url: BASE + '/' });
  await until('!!document.getElementById("passphrase")');
  await shot('00-login');
  await js('document.getElementById("passphrase").value = "nope"; document.getElementById("form").requestSubmit(); 1');
  await until('document.getElementById("message").textContent !== ""');
  await shot('01-login-error');
  await js(`document.getElementById("passphrase").value = ${JSON.stringify(PASS)}; document.getElementById("form").requestSubmit(); 1`);
  await until('location.pathname === "/" && !!document.querySelector("#app .hero")');
  await sleep(600);
  await shot('02-home-new');

  // one practice round, capturing each exercise type once, before and after answering
  await goto('#/practice/a2u1');
  const seen = new Set();
  for (let n = 0; n < 120 && !(await js('!!document.querySelector(".card.done")')); n++) {
    const k = await kind();
    const answered = await js('!!document.getElementById("next")');
    if (k && !answered && !seen.has(k)) {
      seen.add(k);
      if (k === 'build') { await step(); await step(); }
      await shot('10-ex-' + k);
      while (!(await js('!!document.getElementById("next")'))) await step();
      await shot('11-ex-' + k + '-feedback');
    }
    await step();
    await sleep(40);
  }
  await sleep(700);
  await shot('12-done', true);

  await goto('#/');
  await shot('20-home', true);
  await goto('#/level/b1');
  await shot('20-home-b1', true);
  await goto('#/unit/a2u1');
  await shot('21-unit', true);
  await goto('#/review');
  await shot('22-review');
  await goto('#/drills');
  await shot('23-drills');
  await goto('#/drills/gender');
  await js('document.querySelector(".gbtn").click(); 1');
  await shot('24-drill-gender');
  await goto('#/drills/verbs');
  await js('document.getElementById("ans").value = "bin"; document.getElementById("check").click(); 1');
  await shot('25-drill-verbs');
  await goto('#/drills/numbers');
  await shot('26-drill-numbers');
  await goto('#/grammar/b1');
  await shot('27-grammar', true);
  await goto('#/guide');
  await shot('28-guide', true);
  await goto('#/plan');
  await shot('29-plan-start');
  await js('document.querySelector(\'[data-pace="30"]\').click(); 1');
  await sleep(350);
  await shot('30-plan', true);
  await goto('#/');
  await shot('31-home-plan');
  console.log(problems.length ? 'PROBLEMS ' + JSON.stringify(problems) : 'no browser errors');
} finally {
  ws.close();
  chrome.kill();
  try { fs.rmSync(profile, { recursive: true, force: true }); } catch (e) { /* busy */ }
}
