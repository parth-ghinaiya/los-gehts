/* Pure helpers. No DOM access, so they can be checked from Node as well. */
(function (root) {
  'use strict';

  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));

  const shuffle = (arr) => {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  const pick = (a) => a[Math.floor(Math.random() * a.length)];

  /* Comparison form: case-insensitive, umlauts may be typed as ae/oe/ue, ß as ss. */
  const norm = (s) => String(s).toLowerCase()
    .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
    .replace(/['’`´]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  /* Levenshtein distance, used for forgiving single-letter typos on long answers. */
  const lev = (a, b) => {
    if (a === b) return 0;
    let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
    for (let i = 1; i <= a.length; i++) {
      const cur = [i];
      for (let j = 1; j <= b.length; j++) {
        cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      }
      prev = cur;
    }
    return prev[b.length];
  };

  const ONES = ['null', 'eins', 'zwei', 'drei', 'vier', 'fünf', 'sechs', 'sieben', 'acht', 'neun', 'zehn',
    'elf', 'zwölf', 'dreizehn', 'vierzehn', 'fünfzehn', 'sechzehn', 'siebzehn', 'achtzehn', 'neunzehn'];
  const TENS = ['', '', 'zwanzig', 'dreißig', 'vierzig', 'fünfzig', 'sechzig', 'siebzig', 'achtzig', 'neunzig'];

  const below100 = (n) => {
    if (n < 20) return ONES[n];
    const u = n % 10;
    const t = TENS[Math.floor(n / 10)];
    return u === 0 ? t : (u === 1 ? 'ein' : ONES[u]) + 'und' + t;
  };

  /* 0..9999 as a German number word. */
  const numToGerman = (n) => {
    if (n < 100) return below100(n);
    if (n < 1000) {
      const h = Math.floor(n / 100);
      const r = n % 100;
      return (h === 1 ? 'ein' : ONES[h]) + 'hundert' + (r ? below100(r) : '');
    }
    const t = Math.floor(n / 1000);
    const r = n % 1000;
    return (t === 1 ? 'ein' : ONES[t]) + 'tausend' + (r ? numToGerman(r) : '');
  };

  /* Ending-based gender tendencies, most specific first. */
  const GENDER_RULES = [
    ['chen', 'das', 'Diminutives in -chen are always das'],
    ['lein', 'das', 'Diminutives in -lein are always das'],
    ['ung', 'die', '-ung nouns are die'],
    ['heit', 'die', '-heit nouns are die'],
    ['keit', 'die', '-keit nouns are die'],
    ['schaft', 'die', '-schaft nouns are die'],
    ['ion', 'die', '-ion nouns are die'],
    ['tät', 'die', '-tät nouns are die'],
    ['ik', 'die', '-ik nouns are die'],
    ['ie', 'die', '-ie nouns are die'],
    ['ment', 'das', '-ment nouns are das'],
    ['um', 'das', '-um nouns are das'],
    ['ling', 'der', '-ling nouns are der'],
    ['ismus', 'der', '-ismus nouns are der'],
    ['or', 'der', '-or nouns are der'],
    ['e', 'die', 'Most nouns ending in -e are die'],
    ['er', 'der', 'Nouns in -er are often der'],
    ['o', 'das', 'Nouns in -o are often das'],
  ];

  /* Returns { text, match } for a noun, or null when no ending rule applies. */
  const genderHint = (de, art) => {
    const w = de.toLowerCase();
    if (w === 'kuchen') return null;                       // not a diminutive
    if (/^ge.+e$/.test(w)) {
      return { text: 'Collective nouns Ge-…-e are usually das', match: art === 'das' };
    }
    for (const [end, g, text] of GENDER_RULES) {
      if (!w.endsWith(end) || w.length < end.length + 3) continue;
      if (end === 'e' && /(ee|ie)$/.test(w)) continue;
      if (end === 'er' && /ier$/.test(w)) continue;
      return { text, match: g === art };
    }
    return null;
  };

  /* Writing checks. They look for content, not grammar: a form field passes if every word in
     `all` appears or its digits equal one of `digits`; a message point passes if one of its keys
     starts a word. Keys and words are compared in the norm() form. */
  const words = (text) => norm(text).split(' ').filter(Boolean);
  const hasKey = (text, key) => (' ' + norm(text) + ' ').includes(' ' + key);
  const checkField = (value, f) => {
    const w = words(value);
    const digits = String(value).replace(/\D/g, '');
    return (!!f.all && f.all.every((k) => w.includes(k))) || (!!f.digits && digits !== '' && f.digits.includes(digits));
  };
  const checkMessage = (text, t) => {
    const n = norm(text);
    const count = words(text).length;
    const r = {
      greet: t.greet.some((k) => n.startsWith(k)),
      points: t.points.map((pt) => pt.keys.some((k) => hasKey(text, k))),
      close: t.close.some((k) => hasKey(text, k)),
      count,
      long: count >= t.min,
    };
    r.ok = r.greet && r.close && r.long && r.points.every(Boolean);
    return r;
  };

  root.DE_UTIL = { esc, shuffle, pick, norm, lev, numToGerman, genderHint, checkField, checkMessage };
})(typeof window !== 'undefined' ? window : globalThis);
