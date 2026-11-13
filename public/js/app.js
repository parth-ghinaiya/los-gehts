/* App shell: storage, speech, spaced repetition, views. No dependencies, no build step. */
(function () {
  'use strict';

  const D = window.DE_DATA;
  const { esc, shuffle, pick, norm, lev, numToGerman, genderHint } = window.DE_UTIL;
  const app = document.getElementById('app');
  const $ = (q, r) => (r || document).querySelector(q);
  const $$ = (q, r) => Array.from((r || document).querySelectorAll(q));

  /* Line icons, 24×24, drawn in the surrounding text colour.
     Shapes from Feather (MIT licence); the flame from Lucide (ISC licence); the bean is our own. */
  const ICONS = {
    book: '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
    repeat: '<polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>',
    zap: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
    table: '<rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/>',
    compass: '<circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>',
    volume: '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>',
    flame: '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
    check: '<polyline points="20 6 9 17 4 12"/>',
    x: '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
    'arrow-right': '<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>',
    'arrow-left': '<line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>',
    'cloud-off': '<path d="M22.61 16.95A5 5 0 0 0 18 10h-1.26a8 8 0 0 0-7.05-6M5 5a8 8 0 0 0 4 15h9a5 5 0 0 0 1.7-.3"/><line x1="1" y1="1" x2="23" y2="23"/>',
    award: '<circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>',
    trend: '<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>',
    target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
    clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
    layers: '<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>',
    edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>',
    hash: '<line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/><line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/>',
    info: '<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>',
    cup: '<path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/>',
    bean: '<ellipse cx="12" cy="12" rx="6.5" ry="9.5" transform="rotate(35 12 12)"/><path d="M7.2 17.6c5.2-2 .6-8.6 9.6-11.2"/>',
    external: '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>',
  };
  const icon = (name, cls) => '<svg class="i' + (cls ? ' ' + cls : '') + '" viewBox="0 0 24 24" aria-hidden="true">' + ICONS[name] + '</svg>';
  const unitNo = (i) => String(i + 1).padStart(2, '0');

  /* ====================================================================
     State (localStorage)
     ==================================================================== */
  const KEY = 'los-gehts-v1';
  const defaults = () => ({
    cards: {},                                   // id -> { box, due, seen, ok }
    xp: 0,
    sessions: 0,
    streak: { last: 0, count: 0, best: 0 },
    drills: { gender: 0, numbers: 0, verbs: 0 }, // best streaks
    settings: { theme: 'auto', slow: false, auto: true, level: '' },   // per device, never overwritten by sync
    updatedAt: 0,                                // ms, last local change
    epoch: 0,                                    // ms of the last reset/import; a higher epoch replaces older data
  });

  /* Leitner boxes: days until the next review after a correct answer. */
  const INTERVALS = [0, 1, 3, 7, 14, 30, 60];

  const num = (v) => { const x = Number(v); return Number.isFinite(x) ? x : 0; };

  /* Rebuild a state object from untrusted JSON (storage, import file, server):
     every value is coerced to the expected type, anything else is dropped. */
  const hydrate = (raw) => {
    const d = defaults();
    if (!raw || typeof raw !== 'object') return d;
    if (raw.cards && typeof raw.cards === 'object') {
      Object.keys(raw.cards).forEach((id) => {
        const c = raw.cards[id];
        if (!c || typeof c !== 'object') return;
        d.cards[id] = {
          box: Math.min(Math.max(Math.trunc(num(c.box)), 0), INTERVALS.length - 1),
          due: num(c.due), seen: num(c.seen), ok: num(c.ok),
        };
      });
    }
    d.xp = num(raw.xp);
    d.sessions = num(raw.sessions);
    d.updatedAt = num(raw.updatedAt);
    d.epoch = num(raw.epoch);
    const st0 = raw.streak || {};
    d.streak = { last: num(st0.last), count: num(st0.count), best: num(st0.best) };
    const dr = raw.drills || {};
    d.drills = { gender: num(dr.gender), numbers: num(dr.numbers), verbs: num(dr.verbs) };
    const se = raw.settings || {};
    d.settings = {
      theme: ['auto', 'light', 'dark'].includes(se.theme) ? se.theme : 'auto',
      slow: se.slow === true,
      auto: se.auto !== false,
      level: ['a1', 'a2', 'b1'].includes(se.level) ? se.level : '',   // '' = follow progress
    };
    return d;
  };

  const load = () => {
    try {
      return hydrate(JSON.parse(localStorage.getItem(KEY) || 'null'));
    } catch (e) {
      return defaults();
    }
  };
  let S = load();
  const persist = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* private mode */ } };
  /* Every change goes through save(): stamp it, store it, and let sync push it. */
  const save = () => { S.updatedAt = Date.now(); persist(); Sync.queue(); };

  /* Local calendar day as an integer, so "tomorrow" flips at local midnight. */
  const dayNum = () => { const d = new Date(); return Math.floor((d.getTime() - d.getTimezoneOffset() * 60000) / 86400000); };

  /* ====================================================================
     Cards
     ==================================================================== */
  const deText = (w) => (w.art ? w.art + ' ' : '') + w.de;
  const deHtml = (w) => (w.art ? '<span class="g-' + w.art + '">' + w.art + '</span> ' : '') + esc(w.de);

  const CARDS = [];
  D.UNITS.forEach((u, ui) => u.words.forEach((w) => {
    CARDS.push(Object.assign({}, w, { unit: u.id, level: u.level, ui, id: u.id + '|' + deText(w) }));
  }));
  const unitById = (id) => D.UNITS.find((u) => u.id === id);
  const cardsOf = (u) => CARDS.filter((c) => c.unit === u.id);
  const st = (c) => S.cards[c.id] || { box: 0, due: 0, seen: 0, ok: 0 };

  const grade = (id, ok) => {
    const today = dayNum();
    const c = S.cards[id] || (S.cards[id] = { box: 0, due: today, seen: 0, ok: 0 });
    c.seen++;
    if (ok) { c.ok++; c.box = Math.min(c.box + 1, INTERVALS.length - 1); } else { c.box = 0; }
    c.due = today + INTERVALS[c.box];
  };

  const dueCards = () => { const t = dayNum(); return CARDS.filter((c) => S.cards[c.id] && S.cards[c.id].due <= t); };
  const seenCards = () => CARDS.filter((c) => S.cards[c.id] && S.cards[c.id].seen > 0);

  const unitStat = (u) => {
    const cs = cardsOf(u);
    const seen = cs.filter((c) => st(c).seen > 0).length;
    const strong = cs.filter((c) => st(c).box >= 3).length;
    return { n: cs.length, seen, strong, pct: Math.round((seen / cs.length) * 100), done: seen === cs.length };
  };

  const touchStreak = () => {
    const t = dayNum();
    const s = S.streak;
    if (s.last === t) return;
    s.count = s.last === t - 1 ? s.count + 1 : 1;
    s.last = t;
    s.best = Math.max(s.best, s.count);
  };
  /* ---- levels (A1, A2, B1): only those that have units ---- */
  const unitsOf = (levelId) => D.UNITS.filter((u) => u.level === levelId);
  const LEVELS = D.LEVELS.filter((l) => unitsOf(l.id).length > 0);
  const levelById = (id) => LEVELS.find((l) => l.id === id);
  const levelIdx = (id) => LEVELS.findIndex((l) => l.id === id);
  const unitNoIn = (u) => unitsOf(u.level).indexOf(u);   // position inside its own level
  const levelStat = (l) => {
    const stats = unitsOf(l.id).map(unitStat);
    const sum = (k) => stats.reduce((n, x) => n + x[k], 0);
    const words = sum('n');
    return {
      units: stats.length, unitsDone: stats.filter((x) => x.done).length,
      words, seen: sum('seen'), strong: sum('strong'),
      pct: Math.round((sum('seen') / words) * 100), done: stats.every((x) => x.done),
    };
  };
  /* The level on screen: the one picked by hand, else the first that is not finished. */
  const currentLevel = () => levelById(S.settings.level) || LEVELS.find((l) => !levelStat(l).done) || LEVELS[LEVELS.length - 1];
  /* How well a word is known, 0–3, for the small meter next to it. */
  const strength = (c) => { const x = st(c); return x.seen === 0 ? 0 : x.box <= 2 ? 1 : x.box <= 4 ? 2 : 3; };
  const STRENGTH = ['New', 'Learning', 'Familiar', 'Strong'];

  const streakNow = () => (S.streak.last >= dayNum() - 1 ? S.streak.count : 0);

  /* ====================================================================
     Sync (optional): the whole state as one JSON row in the site's database.
     The app always works from localStorage; the server is a shared copy.
     ==================================================================== */
  const stateSig = (s) => JSON.stringify([s.epoch, s.xp, s.sessions, s.streak, s.drills,
    Object.keys(s.cards).sort().map((k) => [k, s.cards[k].box, s.cards[k].due, s.cards[k].seen, s.cards[k].ok])]);

  /* Combine this device's state with the server's so that practice done on
     either side survives. Settings stay local. */
  const merge = (local, remote) => {
    if (local.epoch !== remote.epoch) {
      const winner = local.epoch > remote.epoch ? local : remote;
      return Object.assign(hydrate(winner), { settings: local.settings });
    }
    const out = defaults();
    out.epoch = local.epoch;
    out.updatedAt = Math.max(local.updatedAt, remote.updatedAt);
    out.settings = local.settings;
    new Set(Object.keys(local.cards).concat(Object.keys(remote.cards))).forEach((id) => {
      const a = local.cards[id];
      const b = remote.cards[id];
      // the copy that has been practised more is the newer one
      out.cards[id] = !a ? b : !b ? a : a.seen !== b.seen ? (a.seen > b.seen ? a : b) : (a.due >= b.due ? a : b);
    });
    out.xp = Math.max(local.xp, remote.xp);
    out.sessions = Math.max(local.sessions, remote.sessions);
    const ls = local.streak;
    const rs = remote.streak;
    const cur = ls.last !== rs.last ? (ls.last > rs.last ? ls : rs) : (ls.count >= rs.count ? ls : rs);
    out.streak = { last: cur.last, count: cur.count, best: Math.max(ls.best, rs.best, cur.count) };
    Object.keys(out.drills).forEach((k) => { out.drills[k] = Math.max(local.drills[k], remote.drills[k]); });
    return out;
  };

  /* Sync needs no setup: the server only serves this app to a signed-in browser, and the
     session travels in an HttpOnly cookie that this code can neither read nor leak. */
  const Sync = (() => {
    let on = /^https?:$/.test(location.protocol);   // off when opened as a local file
    let state = on ? 'idle' : 'off';
    let at = 0;
    let timer = null;
    let busy = false;
    let dirty = false;
    let lastPull = 0;

    try { localStorage.removeItem('los-gehts-sync'); } catch (e) { /* passphrase kept by an earlier version */ }

    const text = () => {
      const time = at ? new Date(at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
      return {
        off: '',
        idle: 'Signed in.',
        busy: 'Saving …',
        ok: 'Saved to your account at ' + time + '.',
        offline: 'Saved on this device only. It will reach your account when the server is reachable.',
      }[state];
    };
    const setState = (s) => {
      state = s;
      at = Date.now();
      const el = $('#syncStatus');
      if (el) el.textContent = text();
      const chip = $('#syncChip');
      if (chip) chip.hidden = state !== 'offline';
    };

    const call = async (method, body) => {
      const init = { method, cache: 'no-store' };
      if (body) {
        init.body = body;
        init.headers = { 'Content-Type': 'application/json' };
        init.keepalive = body.length < 60000;   // lets a push finish while the tab is closing
      }
      const r = await fetch('/api/progress', init);
      if (r.status === 401) { const e = new Error('signed out'); e.signedOut = true; throw e; }
      if (r.status === 404) { const e = new Error('no api'); e.noApi = true; throw e; }
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.json();
    };

    const failed = (e) => {
      if (e && e.signedOut) {
        location.replace('/login');   // session ended; local progress stays and merges after sign-in
      } else if (e && e.noApi) {
        on = false;                   // a plain file server: nothing to sync with
        setState('off');
        refreshAfterSync();
      } else {
        setState('offline');
      }
    };

    const push = async () => {
      dirty = false;
      try {
        await call('PUT', JSON.stringify(S));
        setState('ok');
      } catch (e) {
        dirty = true;
        throw e;
      }
    };

    const pull = async () => {
      if (!on || busy) return;
      busy = true;
      setState('busy');
      try {
        const res = await call('GET');
        lastPull = Date.now();
        if (res && res.data) {
          const remote = hydrate(res.data);
          const merged = merge(S, remote);
          const changedHere = stateSig(merged) !== stateSig(S);
          const changedThere = stateSig(merged) !== stateSig(remote);
          if (changedHere) { S = merged; persist(); refreshAfterSync(); }
          if (changedThere) await push(); else setState('ok');
        } else {
          await push();   // first device: seed the server
        }
      } catch (e) {
        failed(e);
      } finally {
        busy = false;
      }
    };

    const flush = async () => {
      clearTimeout(timer);
      timer = null;
      if (!dirty || !on) return;
      if (busy) { timer = setTimeout(flush, 1500); return; }
      busy = true;
      setState('busy');
      try { await push(); } catch (e) { failed(e); } finally { busy = false; }
    };

    return {
      on: () => on,
      text,
      queue() {
        if (!on) return;
        dirty = true;
        clearTimeout(timer);
        timer = setTimeout(flush, 2500);
      },
      flush,
      pull,
      pullIfStale() { if (Date.now() - lastPull > 60000) pull(); },
      /* Ends the session (on every device if asked) and clears this browser's copy of the
         progress. On success the page navigates away. Otherwise returns why it stopped:
         'unsynced' — recent progress is not on the server yet (pass force to sign out anyway);
         'offline'  — the server could not be reached, so the session is still active. */
      async signOut(everywhere, force) {
        clearTimeout(timer);
        timer = null;
        if (dirty && !busy) {
          busy = true;
          try { await push(); } catch (e) { /* reported below */ } finally { busy = false; }
        }
        if ((dirty || busy) && !force) return 'unsynced';
        try {
          const r = await fetch('/api/logout', {
            method: 'POST',
            cache: 'no-store',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ everywhere: !!everywhere }),
          });
          if (!r.ok) throw new Error('HTTP ' + r.status);
        } catch (e) {
          return 'offline';
        }
        const settings = S.settings;
        S = defaults();
        S.settings = settings;   // theme and speech choices are not private
        persist();
        location.replace('/login');
        return '';
      },
    };
  })();

  /* ====================================================================
     Speech (browser built-in, works offline)
     ==================================================================== */
  const synth = 'speechSynthesis' in window ? window.speechSynthesis : null;
  let voice = null;

  const pickVoice = () => {
    if (!synth) return;
    const score = (v) => (v.lang.replace('_', '-') === 'de-DE' ? 2 : 0) + (/google|premium|enhanced|natural|neural/i.test(v.name) ? 1 : 0);
    const de = synth.getVoices().filter((v) => /^de([-_]|$)/i.test(v.lang));
    voice = de.sort((a, b) => score(b) - score(a))[0] || null;
  };
  if (synth) {
    pickVoice();
    if (synth.addEventListener) synth.addEventListener('voiceschanged', pickVoice);
  }
  const canListen = () => !!voice;

  const say = (text) => {
    if (!synth || !text) return;
    synth.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'de-DE';
    if (voice) u.voice = voice;
    u.rate = S.settings.slow ? 0.7 : 0.92;
    synth.speak(u);
  };
  const autoSay = (text) => { if (S.settings.auto) say(text); };
  const sayBtn = (text) => '<button type="button" class="say" data-say="' + esc(text) + '" aria-label="Listen" title="Listen">' + icon('volume') + '</button>';

  /* {{German}} in content -> tappable, speakable chip */
  const fmt = (html) => html.replace(/\{\{(.+?)\}\}/g, (_, t) => '<button type="button" class="say-chip" data-say="' + esc(t) + '">' + esc(t) + '</button>');

  /* ====================================================================
     Shell
     ==================================================================== */
  let viewTok = 0;   // bumped on every navigation; stale timers check it
  let sess = null;
  let curSection = 'learn';

  /* Called when sync brought in changes from another device. Never interrupts an exercise. */
  const refreshAfterSync = () => {
    if (sess || /^#\/(practice|drills\/)/.test(location.hash)) { updateChrome(curSection); return; }
    route(true);
  };

  const applyTheme = () => {
    const t = S.settings.theme;
    if (t === 'auto') document.documentElement.removeAttribute('data-theme');
    else document.documentElement.setAttribute('data-theme', t);
  };

  const updateChrome = (section) => {
    $$('#nav a').forEach((a) => a.classList.toggle('on', a.dataset.nav === section));
    const due = dueCards().length;
    const badge = $('#dueBadge');
    badge.hidden = due === 0;
    badge.textContent = due > 99 ? '99+' : String(due);
    $('#streakChip b').textContent = String(streakNow());
  };

  const go = (hash) => { if (location.hash === hash) route(); else location.hash = hash; };
  const backLink = (hash, label) => '<a class="back" href="' + hash + '">' + icon('arrow-left') + label + '</a>';
  const umlautBar = () => '<div class="uml">' + ['ä', 'ö', 'ü', 'ß'].map((ch) => '<button type="button" class="key" data-ins="' + ch + '" aria-label="Insert ' + ch + '">' + ch + '</button>').join('') + '</div>';

  /* ====================================================================
     Home
     ==================================================================== */
  /* Progress ring: share of a level's words that have been practised at least once. */
  const ring = (pct, label) => {
    const r = 20;
    const len = 2 * Math.PI * r;
    return '<svg class="ring" viewBox="0 0 48 48" role="img" aria-label="' + esc(label) + '">' +
      '<circle class="ring-bg" cx="24" cy="24" r="' + r + '"/>' +
      '<circle class="ring-fg" cx="24" cy="24" r="' + r + '" stroke-dasharray="' + len.toFixed(1) + '" stroke-dashoffset="' + (len * (1 - pct / 100)).toFixed(1) + '" transform="rotate(-90 24 24)"/>' +
      '<text class="ring-t" x="24" y="24">' + pct + '%</text></svg>';
  };

  const viewHome = () => {
    const h = new Date().getHours();
    const hello = h < 11 ? 'Guten Morgen!' : h < 18 ? 'Guten Tag!' : 'Guten Abend!';
    const due = dueCards().length;
    const seen = seenCards().length;
    const strong = CARDS.filter((c) => st(c).box >= 3).length;
    const lv = currentLevel();
    const units = unitsOf(lv.id);
    const stats = units.map(unitStat);
    const nextIdx = stats.findIndex((x) => !x.done);
    const next = nextIdx >= 0 ? units[nextIdx] : null;
    const started = seen > 0;

    const plan = [];
    if (due) plan.push([icon('repeat'), 'Review ' + due + ' word' + (due === 1 ? '' : 's'), 'Due today — do these first', '#/review', 'Review']);
    if (next) plan.push([unitNo(nextIdx), (stats[nextIdx].seen ? 'Continue' : 'Start') + ': ' + next.title, lv.name + ' · ' + next.sub, '#/unit/' + next.id, 'Open']);
    plan.push([icon('zap'), 'Two-minute drill', 'der/die/das, numbers or verbs', '#/drills', 'Drill']);

    app.innerHTML = `
      <section class="hero">
        <div class="card">
          <span class="eyebrow">Heute · today</span>
          <h1>${hello} ${sayBtn(hello)}</h1>
          <p class="lede">${started ? 'Here is today’s plan. Fifteen minutes — about one cup of coffee.' : 'Learn German from zero to B1 in short daily sessions: read a small idea, hear it, then pull it back out of memory.'}</p>
          <ol class="plan">
            ${plan.map((p) => `<li><span class="ico">${p[0]}</span><div><b>${esc(p[1])}</b><small>${esc(p[2])}</small></div><a class="btn ${p === plan[0] ? 'primary' : ''}" href="${p[3]}">${p[4]}</a></li>`).join('')}
          </ol>
        </div>
        <div class="stats">
          <div class="stat"><b>${icon('cup', 'accent')}${streakNow()}</b><span>day streak (best ${S.streak.best})</span></div>
          <div class="stat"><b>${icon('bean', 'accent')}${S.xp}</b><span>Bohnen — beans earned (XP)</span></div>
          <div class="stat"><b>${seen}<small> / ${CARDS.length}</small></b><span>words met</span></div>
          <div class="stat"><b>${strong}</b><span>words strong (7+ day memory)</span></div>
        </div>
      </section>

      <section>
        <div class="sec-h"><div><span class="eyebrow">Fortschritt · progress</span><h2>Your course</h2></div><small>Pick a level to see its units</small></div>
        <div class="levels">
          ${LEVELS.map((l) => {
            const x = levelStat(l);
            return `<a class="card level ${l.id === lv.id ? 'on' : ''}" href="#/level/${l.id}" ${l.id === lv.id ? 'aria-current="true"' : ''}>
              ${ring(x.pct, l.name + ': ' + x.pct + '% of words practised')}
              <div>
                <span class="roast r-${l.id}" title="${esc(l.roastEn)}">${esc(l.roast)}</span>
                <h3>${l.name} · ${esc(l.title)}</h3>
                <p>${x.unitsDone} of ${x.units} units · ${x.seen} of ${x.words} words</p>
                <div class="bar" title="${x.strong} of ${x.words} words strong"><i style="width:${Math.round((x.strong / x.words) * 100)}%"></i></div>
                <small>${x.strong} strong${l.exam ? ' · prepares for ' + esc(l.exam) : ''}</small>
              </div>
            </a>`;
          }).join('')}
        </div>
      </section>

      <section id="path">
        <div class="sec-h"><div><span class="eyebrow">Dein Weg · your path</span><h2>${lv.name} units</h2></div><small>${esc(lv.blurb)}</small></div>
        <div class="path">
          ${units.map((u, i) => {
            const x = stats[i];
            const tag = x.done ? '<span class="tag done">' + icon('check') + 'Done</span>' : i === nextIdx ? '<span class="tag next">Up next</span>' : '';
            return `<a class="card unit ${x.done ? 'done' : i === nextIdx ? 'next' : ''}" href="#/unit/${u.id}">
              ${tag}
              <span class="ico">${x.done ? icon('check') : unitNo(i)}</span>
              <h3>${esc(u.title)}</h3>
              <p>${esc(u.sub)}</p>
              <div class="bar" title="${x.seen} of ${x.n} words practised"><i style="width:${x.pct}%"></i></div>
              <small class="count">${x.seen} / ${x.n} words</small>
            </a>`;
          }).join('')}
        </div>
      </section>`;
  };

  /* ====================================================================
     Unit (learn)
     ==================================================================== */
  const viewUnit = (u) => {
    const i = D.UNITS.indexOf(u);
    const s = unitStat(u);
    const prev = D.UNITS[i - 1];
    const nxt = D.UNITS[i + 1];
    const lv = levelById(u.level);
    const no = unitNoIn(u);

    app.innerHTML = `
      ${backLink('#/level/' + u.level, lv.name + ' units')}
      <div class="unit-head"><span class="ico">${unitNo(no)}</span><div><small>${lv.name} · Unit ${no + 1} of ${unitsOf(u.level).length}</small><h1>${esc(u.title)}</h1></div></div>
      <p class="lede">${esc(u.goal)}</p>
      <div class="unit-prog">
        <div class="bar" title="${s.seen} of ${s.n} words practised"><i style="width:${s.pct}%"></i></div>
        <small>${s.seen} of ${s.n} words practised · ${s.strong} strong${u.cloze ? ' · ' + u.cloze.length + ' gap-fill questions' : ''}</small>
      </div>

      <section>
        <div class="sec-h"><h2>Key ideas</h2><small>Read once, tap the German to hear it</small></div>
        ${u.tips.map((t, k) => `<details class="card tip" ${k === 0 ? 'open' : ''}><summary>${t.h}</summary><div class="body">${fmt(t.html)}</div></details>`).join('')}
      </section>

      <section id="vocab">
        <div class="sec-h"><h2>Words</h2>
          <label class="toggle"><input type="checkbox" id="hideEn"> Hide English (test yourself)</label></div>
        <div class="words">
          ${cardsOf(u).map((c) => `<div class="word">${sayBtn(deText(c))}<div>
              <span class="de">${deHtml(c)}${c.pl ? `<span class="pl">pl. ${esc(c.pl)}</span>` : ''}</span>
              <span class="en">${esc(c.en)}</span>
              ${c.ex ? `<span class="ex"><button type="button" data-say="${esc(c.ex)}">${esc(c.ex)}</button> <i class="muted">${esc(c.exEn)}</i></span>` : ''}
            </div><span class="str" data-s="${strength(c)}" title="${STRENGTH[strength(c)]}" aria-label="${STRENGTH[strength(c)]}"><i></i><i></i><i></i></span></div>`).join('')}
        </div>
      </section>

      <section>
        <div class="sec-h"><h2>Sentences</h2><small>Say each one out loud after the voice</small></div>
        <div class="sents">
          ${u.sentences.map((x) => `<div class="sent">${sayBtn(x.de)}<div><b>${esc(x.de)}</b><span class="en">${esc(x.en)}</span></div></div>`).join('')}
        </div>
      </section>

      <div class="cta">
        <div><b>${s.done ? 'All words practised' : s.seen ? s.seen + ' of ' + s.n + ' words practised' : 'Ready? About 5 minutes.'}</b><br>
          <small>${s.done ? 'Practise again any time — reviews will bring the words back.' : 'Each round covers 10 words and a few sentences.'}</small></div>
        <div class="row">
          ${prev ? `<a class="btn icon" href="#/unit/${prev.id}" aria-label="Previous unit" title="Previous unit">${icon('arrow-left')}</a>` : ''}
          <a class="btn primary" href="#/practice/${u.id}">${s.done ? 'Practise again' : 'Practise'}${icon('arrow-right')}</a>
          ${nxt ? `<a class="btn icon" href="#/unit/${nxt.id}" aria-label="Next unit" title="Next unit">${icon('arrow-right')}</a>` : ''}
        </div>
      </div>`;

    $('#hideEn').onchange = (e) => {
      $('#vocab').classList.toggle('hide-en', e.target.checked);
      $$('#vocab .show').forEach((el) => el.classList.remove('show'));
    };
    $('#vocab').addEventListener('click', (e) => {
      const el = e.target.closest('.en, .ex i');
      if (el) el.classList.toggle('show');
    });
  };

  /* ====================================================================
     Session engine (unit practice + review)
     ==================================================================== */
  const PRAISE = ['Richtig!', 'Genau!', 'Super!', 'Sehr gut!', 'Perfekt!', 'Prima!'];

  const distractors = (c) => {
    const isNoun = !!c.art;
    const pool = CARDS.filter((o) => o.id !== c.id && !!o.art === isNoun && o.ui <= Math.max(c.ui, 1));
    const same = shuffle(pool.filter((o) => o.unit === c.unit));
    const other = shuffle(pool.filter((o) => o.unit !== c.unit));
    const out = [];
    const usedEn = new Set([c.en]);
    const usedDe = new Set([norm(deText(c))]);
    for (const o of same.slice(0, 2).concat(other, same.slice(2))) {
      if (out.length === 3) break;
      if (usedEn.has(o.en) || usedDe.has(norm(deText(o)))) continue;
      usedEn.add(o.en); usedDe.add(norm(deText(o)));
      out.push(o);
    }
    return out;
  };

  /* Harder exercise as the memory gets stronger: recognise -> produce -> type. */
  const wordEx = (c) => {
    const s = st(c);
    if (s.seen === 0 || s.box === 0) return { kind: 'mc', dir: 'de-en', card: c };
    if (s.box === 1) return { kind: 'mc', dir: canListen() && Math.random() < 0.5 ? 'listen' : 'en-de', card: c };
    if (s.box === 2) return Math.random() < 0.5 ? { kind: 'mc', dir: 'en-de', card: c } : { kind: 'type', card: c };
    return { kind: 'type', card: c };
  };

  const sentenceEx = (list, count) => shuffle(list).slice(0, count)
    .map((sent, i) => ({ kind: 'build', sent, listen: canListen() && i % 2 === 1 }));

  const genderEx = (cards, count) => shuffle(cards.filter((c) => c.art)).slice(0, count)
    .map((c) => ({ kind: 'gender', card: c, nograde: true }));

  /* Gap-fill items are not spaced-repetition cards; `sent` lets feedback and the
     "worth another look" list treat them like sentences. */
  const clozeEx = (list, count) => shuffle(list || []).slice(0, count)
    .map((item) => ({ kind: 'cloze', item, sent: { de: item.de.replace('___', item.answer), en: item.en } }));

  const unitQueue = (u) => {
    const cs = shuffle(cardsOf(u)).sort((a, b) => st(a).seen - st(b).seen || st(a).box - st(b).box).slice(0, 10);
    return shuffle(cs.map(wordEx).concat(genderEx(cs, 3)))
      .concat(clozeEx(u.cloze, 4))
      .concat(sentenceEx(u.sentences, u.cloze ? 3 : 4));
  };

  const reviewQueue = (cards) => {
    const startedUnits = D.UNITS.filter((u) => unitStat(u).seen > 0);
    const sents = startedUnits.length ? sentenceEx(startedUnits.flatMap((u) => u.sentences), 3) : [];
    const gaps = clozeEx(startedUnits.flatMap((u) => u.cloze || []), 2);
    return shuffle(cards.map(wordEx).concat(genderEx(cards, 3))).concat(gaps).concat(sents);
  };

  const startSession = (cfg) => {
    sess = Object.assign({ i: 0, first: 0, xp: 0, missed: [], answered: false }, cfg);
    sess.total = cfg.queue.length;
    document.body.classList.add('in-session');
    renderSession();
  };

  const startUnit = (u) => startSession({ title: u.title, queue: unitQueue(u), back: '#/unit/' + u.id, again: () => startUnit(u), unit: u });

  const startReview = (extra) => {
    let cards;
    if (extra) cards = shuffle(seenCards()).sort((a, b) => st(a).box - st(b).box).slice(0, 12);
    else cards = dueCards().sort((a, b) => st(a).due - st(b).due).slice(0, 20);
    startSession({ title: 'Review', queue: reviewQueue(cards), back: '#/review', again: null });
  };

  /* ---- exercise renderers: each returns HTML and wires itself up in bind() ---- */
  const optsHtml = (items) => '<div class="opts">' + items.map((html, i) =>
    '<button type="button" class="opt" data-i="' + i + '"><kbd>' + (i + 1) + '</kbd><span>' + html + '</span></button>').join('') + '</div>';

  const EX = {
    mc: {
      html(ex) {
        const c = ex.card;
        if (!ex.opts) ex.opts = shuffle([c].concat(distractors(c)));
        if (ex.dir === 'de-en') {
          return '<p class="lbl">What does this mean?' + retryTag(ex) + '</p><h2 class="big">' + sayBtn(deText(c)) + '<span>' + deHtml(c) + '</span></h2>' +
            optsHtml(ex.opts.map((o) => esc(o.en)));
        }
        if (ex.dir === 'listen') {
          return '<p class="lbl">Listen — what does it mean?' + retryTag(ex) + '</p><div class="bigplay">' + sayBtn(deText(c)) + '</div>' +
            optsHtml(ex.opts.map((o) => esc(o.en)));
        }
        return '<p class="lbl">How do you say this in German?' + retryTag(ex) + '</p><h2 class="big">' + esc(c.en) + '</h2>' +
          optsHtml(ex.opts.map(deHtml));
      },
      bind(ex) {
        if (ex.dir !== 'en-de') autoSay(deText(ex.card));
        $$('#q .opt').forEach((b) => {
          b.onclick = () => {
            const ok = ex.opts[+b.dataset.i].id === ex.card.id;
            b.classList.add(ok ? 'ok' : 'bad');
            $$('#q .opt')[ex.opts.findIndex((o) => o.id === ex.card.id)].classList.add('ok');
            finish(ex, ok);
          };
        });
      },
    },

    cloze: {
      html(ex) {
        if (!ex.opts) ex.opts = shuffle([ex.item.answer].concat(ex.item.wrong));
        const parts = ex.item.de.split('___');
        return '<p class="lbl">Sprachbausteine — fill the gap' + retryTag(ex) + '</p>' +
          '<h2 class="big sm gapline">' + esc(parts[0]) + '<span class="gap" id="gap">&nbsp;</span>' + esc(parts[1]) + '</h2>' +
          optsHtml(ex.opts.map(esc));
      },
      bind(ex) {
        $$('#q .opt').forEach((b) => {
          b.onclick = () => {
            const ok = ex.opts[+b.dataset.i] === ex.item.answer;
            b.classList.add(ok ? 'ok' : 'bad');
            $$('#q .opt')[ex.opts.indexOf(ex.item.answer)].classList.add('ok');
            const gap = $('#gap');
            gap.textContent = ex.item.answer;
            gap.classList.add('filled');
            finish(ex, ok, ex.item.why ? '<p>' + icon('info') + ' ' + esc(ex.item.why) + '</p>' : '');
          };
        });
      },
    },

    gender: {
      html(ex) {
        const c = ex.card;
        return '<p class="lbl">der, die or das?' + retryTag(ex) + '</p><h2 class="big"><span class="blank">___</span> ' + esc(c.de) + '</h2><p class="muted">' + esc(c.en) + '</p>' +
          '<div class="gbtns">' + ['der', 'die', 'das'].map((g) => '<button type="button" class="gbtn g-' + g + '" data-g="' + g + '">' + g + '</button>').join('') + '</div>';
      },
      bind(ex) {
        $$('#q .gbtn').forEach((b) => {
          b.onclick = () => {
            const ok = b.dataset.g === ex.card.art;
            b.classList.add(ok ? 'ok' : 'bad');
            $('#q .gbtn[data-g="' + ex.card.art + '"]').classList.add('ok');
            finish(ex, ok, ruleNote(ex.card));
          };
        });
      },
    },

    type: {
      html(ex) {
        const c = ex.card;
        return '<p class="lbl">Type it in German' + (c.art ? ' — with der / die / das' : '') + retryTag(ex) + '</p><h2 class="big">' + esc(c.en) + '</h2>' +
          '<div class="typer"><input id="ans" type="text" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="Auf Deutsch …" aria-label="Your answer in German">' + umlautBar() + '</div>' +
          '<button type="button" class="btn primary" id="check">Check</button>';
      },
      bind(ex) {
        const inp = $('#ans');
        inp.focus();
        $('#check').onclick = () => {
          if (!inp.value.trim()) { inp.focus(); return; }
          const r = evalTyped(inp.value, ex.card);
          finish(ex, r.ok, r.note);
        };
      },
    },

    build: {
      html(ex) {
        if (!ex.tiles) {
          const target = ex.sent.de.replace(/[.,!?;:]/g, '').split(/\s+/);
          let tiles = shuffle(target);
          for (let k = 0; k < 5 && target.length > 1 && tiles.join(' ') === target.join(' '); k++) tiles = shuffle(target);
          ex.tiles = tiles;
        }
        const head = ex.listen
          ? '<p class="lbl">Listen and build the sentence' + retryTag(ex) + '</p><div class="bigplay">' + sayBtn(ex.sent.de) + '</div>'
          : '<p class="lbl">Build this sentence in German' + retryTag(ex) + '</p><h2 class="big sm">' + esc(ex.sent.en) + '</h2>';
        return head + '<div class="line" id="line" aria-label="Your sentence"></div><div class="bank" id="bank">' +
          ex.tiles.map((t) => '<button type="button" class="tile">' + esc(t) + '</button>').join('') +
          '</div><button type="button" class="btn primary" id="check" disabled>Check</button>';
      },
      bind(ex) {
        if (ex.listen) autoSay(ex.sent.de);
        const line = $('#line');
        const bank = $('#bank');
        const chk = $('#check');
        $$('#q .tile').forEach((t) => {
          t.onclick = () => {
            (t.parentElement === bank ? line : bank).appendChild(t);
            chk.disabled = line.children.length === 0;
          };
        });
        chk.onclick = () => {
          const got = $$('.tile', line).map((t) => t.textContent).join(' ');
          const ok = [ex.sent.de].concat(ex.sent.alt).some((a) => norm(a) === norm(got));
          finish(ex, ok, ok ? '' : '<p>You built: <i>' + esc(got) + '</i></p>');
        };
      },
    },
  };

  const retryTag = (ex) => (ex.retry ? '<span class="retry">· once more</span>' : '');

  const ruleNote = (c) => {
    const h = genderHint(c.de, c.art);
    if (!h) return '';
    return '<p>' + (h.match ? icon('info') + ' ' + esc(h.text) + '.' : 'Exception: ' + esc(h.text.charAt(0).toLowerCase() + h.text.slice(1)) + ' — this one just has to be memorised.') + '</p>';
  };

  const evalTyped = (value, c) => {
    const a = norm(value);
    const full = norm(deText(c));
    const bare = norm(c.de);
    if (a === full) return { ok: true, note: '' };
    if (c.art) {
      if (a === bare) return { ok: false, note: '<p>Right word — but always learn it with its article.</p>' };
      const m = a.match(/^(der|die|das)\s+(.+)$/);
      if (m && m[2] === bare) return { ok: false, note: '<p>Right noun, wrong article.</p>' };
    }
    if (full.length >= 6 && lev(a, full) <= 1) return { ok: true, note: '<p>Small typo — check the spelling below.</p>' };
    return { ok: false, note: '<p>You wrote: <i>' + esc(value.trim()) + '</i></p>' };
  };

  const renderSession = () => {
    const ex = sess.queue[sess.i];
    if (!ex) { renderDone(); return; }
    sess.answered = false;
    const pct = Math.round((sess.i / sess.queue.length) * 100);
    app.innerHTML = `
      <div class="session">
        <div class="sess-top">
          <button type="button" class="quit" id="quit" aria-label="Quit session" title="Quit">${icon('x')}</button>
          <div class="bar"><i style="width:${pct}%"></i></div>
          <span class="count">${sess.i + 1} / ${sess.queue.length}</span>
        </div>
        <div class="card q" id="q">${EX[ex.kind].html(ex)}</div>
        <div class="fb" id="fb" hidden aria-live="polite"></div>
      </div>`;
    $('#quit').onclick = () => go(sess.back);
    EX[ex.kind].bind(ex);
  };

  const finish = (ex, ok, note) => {
    if (sess.answered) return;
    sess.answered = true;
    $$('#q button, #q input').forEach((el) => { if (!el.classList.contains('say')) el.disabled = true; });

    if (ex.card && !ex.retry && !ex.nograde) grade(ex.card.id, ok);
    if (ok) {
      const xp = ex.retry ? 4 : 10;
      S.xp += xp; sess.xp += xp;
      if (!ex.retry) sess.first++;
    } else if (!ex.retry) {
      sess.missed.push(ex);
      sess.queue.push(Object.assign({}, ex, { retry: true, opts: null, tiles: null }));
      $('.sess-top .count').textContent = (sess.i + 1) + ' / ' + sess.queue.length;
    }
    touchStreak();
    save();

    const c = ex.card;
    const sol = c
      ? '<div class="sol">' + sayBtn(deText(c)) + ' <b>' + deHtml(c) + '</b>' + (c.pl ? ' <small>pl. ' + esc(c.pl) + '</small>' : '') + ' — ' + esc(c.en) + '</div>' +
        (c.ex ? '<div class="exl">' + esc(c.ex) + ' <span class="muted">· ' + esc(c.exEn) + '</span></div>' : '')
      : '<div class="sol">' + sayBtn(ex.sent.de) + ' <b>' + esc(ex.sent.de) + '</b> — ' + esc(ex.sent.en) + '</div>';

    const fb = $('#fb');
    fb.className = 'fb ' + (ok ? 'ok' : 'bad');
    fb.innerHTML = '<div class="fb-in"><div><strong>' + (ok ? pick(PRAISE) : 'Not quite') + '</strong>' + (note || '') + sol +
      '</div><button type="button" class="btn ' + (ok ? 'primary' : 'dark') + '" id="next">Continue</button></div>';
    fb.hidden = false;
    $('#next').onclick = () => { sess.i++; renderSession(); };
    $('#next').focus();
    autoSay(c ? deText(c) : ex.sent.de);
  };

  const renderDone = () => {
    const acc = sess.total ? Math.round((sess.first / sess.total) * 100) : 100;
    S.sessions++;
    save();
    Sync.flush();   // a finished round is saved to the account at once
    updateChrome(sess.unit ? 'learn' : 'review');
    document.body.classList.remove('in-session');
    const u = sess.unit;
    const s = u ? unitStat(u) : null;
    const nxt = u ? D.UNITS[D.UNITS.indexOf(u) + 1] : null;
    const again = sess.again;
    const moreDue = dueCards().length;
    // a word can be missed twice in one round (meaning + article); list it once
    const missedKeys = new Set();
    const missed = sess.missed.filter((ex) => {
      const k = ex.card ? ex.card.id : ex.sent.de;
      return !missedKeys.has(k) && missedKeys.add(k);
    });

    let msg;
    if (u) msg = s.done ? 'Every word in this unit has been practised. Reviews will keep them alive.' : s.seen + ' of ' + s.n + ' words practised — one more round covers the rest.';
    else msg = moreDue ? moreDue + ' more word' + (moreDue === 1 ? ' is' : 's are') + ' waiting (including any you missed).' : 'Nothing else is due today. Come back tomorrow.';

    app.innerHTML = `
      <div class="session"><div class="card done">
        <div class="badge ${acc >= 60 ? 'ok' : ''}">${icon(acc >= 90 ? 'award' : acc >= 60 ? 'cup' : 'trend')}</div>
        <h1>Geschafft!</h1>
        <p class="muted">${esc(msg)}</p>
        <div class="stats">
          <div class="stat"><b>${acc}%</b><span>right first time</span></div>
          <div class="stat"><b>+${sess.xp}</b><span>XP</span></div>
          <div class="stat"><b>${icon('cup', 'accent')}${streakNow()}</b><span>day streak</span></div>
        </div>
        ${u ? `<div class="lvl-line"><span>${levelById(u.level).name} progress</span><div class="bar"><i style="width:${levelStat(levelById(u.level)).pct}%"></i></div><b>${levelStat(levelById(u.level)).pct}%</b></div>` : ''}
        ${Sync.on() ? `<p class="saved" id="syncStatus">${esc(Sync.text())}</p>` : ''}
        ${missed.length ? '<p class="muted">Worth another look:</p><ul class="missed">' + missed.map((ex) => {
          const t = ex.card ? deText(ex.card) : ex.sent.de;
          const h = ex.card ? deHtml(ex.card) : esc(ex.sent.de);
          return '<li>' + sayBtn(t) + '<span><b>' + h + '</b> — ' + esc(ex.card ? ex.card.en : ex.sent.en) + '</span></li>';
        }).join('') + '</ul>' : ''}
        <div class="row">
          ${u && !s.done ? '<button type="button" class="btn primary" id="again">Next round' + icon('arrow-right') + '</button>' : ''}
          ${u && s.done && nxt ? `<a class="btn primary" href="#/unit/${nxt.id}">Next unit: ${esc(nxt.title)}${icon('arrow-right')}</a>` : ''}
          ${u && s.done ? '<button type="button" class="btn" id="again">Practise again</button>' : ''}
          ${!u && moreDue ? '<button type="button" class="btn primary" id="more">Keep reviewing</button>' : ''}
          <a class="btn" href="#/">Home</a>
        </div>
      </div></div>`;
    if ($('#again')) $('#again').onclick = again;
    if ($('#more')) $('#more').onclick = () => startReview(false);
    sess = null;
  };

  /* ====================================================================
     Review landing
     ==================================================================== */
  const viewReview = () => {
    const due = dueCards().length;
    const seen = seenCards().length;
    if (!seen) {
      app.innerHTML = `<div class="card empty"><div class="badge">${icon('layers')}</div><h1>Nothing to review yet</h1>
        <p class="muted">Words land here after you practise them in a unit, and come back right before you would forget them.</p>
        <a class="btn primary" href="#/unit/${D.UNITS[0].id}">Start unit 1</a></div>`;
      return;
    }
    const boxes = [0, 0, 0, 0];   // new/weak, learning, familiar, strong
    seenCards().forEach((c) => { const b = st(c).box; boxes[b <= 0 ? 0 : b <= 2 ? 1 : b <= 4 ? 2 : 3]++; });
    app.innerHTML = `
      <div class="card empty">
        <div class="badge ${due ? '' : 'ok'}">${icon(due ? 'repeat' : 'check')}</div>
        <h1>${due ? due + ' word' + (due === 1 ? '' : 's') + ' due' : 'All caught up'}</h1>
        <p class="muted">${due ? 'Reviewing right when a word is about to fade is what moves it into long-term memory.' : 'Nothing is due right now. You can still do an extra round on your weakest words.'}</p>
        <div class="row" style="justify-content:center">
          ${due ? '<button type="button" class="btn primary" id="go">Start review' + (due > 20 ? ' (20 at a time)' : '') + '</button>' : ''}
          <button type="button" class="btn" id="extra">Extra practice: weakest words</button>
        </div>
      </div>
      <section>
        <div class="sec-h"><h2>Memory strength</h2><small>${seen} of ${CARDS.length} words met</small></div>
        <div class="stats" style="grid-template-columns:repeat(auto-fit,minmax(130px,1fr))">
          <div class="stat"><b>${boxes[0]}</b><span>to relearn</span></div>
          <div class="stat"><b>${boxes[1]}</b><span>learning (1–3 days)</span></div>
          <div class="stat"><b>${boxes[2]}</b><span>familiar (1–2 weeks)</span></div>
          <div class="stat"><b>${boxes[3]}</b><span>strong (1–2 months)</span></div>
        </div>
      </section>`;
    if ($('#go')) $('#go').onclick = () => startReview(false);
    $('#extra').onclick = () => startReview(true);
  };

  /* ====================================================================
     Drills
     ==================================================================== */
  const viewDrills = () => {
    app.innerHTML = `
      <h1>Drills</h1>
      <p class="lede">Fast, endless reps for the three things that only become automatic through volume. Two minutes each is plenty.</p>
      <div class="grid3">
        <a class="card tile-link" href="#/drills/gender"><div class="ico"><span class="gdots"><b class="g-der"></b><b class="g-die"></b><b class="g-das"></b></span></div><h3>der · die · das</h3><p>See a noun, pick its article. Rules shown as you go. Best streak: ${S.drills.gender}</p></a>
        <a class="card tile-link" href="#/drills/numbers"><div class="ico">${icon('hash')}</div><h3>Numbers</h3><p>Hear or read a German number, type the digits. Best streak: ${S.drills.numbers}</p></a>
        <a class="card tile-link" href="#/drills/verbs"><div class="ico">${icon('edit')}</div><h3>Verb forms</h3><p>Conjugate the ${D.VERBS.length} most useful verbs in the present tense. Best streak: ${S.drills.verbs}</p></a>
      </div>`;
  };

  const bumpBest = (key, streak) => {
    if (streak > (S.drills[key] || 0)) S.drills[key] = streak;
    const el = $('#best');
    if (el) el.textContent = String(S.drills[key] || 0);
  };

  const viewGender = () => {
    const tok = viewTok;
    const seen = new Set();
    const reach = levelIdx(currentLevel().id);   // nouns from the level on screen and the ones below it
    const pool = CARDS.filter((c) => c.art && levelIdx(c.level) <= reach && !seen.has(c.de) && seen.add(c.de));
    let cur = null;
    let streak = 0;
    let locked = false;

    app.innerHTML = `
      ${backLink('#/drills', 'Drills')}
      <h1>der · die · das</h1>
      <p class="lede">Go with your gut, fast. Keys <b>1 2 3</b> work too.</p>
      <div class="card drill">
        <div class="drill-stats">Streak <b id="st">0</b> · Best <b id="best">${S.drills.gender}</b></div>
        <h2 class="big" id="noun"></h2><p class="muted" id="en"></p>
        <div class="gbtns">${['der', 'die', 'das'].map((g) => `<button type="button" class="gbtn g-${g}" data-g="${g}">${g}</button>`).join('')}</div>
        <div class="hint" id="hint" aria-live="polite"></div>
      </div>`;

    const next = () => {
      if (tok !== viewTok) return;
      let c = pick(pool);
      while (cur && c.id === cur.id) c = pick(pool);
      cur = c;
      locked = false;
      $('#noun').innerHTML = '<span class="blank">___</span> ' + esc(cur.de);
      $('#en').textContent = cur.en;
      $('#hint').innerHTML = '';
      $$('.gbtn').forEach((b) => { b.className = 'gbtn g-' + b.dataset.g; b.disabled = false; });
    };

    $$('.gbtn').forEach((b) => {
      b.onclick = () => {
        if (locked) return;
        locked = true;
        const ok = b.dataset.g === cur.art;
        b.classList.add(ok ? 'ok' : 'bad');
        $('.gbtn[data-g="' + cur.art + '"]').classList.add('ok');
        $$('.gbtn').forEach((x) => { x.disabled = true; });
        streak = ok ? streak + 1 : 0;
        $('#st').textContent = String(streak);
        bumpBest('gender', streak);
        if (ok) S.xp += 2;
        touchStreak(); save(); updateChrome('drills');
        $('#noun').innerHTML = deHtml(cur);
        $('#hint').innerHTML = (ok ? '<b class="ok-t">' + icon('check') + ' ' + pick(PRAISE) + '</b>' : '<b class="bad-t">' + icon('x') + ' It is ' + deHtml(cur) + '</b>') +
          (cur.pl ? ' <span class="muted">· plural: die ' + esc(cur.pl) + '</span>' : '') + ruleNote(cur);
        autoSay(deText(cur));
        setTimeout(next, ok ? 1300 : 2800);
      };
    });
    next();
  };

  /* Shared shell for the two typed drills. */
  const typedDrill = (o) => {
    const tok = viewTok;
    let cur = null;
    let streak = 0;
    let state = 'ask';

    app.innerHTML = `
      ${backLink('#/drills', 'Drills')}
      <h1>${o.title}</h1>
      <p class="lede">${o.intro}</p>
      ${o.controls || ''}
      <div class="card drill">
        <div class="drill-stats">Streak <b id="st">0</b> · Best <b id="best">${S.drills[o.key] || 0}</b></div>
        <div id="prompt"></div>
        <div class="typer"><input id="ans" type="text" ${o.numeric ? 'inputmode="numeric"' : ''} autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="${o.placeholder}" aria-label="Your answer">${o.numeric ? '' : umlautBar()}</div>
        <div class="hint" id="hint" aria-live="polite"></div>
        <button type="button" class="btn primary" id="check">Check</button>
      </div>`;

    const inp = $('#ans');
    const btn = $('#check');

    const ask = () => {
      if (tok !== viewTok) return;
      cur = o.next();
      state = 'ask';
      $('#prompt').innerHTML = cur.prompt;
      $('#hint').innerHTML = '';
      inp.value = ''; inp.disabled = false;
      btn.textContent = 'Check';
      inp.focus();
      if (cur.say) autoSay(cur.say);
    };

    btn.onclick = () => {
      if (state === 'done') { ask(); return; }
      if (!inp.value.trim()) { inp.focus(); return; }
      const ok = cur.check(inp.value);
      state = 'done';
      inp.disabled = true;
      streak = ok ? streak + 1 : 0;
      $('#st').textContent = String(streak);
      bumpBest(o.key, streak);
      if (ok) S.xp += 2;
      touchStreak(); save(); updateChrome('drills');
      $('#hint').innerHTML = (ok ? '<b class="ok-t">' + icon('check') + ' ' + pick(PRAISE) + '</b> ' : '<b class="bad-t">' + icon('x') + ' Not quite.</b> ') + cur.solution;
      btn.textContent = 'Next';
      btn.focus();
      if (cur.sayAfter) autoSay(cur.sayAfter);
    };

    if (o.wire) o.wire(ask);
    ask();
  };

  const viewNumbers = () => {
    let max = 20;
    let listen = canListen();
    typedDrill({
      key: 'numbers', numeric: true, placeholder: 'Digits, e.g. 42',
      title: 'Numbers',
      intro: 'Remember: 21–99 are said unit first — <i>einundzwanzig</i> is “one-and-twenty”.',
      controls: `<div class="row">
        <div class="seg" id="range">${[20, 100, 1000].map((m) => `<button type="button" data-max="${m}" class="${m === max ? 'on' : ''}">0–${m}</button>`).join('')}</div>
        <div class="seg" id="mode"><button type="button" data-m="listen" class="${listen ? 'on' : ''}" ${canListen() ? '' : 'disabled title="No German voice on this device"'}>Listen</button><button type="button" data-m="read" class="${listen ? '' : 'on'}">Read</button></div>
      </div>`,
      wire(ask) {
        $$('#range button').forEach((b) => { b.onclick = () => { max = +b.dataset.max; $$('#range button').forEach((x) => x.classList.toggle('on', x === b)); ask(); }; });
        $$('#mode button').forEach((b) => { b.onclick = () => { listen = b.dataset.m === 'listen'; $$('#mode button').forEach((x) => x.classList.toggle('on', x === b)); ask(); }; });
      },
      next() {
        const num = Math.floor(Math.random() * (max + 1));
        const word = numToGerman(num);
        return {
          prompt: listen
            ? '<p class="lbl">Type the number you hear</p><div class="bigplay">' + sayBtn(word) + '</div>'
            : '<p class="lbl">Type this number in digits</p><h2 class="big">' + sayBtn(word) + '<span>' + esc(word) + '</span></h2>',
          say: word,
          check: (v) => parseInt(v.replace(/\D/g, ''), 10) === num,
          solution: '<b>' + num + '</b> = ' + esc(word),
        };
      },
    });
  };

  const viewVerbs = () => {
    const PRON = ['ich', 'du', 'er / sie / es', 'wir', 'ihr', 'sie / Sie'];
    const SPOKEN = ['ich', 'du', 'er', 'wir', 'ihr', 'sie'];
    typedDrill({
      key: 'verbs', placeholder: 'Verb form …',
      title: 'Verb forms',
      intro: 'Present tense. Regular endings are <b>-e, -st, -t, -en, -t, -en</b> — the irregular verbs here are the ones you will use most.',
      next() {
        const v = pick(D.VERBS);
        const p = Math.floor(Math.random() * 6);
        const form = v.forms[p];
        return {
          prompt: '<p class="lbl">' + esc(v.inf) + ' — ' + esc(v.en) + '</p><h2 class="big">' + PRON[p] + ' <span class="blank">___</span></h2>',
          check: (val) => {
            const a = norm(val).replace(/^(ich|du|er|sie|es|wir|ihr)\s+/, '');
            return a === norm(form);
          },
          sayAfter: SPOKEN[p] + ' ' + form,
          solution: '<b>' + SPOKEN[p] + ' ' + esc(form) + '</b><div class="conj">' +
            v.forms.map((f, k) => '<span>' + PRON[k] + ' <b class="' + (k === p ? 'hit' : '') + '">' + esc(f) + '</b></span>').join('') + '</div>',
        };
      },
    });
  };

  /* ====================================================================
     Grammar sheets + guide
     ==================================================================== */
  const viewSheets = (levelId) => {
    const lv = levelById(levelId) || currentLevel();
    const sheets = D.SHEETS.filter((x) => x.level === lv.id).sort((a, b) => (b.exam ? 1 : 0) - (a.exam ? 1 : 0));
    app.innerHTML = `
      <span class="eyebrow">Grammatik · grammar</span>
      <h1>Grammar at a glance</h1>
      <p class="lede">Reference tables for when you need to look something up. Don’t memorise these — the units teach them one idea at a time.</p>
      <div class="row"><nav class="seg" aria-label="Level">${LEVELS.map((l) => `<a href="#/grammar/${l.id}" class="${l.id === lv.id ? 'on' : ''}" ${l.id === lv.id ? 'aria-current="true"' : ''}>${l.name}</a>`).join('')}</nav>
        <small>${sheets.length} sheets · ${esc(lv.title)}${lv.exam ? ' · ' + esc(lv.exam) : ''}</small></div>
      <section>${sheets.map((x, i) => `<details class="card sheet" ${i === 0 ? 'open' : ''}><summary>${x.title}</summary><div class="body">${fmt(x.html)}</div></details>`).join('')}</section>`;
  };

  const viewGuide = () => {
    const t = S.settings.theme;
    app.innerHTML = `
      <span class="eyebrow">Anleitung · guide</span>
      <h1>How to learn with this</h1>
      <p class="lede">The fastest route is not more hours — it is the right kind of practice, a little every day.</p>

      <section>
        <div class="sec-h"><h2>A 15-minute day</h2></div>
        <div class="card"><ol class="steps">
          <li><b>Review</b> whatever is due (3–5 min). Always first — it is the part that makes words permanent.</li>
          <li><b>One unit step</b> (5–8 min): read the key ideas, listen to the words, then do one practice round.</li>
          <li><b>One drill</b> (2 min): der/die/das, numbers or verbs.</li>
          <li><b>Say everything out loud.</b> Tap, listen, repeat. Feeling silly is part of the method.</li>
        </ol></div>
      </section>

      <section>
        <div class="sec-h"><h2>Why it is built this way</h2></div>
        <div class="method">${D.METHOD.map((m) => `<div class="card"><div class="ico">${icon(m[0])}</div><h3>${m[1]}</h3><p>${m[2]}</p></div>`).join('')}</div>
        <p class="note" style="margin-top:12px">What this app cannot do: have a conversation with you or correct your accent. Pair it with real listening and real people — the resources below cover both.</p>
      </section>

      <section>
        <div class="sec-h"><h2>Best free resources to pair it with</h2></div>
        <div class="res">${D.RESOURCES.map((r) => `<a href="${r[1]}" target="_blank" rel="noopener noreferrer"><div><b>${esc(r[0])}</b><span>${esc(r[2])}</span></div>${icon('external')}</a>`).join('')}</div>
      </section>

      <section>
        <div class="sec-h"><h2>Settings</h2></div>
        <div class="card settings">
          <div class="line-item"><div><b>Theme</b></div>
            <div class="seg" id="theme">${['auto', 'light', 'dark'].map((k) => `<button type="button" data-t="${k}" class="${t === k ? 'on' : ''}">${k[0].toUpperCase() + k.slice(1)}</button>`).join('')}</div></div>
          <label class="line-item"><span><b>Slow speech</b><br><small>Speak German at 70% speed</small></span><input type="checkbox" id="slow" ${S.settings.slow ? 'checked' : ''}></label>
          <label class="line-item"><span><b>Auto-play audio</b><br><small>Speak each answer automatically</small></span><input type="checkbox" id="auto" ${S.settings.auto ? 'checked' : ''}></label>
          <div class="line-item"><span><b>Voice</b><br><small id="voiceInfo"></small></span><button type="button" class="btn" data-say="Hallo! Schön, dass du da bist.">Test voice</button></div>
          <div class="line-item"><span><b>Reset progress</b><br><small>Erases streak, XP and all word history${Sync.on() ? ' — here and on every synced device' : ' on this device'}</small></span><button type="button" class="btn danger" id="reset">Reset</button></div>
        </div>
      </section>

      <section>
        <div class="sec-h"><h2>Account and data</h2></div>
        <div class="card settings">
          ${!Sync.on() ? `<p class="muted" style="margin:0">Sync needs the hosted version of this app. Here, progress stays in this browser — use export and import to move it.</p>`
            : `<div class="line-item"><span><b>Sync is automatic</b><br><small id="syncStatus">${esc(Sync.text())}</small></span></div>
              <div class="line-item"><span><b>Sign out</b><br><small>Clears progress from this browser. It stays on the server and returns when you sign in.</small></span>
                <div class="row"><button type="button" class="btn" id="signOut">Sign out</button><button type="button" class="btn" id="signOutAll">All devices</button></div></div>
              <small id="signOutMsg" class="bad-t"></small>`}
          <div class="line-item"><span><b>Backup file</b><br><small>Download your progress, or restore it from a file</small></span>
            <div class="row"><button type="button" class="btn" id="export">Export</button><button type="button" class="btn" id="import">Import</button>
            <input type="file" id="importFile" accept="application/json,.json" hidden></div></div>
          <small id="importMsg" class="muted"></small>
        </div>
      </section>`;

    $('#voiceInfo').textContent = !synth ? 'This browser has no speech support. Everything else still works.'
      : voice ? voice.name + ' (' + voice.lang + ')'
        : 'No German voice found. Add one in your system’s speech settings; listening exercises are skipped until then.';
    $$('#theme button').forEach((b) => {
      b.onclick = () => { S.settings.theme = b.dataset.t; save(); applyTheme(); $$('#theme button').forEach((x) => x.classList.toggle('on', x === b)); };
    });
    $('#slow').onchange = (e) => { S.settings.slow = e.target.checked; save(); };
    $('#auto').onchange = (e) => { S.settings.auto = e.target.checked; save(); };
    let armed = false;
    $('#reset').onclick = (e) => {
      if (!armed) { armed = true; e.target.textContent = 'Click again to erase everything'; return; }
      const settings = S.settings;
      S = defaults(); S.settings = settings; S.epoch = Date.now(); save(); route();
    };

    /* --- sync and sign-out --- */
    const wireSignOut = (btn, everywhere) => {
      if (!btn) return;
      let force = false;
      btn.onclick = async () => {
        btn.disabled = true;
        const stopped = await Sync.signOut(everywhere, force);
        btn.disabled = false;
        if (stopped === 'unsynced') {
          force = true;
          btn.textContent = 'Sign out anyway';
          btn.classList.add('danger');
          $('#signOutMsg').textContent = 'Recent progress has not reached the server yet and would be lost.';
        } else if (stopped === 'offline') {
          $('#signOutMsg').textContent = 'Could not reach the server. You are still signed in.';
        }
      };
    };
    wireSignOut($('#signOut'), false);
    wireSignOut($('#signOutAll'), true);

    /* --- backup file --- */
    $('#export').onclick = () => {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(new Blob([JSON.stringify(S, null, 2)], { type: 'application/json' }));
      a.download = 'los-gehts-progress-' + new Date().toISOString().slice(0, 10) + '.json';
      a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    };
    let pending = null;
    $('#import').onclick = () => {
      if (!pending) { $('#importFile').click(); return; }
      const settings = S.settings;
      S = pending; S.settings = settings; S.epoch = Date.now(); save(); route(true);
    };
    $('#importFile').onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      try {
        const raw = JSON.parse(await file.text());
        if (!raw || typeof raw !== 'object' || typeof raw.cards !== 'object' || raw.cards === null) throw new Error('shape');
        pending = hydrate(raw);
        $('#importMsg').textContent = 'File holds ' + Object.keys(pending.cards).length + ' words and ' + pending.xp + ' XP. This replaces your current progress.';
        $('#import').textContent = 'Click again to replace';
        $('#import').classList.add('danger');
      } catch (err) {
        $('#importMsg').textContent = 'That file is not a progress backup from this app.';
      }
      e.target.value = '';
    };
  };

  /* ====================================================================
     Router + global events
     ==================================================================== */
  function route(keepScroll) {
    viewTok++;
    sess = null;
    if (synth) synth.cancel();
    document.body.classList.remove('in-session');
    const [a, b] = location.hash.replace(/^#\/?/, '').split('/');
    let section = 'learn';
    const fromHome = !!$('#path');   // true while the home page is on screen

    if (a === 'unit' && unitById(b)) viewUnit(unitById(b));
    else if (a === 'practice' && unitById(b)) startUnit(unitById(b));
    else if (a === 'review') { section = 'review'; viewReview(); }
    else if (a === 'drills') { section = 'drills'; ({ gender: viewGender, numbers: viewNumbers, verbs: viewVerbs }[b] || viewDrills)(); }
    else if (a === 'grammar') { section = 'grammar'; viewSheets(b); }
    else if (a === 'level' && levelById(b)) {
      S.settings.level = b;   // a device preference: stored, not synced
      persist();
      history.replaceState(null, '', '#/');
      viewHome();
      keepScroll = keepScroll === true || fromHome;   // picking a level on the home page must not jump to the top
    }
    else if (a === 'guide') { section = 'guide'; viewGuide(); }
    else viewHome();

    curSection = section;
    updateChrome(section);
    if (keepScroll !== true) window.scrollTo(0, 0);
  }

  document.addEventListener('click', (e) => {
    const sayEl = e.target.closest('[data-say]');
    if (sayEl) { say(sayEl.dataset.say); return; }
    const key = e.target.closest('[data-ins]');
    if (key) {
      const inp = $('#ans');
      if (!inp || inp.disabled) return;
      const a = inp.selectionStart == null ? inp.value.length : inp.selectionStart;
      const z = inp.selectionEnd == null ? a : inp.selectionEnd;
      inp.value = inp.value.slice(0, a) + key.dataset.ins + inp.value.slice(z);
      inp.focus();
      inp.setSelectionRange(a + 1, a + 1);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const tag = e.target.tagName;
    if (e.key === 'Enter') {
      if (tag === 'BUTTON' || tag === 'A' || tag === 'SUMMARY' || tag === 'SELECT') return;   // native activation
      const b = $('#next') || $('#check');
      if (b && !b.disabled) { e.preventDefault(); b.click(); }
      return;
    }
    if (tag !== 'INPUT' && /^[1-4]$/.test(e.key)) {
      const b = $$('#q .opt, #q .gbtn, .drill .gbtn')[+e.key - 1];
      if (b && !b.disabled) b.click();
    }
  });

  window.addEventListener('hashchange', () => route());
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') Sync.flush();   // leaving: push pending changes now
    else Sync.pullIfStale();                                    // back: pick up other devices' progress
  });
  $$('[data-icon]').forEach((el) => { el.innerHTML = icon(el.dataset.icon, el.dataset.iconClass); });
  applyTheme();
  route();
  Sync.pull();
})();
