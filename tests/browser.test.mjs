// Browser checks: drives headless Chrome through sign-in, a full practice round, offline and sign-out.
// Needs `npx wrangler dev --port 47615 --ip 127.0.0.1` running, with .dev.vars copied from .dev.vars.example.
// usage: node tests/browser.test.mjs [base-url] [passphrase]
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const [BASE = 'http://localhost:47615', PASS = 'change-me-local-only'] = process.argv.slice(2);
const SHOTS = path.join(root, '.tmp/shots');
fs.mkdirSync(SHOTS, { recursive: true });
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let bad = 0;
const check = (name, cond, extra) => { if (!cond) bad++; console.log((cond ? 'PASS ' : 'FAIL ') + name + (cond ? '' : ' -> ' + JSON.stringify(extra))); };

const profile = fs.mkdtempSync(path.join(root, '.tmp/chrome-'));
const chrome = spawn(CHROME, ['--headless=new', '--remote-debugging-port=47620', '--user-data-dir=' + profile, '--no-first-run', '--window-size=1100,900', 'about:blank'], { stdio: 'ignore' });
const cleanup = () => { try { chrome.kill(); } catch (e) { /* gone */ } try { fs.rmSync(profile, { recursive: true, force: true }); } catch (e) { /* busy */ } };

let target;
for (let i = 0; i < 40 && !target; i++) {
  await sleep(250);
  try { target = (await (await fetch('http://127.0.0.1:47620/json')).json()).find((t) => t.type === 'page'); } catch (e) { /* not up yet */ }
}
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener('open', r));
let seq = 0;
const pending = new Map();
const problems = [];      // console errors, CSP violations, exceptions
const requests = [];      // { method, url, t }
ws.addEventListener('message', (m) => {
  const msg = JSON.parse(m.data);
  if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg); pending.delete(msg.id); return; }
  if (msg.method === 'Runtime.exceptionThrown') problems.push('exception: ' + (msg.params.exceptionDetails.exception?.description || msg.params.exceptionDetails.text));
  if (msg.method === 'Log.entryAdded' && msg.params.entry.level === 'error') problems.push(msg.params.entry.source + ': ' + msg.params.entry.text);
  if (msg.method === 'Runtime.consoleAPICalled' && msg.params.type === 'error') problems.push('console.error: ' + msg.params.args.map((a) => a.value || a.description).join(' '));
  if (msg.method === 'Network.requestWillBeSent') requests.push({ method: msg.params.request.method, url: msg.params.request.url.replace(BASE, ''), t: Date.now() });
});
const send = (method, params = {}) => new Promise((resolve) => { const id = ++seq; pending.set(id, resolve); ws.send(JSON.stringify({ id, method, params })); });
const js = async (expression) => {
  const r = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
  if (r.result.exceptionDetails) throw new Error(r.result.exceptionDetails.exception?.description || 'eval failed');
  return r.result.result.value;
};
const until = async (expression, ms = 8000) => { const end = Date.now() + ms; while (Date.now() < end) { if (await js(expression)) return true; await sleep(100); } return false; };
const shot = async (name) => { const r = await send('Page.captureScreenshot', { format: 'png' }); fs.writeFileSync(path.join(SHOTS, name + '.png'), Buffer.from(r.result.data, 'base64')); };
const where = () => js('location.pathname + location.hash');

try {
  for (const d of ['Runtime', 'Log', 'Network', 'Page']) await send(d + '.enable');

  /* ---------- gate ---------- */
  await send('Page.navigate', { url: BASE + '/' });
  await until('document.readyState === "complete" && !!document.getElementById("passphrase")');
  check('gate: opening the app lands on the sign-in page', (await where()) === '/login', await where());
  check('gate: sign-in page shows no app content', await js('!document.getElementById("app") && !document.querySelector("nav")'));
  check('gate: field is focused and built for password managers', await js('document.activeElement.id === "passphrase" && document.getElementById("passphrase").autocomplete === "current-password"'));
  check('gate: stylesheet applied', await js('getComputedStyle(document.querySelector(".card")).borderRadius === "12px"'));
  await shot('1-login');

  await js('document.getElementById("passphrase").value = "definitely-wrong"; document.getElementById("form").requestSubmit(); 1');
  await until('document.getElementById("message").textContent !== ""');
  check('sign-in: wrong passphrase explained, still on sign-in page', (await js('document.getElementById("message").textContent')) === 'Wrong passphrase.' && (await where()) === '/login', await js('document.getElementById("message").textContent'));
  await shot('2-login-wrong');
  const direct = await js('fetch("/js/data.js", { redirect: "manual" }).then((r) => r.type + ":" + r.status)');
  check('gate: course data still blocked after a failed attempt', direct === 'opaqueredirect:0', direct);

  await js(`document.getElementById("passphrase").value = ${JSON.stringify(PASS)}; document.getElementById("form").requestSubmit(); 1`);
  await until('location.pathname === "/" && !!document.querySelector("#app .hero")');
  check('sign-in: correct passphrase opens the app', (await where()).startsWith('/') && await js('!!document.querySelector("#app .hero")'), await where());
  check('sign-in: cookie is invisible to page scripts', (await js('document.cookie')) === '', await js('document.cookie'));
  check('sign-in: nothing secret in browser storage', await js('Object.keys(localStorage).every((k) => k === "los-gehts-v1")'), await js('Object.keys(localStorage)'));
  await until(`document.querySelector("#syncChip") && ${JSON.stringify(1)}`);
  await sleep(1200);
  check('auto sync: ran by itself after sign-in', requests.some((r) => r.url === '/api/progress' && r.method === 'GET'), requests.map((r) => r.method + ' ' + r.url));
  check('auto sync: no warning chip when all is well', await js('document.getElementById("syncChip").hidden'));
  await shot('3-home');

  /* ---------- levels and visible progress ---------- */
  check('levels: A1, A2 and B1 each show a progress ring', (await js('document.querySelectorAll(".level .ring").length')) === 3);
  check('levels: A1 is selected for a new learner', (await js('document.querySelector(".level.on h3").textContent')).startsWith('A1'));
  await js('document.querySelector(\'.level[href="#/level/b1"]\').click(); 1');
  await until('document.querySelector(".level.on h3").textContent.startsWith("B1")');
  check('levels: picking B1 lists its 12 units', (await js('document.querySelectorAll("#path .unit").length')) === 12 && (await where()) === '/#/', await where());
  await send('Page.reload');
  await until('document.readyState === "complete" && !!document.querySelector(".level.on")');
  check('levels: the choice survives a reload', (await js('document.querySelector(".level.on h3").textContent')).startsWith('B1'));
  await js('document.querySelector(\'.level[href="#/level/a2"]\').click(); 1');
  await until('document.querySelector(".level.on h3").textContent.startsWith("A2")');

  /* ---------- a full practice round (A2: includes gap-fill questions) ---------- */
  let gaps = 0, gapFilled = false;
  await js('location.hash = "#/practice/a2u1"; 1');
  await until('!!document.querySelector("#q")');
  let steps = 0;
  const before = requests.length;
  while (steps < 80 && !(await js('!!document.querySelector(".card.done")'))) {
    steps++;
    if (await js('!!document.querySelector("#q .gapline") && !document.getElementById("next")')) {
      gaps++;
      await js('document.querySelector("#q .opt").click(); 1');
      gapFilled = gapFilled || await js('document.getElementById("gap").classList.contains("filled") && document.getElementById("gap").textContent.trim().length > 0 && !!document.getElementById("next")');
    }
    // answer however the exercise allows; wrong answers are fine, the round still ends
    await js(`(() => {
      const next = document.getElementById('next'); if (next) { next.click(); return; }
      const input = document.querySelector('#q input'); if (input && !input.value) input.value = 'x';
      const checkBtn = document.getElementById('check'); if (checkBtn && !checkBtn.disabled) { checkBtn.click(); return; }
      const tile = document.querySelector('#bank .tile:not(:disabled)'); if (tile) { tile.click(); return; }
      const any = [...document.querySelectorAll('#q button:not(:disabled)')].find((b) => !b.matches('.say, .bigplay, #check, [data-ins], [data-say]')); if (any) any.click();
    })()`);
    await sleep(60);
  }
  const doneAt = Date.now();
  check('round: gap-fill questions appear and show the answer in the sentence', gaps >= 4 && gapFilled, { gaps, gapFilled });
  check('round: finish screen shows level progress', await js('!!document.querySelector(".lvl-line .bar i") && /A2 progress/.test(document.querySelector(".lvl-line").textContent)'));
  check('round: reached the finish screen', await js('!!document.querySelector(".card.done")'), { steps, html: (await js('document.getElementById("app").innerHTML')).slice(0, 300) });
  await until('/Saved to your account/.test((document.getElementById("syncStatus") || {}).textContent || "")', 5000);
  const savedText = await js('(document.getElementById("syncStatus") || {}).textContent || ""');
  check('round: finish screen confirms the save', /^Saved to your account at /.test(savedText), savedText);
  const put = requests.slice(before).filter((r) => r.method === 'PUT' && r.url === '/api/progress').pop();
  check('round: progress pushed at once on finishing (not after the idle delay)', !!put && put.t - doneAt < 1000, put && put.t - doneAt);
  await shot('4-finished');
  const serverXp = await js('fetch("/api/progress").then((r) => r.json()).then((j) => j.data.xp)');
  let localXp = await js('JSON.parse(localStorage.getItem("los-gehts-v1")).xp');
  check('round: server holds exactly what the device holds', serverXp === localXp && localXp > 0, { serverXp, localXp });

  /* ---------- other views under the content security policy ---------- */
  for (const h of ['#/', '#/unit/u4', '#/unit/a2u7', '#/unit/b1u11', '#/review', '#/drills', '#/drills/gender', '#/drills/numbers', '#/drills/verbs', '#/grammar', '#/grammar/a2', '#/grammar/b1', '#/guide', '#/plan', '#/dialog/u8', '#/write/cp2', '#/write/cp3']) {
    await js(`location.hash = ${JSON.stringify(h)}; 1`);
    await sleep(250);
  }
  /* every unit and every grammar level renders: catches broken markup in course content */
  const unitIds = await js('DE_DATA.UNITS.map((u) => u.id)');
  const broken = [];
  for (const id of unitIds) {
    await js(`location.hash = "#/unit/${id}"; 1`);
    await sleep(60);
    const ok = await js('!!document.querySelector(".unit-head h1") && document.querySelectorAll(".tip").length >= 3 && document.querySelectorAll(".word").length >= 16 && !/undefined|\\{\\{|\\}\\}|\\[object/.test(document.getElementById("app").textContent)');
    if (!ok) broken.push(id);
  }
  check('content: all ' + unitIds.length + ' unit pages render cleanly', unitIds.length === 37 && broken.length === 0, broken);
  const sheetCounts = [];
  for (const l of ['a1', 'a2', 'b1']) {
    await js(`location.hash = "#/grammar/${l}"; 1`);
    await sleep(120);
    sheetCounts.push(await js('document.querySelectorAll(".sheet").length + (/undefined|\\{\\{|\\[object/.test(document.getElementById("app").textContent) ? 1000 : 0)'));
  }
  check('content: grammar sheets render for every level', sheetCounts.join() === '9,9,10', sheetCounts);

  await js('location.hash = "#/unit/a2u1"; 1'); await sleep(300);
  check('unit: shows its own progress and a strength meter per word', await js('!!document.querySelector(".unit-prog .bar i") && document.querySelectorAll(".word .str").length >= 18 && document.querySelectorAll(\'.word .str:not([data-s="0"])\').length >= 5'));
  await js('location.hash = "#/grammar/b1"; 1'); await sleep(300);
  check('grammar: B1 opens with the telc exam overview', /telc Deutsch B1/.test(await js('document.querySelector(".sheet summary").textContent')));
  await js('location.hash = "#/guide"; 1'); await sleep(300);
  check('guide: no manual sync button, status line present', await js('!document.getElementById("syncNow") && /Saved to your account|Signed in/.test(document.getElementById("syncStatus").textContent)'), await js('document.getElementById("syncStatus").textContent'));
  check('styles: inline widths survive the policy', await js('location.hash = "#/"; new Promise((r) => setTimeout(() => r(parseFloat(getComputedStyle(document.querySelector(".unit .bar i")).width) > 0), 300))'));
  await js('location.hash = "#/guide"; 1'); await sleep(300);
  await js('document.getElementById("syncSection") ? 0 : document.querySelector("#signOut").scrollIntoView(); 1');
  await shot('5-guide');

  /* ---------- month plan ---------- */
  await js('location.hash = "#/plan"; 1'); await sleep(300);
  await js('document.querySelector(\'[data-pace="30"]\').click(); 1'); await sleep(300);
  check('plan: starting it shows day 1 of 30', /Day 1 of 30/.test(await js('document.querySelector(".plan-head").textContent')));
  check('plan: 30 days over 4 weeks', (await js('document.querySelectorAll(".days li").length')) === 30 && (await js('document.querySelectorAll(".week").length')) === 4);
  await js('location.hash = "#/"; 1'); await sleep(300);
  check('plan: home lists today\'s tasks', (await js('document.querySelectorAll(".hero .tasks li").length')) >= 3);
  check('plan: reaches the server', await until('fetch("/api/progress").then((r) => r.json()).then((j) => !!(j.data.plan && j.data.plan.start > 0))', 6000));
  await js('location.hash = "#/unit/u1/a"; 1'); await sleep(300);
  check('plan: half-unit page lists its 15 words', (await js('document.querySelectorAll(".word").length')) === 15);

  /* ---------- dialogue and writing ---------- */
  await js('location.hash = "#/dialog/u1"; 1'); await sleep(300);
  check('dialog: lines and three questions render', (await js('document.querySelectorAll(".dl-line").length')) >= 5 && (await js('document.querySelectorAll(".dl-q").length')) === 3);
  for (let qi = 0; qi < 3; qi++) {
    for (let k = 0; k < 3 && !(await js(`!!document.querySelectorAll(".dl-q")[${qi}].querySelector(".opt.ok")`)); k++) {
      await js(`[...document.querySelectorAll(".dl-q")[${qi}].querySelectorAll(".opt")].find((b) => !b.disabled).click(); 1`);
    }
  }
  check('dialog: answering all marks it passed', await js('!document.getElementById("dlDone").hidden && JSON.parse(localStorage.getItem("los-gehts-v1")).passed["dialog:u1"] > 0'));
  await js('location.hash = "#/write/cp1"; 1'); await sleep(300);
  await js('DE_DATA.PLAN.weeks[0].check.write.fields.forEach((f, i) => { document.getElementById("f" + i).value = f.show; }); document.getElementById("wcheck").click(); 1');
  check('writing: a correct form passes', await js('JSON.parse(localStorage.getItem("los-gehts-v1")).passed["write:cp1"] > 0'));
  await js('location.hash = "#/write/cp4"; 1'); await sleep(300);
  await js('(() => { const m = document.getElementById("msg"); m.value = DE_DATA.PLAN.weeks[3].check.write.model; document.getElementById("wcheck").click(); })(); 1');
  check('writing: the model message passes', await js('JSON.parse(localStorage.getItem("los-gehts-v1")).passed["write:cp4"] > 0'));
  check('writing: reaches the server', await until('fetch("/api/progress").then((r) => r.json()).then((j) => !!(j.data.passed && j.data.passed["write:cp4"]))', 6000));
  await js('location.hash = "#/guide"; 1'); await sleep(300);

  /* ---------- failure indicator ---------- */
  await send('Network.emulateNetworkConditions', { offline: true, latency: 0, downloadThroughput: -1, uploadThroughput: -1 });
  await js('document.getElementById("slow").click(); 1');          // any change queues a push
  await until('!document.getElementById("syncChip").hidden', 6000);
  check('offline: header warning appears', await js('!document.getElementById("syncChip").hidden'));
  check('offline: status explains progress is safe locally', /Saved on this device only/.test(await js('document.getElementById("syncStatus").textContent')));
  await shot('6-offline');
  await send('Network.emulateNetworkConditions', { offline: false, latency: 0, downloadThroughput: -1, uploadThroughput: -1 });
  await js('document.getElementById("slow").click(); 1');
  await until('document.getElementById("syncChip").hidden', 6000);
  check('back online: warning clears by itself', await js('document.getElementById("syncChip").hidden'));

  /* ---------- reload keeps the session ---------- */
  await send('Page.reload');
  await until('document.readyState === "complete" && !!document.querySelector("#app")');
  check('reload: still signed in, no passphrase asked', (await js('location.pathname')) === '/');

  /* ---------- sign out ---------- */
  await js('location.hash = "#/guide"; 1'); await sleep(300);
  localXp = await js('JSON.parse(localStorage.getItem("los-gehts-v1")).xp');   // later steps earned more
  await js('document.getElementById("signOut").click(); 1');
  await until('location.pathname === "/login"');
  check('sign out: back at the sign-in page', (await where()) === '/login', await where());
  check('sign out: progress cleared from this browser', await js('JSON.parse(localStorage.getItem("los-gehts-v1")).xp === 0'));
  await send('Page.navigate', { url: BASE + '/#/guide' });
  await until('document.readyState === "complete" && !!document.getElementById("passphrase")');
  check('sign out: app no longer opens', (await js('location.pathname')) === '/login');

  await js(`document.getElementById("passphrase").value = ${JSON.stringify(PASS)}; document.getElementById("form").requestSubmit(); 1`);
  await until('location.pathname === "/" && !!document.querySelector("#app .hero")');
  await until(`JSON.parse(localStorage.getItem("los-gehts-v1") || "{}").xp === ${localXp}`, 5000);
  check('sign back in: progress returns from the server', (await js('JSON.parse(localStorage.getItem("los-gehts-v1")).xp')) === localXp);

  const real = problems.filter((p) => !/Failed to load resource.*(401|net::ERR_INTERNET_DISCONNECTED)/.test(p) && !/ERR_INTERNET_DISCONNECTED/.test(p));
  check('browser reported no errors or policy violations', real.length === 0, real);
} catch (e) {
  bad++;
  console.log('FAIL test crashed -> ' + e.message);
  console.log(problems);
} finally {
  ws.close();
  cleanup();
}
console.log(bad ? bad + ' FAILED' : 'ALL BROWSER CHECKS PASSED');
process.exit(bad ? 1 : 0);
