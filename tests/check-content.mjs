// Validates course content. Errors must be fixed; warnings are worth a look.
// usage: node tests/check-content.mjs [course-file ...]
//   no arguments  -> checks data.js plus every file in public/js/courses/
//   with files    -> checks data.js plus only those course files
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const js = (p) => path.join(root, 'public/js', p);
const courseDir = js('courses');
const given = process.argv.slice(2).map((p) => path.resolve(p));
const courseFiles = given.length ? given : fs.readdirSync(courseDir).filter((f) => f.endsWith('.js')).sort().map((f) => path.join(courseDir, f));

const ctx = vm.createContext({ console });
for (const file of [js('util.js'), js('data.js'), ...courseFiles]) {
  try {
    vm.runInContext(fs.readFileSync(file, 'utf8'), ctx, { filename: file });
  } catch (e) {
    console.error('ERROR  cannot load ' + path.relative(root, file) + ': ' + e.message);
    process.exit(1);
  }
}
const D = ctx.DE_DATA;
const { norm } = ctx.DE_UTIL;

const errors = [];
const warnings = [];
const err = (where, msg) => errors.push(where + ': ' + msg);
const warn = (where, msg) => warnings.push(where + ': ' + msg);
const str = (v) => typeof v === 'string' && v.trim() !== '';
const tokens = (t) => t.replace(/[.,!?;:]/g, '').split(/\s+/).filter(Boolean);

/* Only the placeholders Alice and Bob may appear as names (project rule). */
const NAMES = /\b(Anna|Anne|Max|Peter|Petra|Maria|Marie|Thomas|Lukas|Lucas|Paul|Paula|Lena|Lisa|Hans|Julia|Jan|Tim|Tom|Sarah|Sara|Laura|Felix|Jonas|Leon|Emma|Mia|Ben|Nico|Klaus|Karl|Monika|Sabine|Stefan|Stephan|Michael|Martin|Markus|Andreas|Daniel|David|Eva|Nina|Tina|Sophie|Sofia|Hanna|Hannah|Müller|Schmidt|Schneider|Fischer|Weber|Meyer|Meier|Wagner|Becker|Schulz|Hoffmann|Bauer|Koch|Richter|Klein|Wolf|Neumann|Schwarz|Zimmermann|Braun|Krüger|Hofmann|Lange|Schmitt|Werner|Krause|Lehmann|Schmid|Schulze|Maier|Köhler|Herrmann|König|Walter|Mayer|Huber|Kaiser|Fuchs|Peters|Lang|Scholz|Möller|Weiß|Jung|Hahn|Schubert|Vogel|Friedrich|Keller|Günther|Frank|Berger|Winkler|Roth|Beck|Lorenz|Baumann|Franke|Albrecht|Schuster|Simon|Ludwig|Böhm|Winter|Kraus|Martin|Schumacher|Krämer|Vogt|Stein|Jäger|Otto|Sommer|Groß|Seidel|Heinrich|Brandt|Haas|Schreiber|Graf|Schulte|Dietrich|Ziegler|Kuhn|Kühn|Pohl|Engel|Horn|Busch|Bergmann|Thomas|Voigt|Sauer|Arnold|Wolff|Pfeiffer)\b/;
/* Common words that happen to be on the list above. */
const NOT_A_NAME = /\b(der Koch|die Köchin|Koch |ein Koch|der Bauer|der Wolf|der König|der Kaiser|der Vogel|der Winter|der Sommer|der Stein|der Engel|der Graf|der Jäger|der Fuchs|der Hahn|das Horn|der Busch|klein|Klein|lang|Lang|lange|Lange|jung|Jung|weiß|Weiß|braun|Braun|schwarz|Schwarz|groß|Groß|sauer|Sauer|frank|Frank|der Richter|der Schneider|der Fischer|der Weber|der Wagner|der Becker|der Müller|der Schuster|der Schreiber|der Ziegler|der Zimmermann|der Bergmann|der Krämer|der Keller|im Keller|den Keller|dem Keller|Keller |der Roth|max\.|Jan\.)\b/g;
const hasName = (text) => NAMES.test(String(text).replace(NOT_A_NAME, ' '));

const ids = new Set();
const seenDe = new Map();   // normalised German -> unit id, across the whole course
const levelIds = new Set(D.LEVELS.map((l) => l.id));

for (const u of D.UNITS) {
  const w = u.id || '(no id)';
  const extra = u.level !== 'a1';   // A2 and B1 follow the stricter template

  if (!str(u.id)) err(w, 'missing id');
  else if (ids.has(u.id)) err(w, 'duplicate unit id');
  ids.add(u.id);
  if (!levelIds.has(u.level)) err(w, 'unknown level ' + u.level);
  if (extra && !new RegExp('^' + u.level + 'u\\d+$').test(u.id)) err(w, 'id must look like ' + u.level + 'u1');
  for (const k of ['title', 'sub', 'goal']) if (!str(u[k])) err(w, 'missing ' + k);

  /* tips */
  if (!Array.isArray(u.tips) || u.tips.length < 3) err(w, 'needs at least 3 tips');
  (u.tips || []).forEach((t, i) => {
    if (!str(t.h) || !str(t.html)) err(w, 'tip ' + (i + 1) + ' needs h and html');
    else {
      if ((t.html.match(/\{\{/g) || []).length !== (t.html.match(/\}\}/g) || []).length) err(w, 'tip "' + t.h + '" has unbalanced {{ }}');
      if (hasName(t.html)) err(w, 'tip "' + t.h + '" uses a personal name; only Alice and Bob are allowed');
    }
  });
  if (extra && !(u.tips || []).some((t) => /^telc/i.test(t.h || ''))) err(w, 'needs one tip whose heading starts with "telc"');

  /* words */
  const words = u.words || [];
  if (extra && (words.length < 18 || words.length > 22)) err(w, 'needs 18–22 words, has ' + words.length);
  const en = new Map();
  const de = new Set();
  let withExample = 0;
  words.forEach((x) => {
    const label = w + ' word "' + x.de + '"';
    if (!str(x.de) || !str(x.en)) { err(label, 'needs de and en'); return; }
    if (x.art !== undefined) {
      if (!['der', 'die', 'das'].includes(x.art)) err(label, 'article must be der, die or das');
      if (typeof x.pl !== 'string') err(label, 'noun needs a plural string (empty if it has none)');
      if (/^(der|die|das)\s/i.test(x.de)) err(label, 'article belongs in the first argument, not in the word');
    }
    if ((x.ex && !x.exEn) || (!x.ex && x.exEn)) err(label, 'example needs both German and English');
    if (x.ex) withExample++;
    const full = (x.art ? x.art + ' ' : '') + x.de;   // exact: sie and Sie are different words
    if (de.has(full)) err(label, 'appears twice in this unit');
    de.add(full);
    const gloss = norm(x.en);
    if (en.has(gloss)) err(label, 'English gloss "' + x.en + '" is also used for "' + en.get(gloss) + '" (glosses are quiz options and must differ)');
    en.set(gloss, x.de);
    if (extra && x.en.split(/\s+/).length > 7) warn(label, 'gloss is long for a quiz option: "' + x.en + '"');
    if (seenDe.has(full) && seenDe.get(full) !== u.id) (extra ? err : warn)(label, 'already taught in unit ' + seenDe.get(full));
    else seenDe.set(full, u.id);
    if (hasName(x.de + ' ' + (x.ex || ''))) err(label, 'uses a personal name; only Alice and Bob are allowed');
  });
  if (extra && withExample < Math.ceil(words.length * 0.6)) err(w, 'at least 60% of words need an example sentence, has ' + withExample + ' of ' + words.length);

  /* sentences */
  const sents = u.sentences || [];
  if (extra && (sents.length < 7 || sents.length > 8)) err(w, 'needs 7–8 sentences, has ' + sents.length);
  sents.forEach((x) => {
    const label = w + ' sentence "' + x.de + '"';
    if (!str(x.de) || !str(x.en)) { err(label, 'needs de and en'); return; }
    if (!Array.isArray(x.alt)) err(label, 'alt must be an array');
    const count = tokens(x.de).length;
    if (count < (extra ? 3 : 2)) err(label, 'too short to build from tiles');
    if (extra && count > 11) err(label, 'too long to build from tiles (' + count + ' words, limit 11)');
    if (!/[.!?]$/.test(x.de)) err(label, 'must end with punctuation');
    (x.alt || []).forEach((a) => {
      if (tokens(a.toLowerCase()).sort().join(' ') !== tokens(x.de.toLowerCase()).sort().join(' ')) err(label, 'alt "' + a + '" must use exactly the same words');
    });
    if (hasName(x.de)) err(label, 'uses a personal name; only Alice and Bob are allowed');
  });

  /* gap-fill */
  const cloze = u.cloze || [];
  if (extra && cloze.length !== 8) err(w, 'needs exactly 8 gap-fill items, has ' + cloze.length);
  cloze.forEach((x) => {
    const label = w + ' gap-fill "' + x.de + '"';
    if (!str(x.de) || !str(x.answer) || !str(x.en)) { err(label, 'needs de, answer and en'); return; }
    if ((x.de.match(/___/g) || []).length !== 1 || /____/.test(x.de)) err(label, 'needs exactly one ___ (three underscores)');
    if (!Array.isArray(x.wrong) || x.wrong.length !== 3) err(label, 'needs exactly 3 wrong options');
    else {
      const all = [x.answer, ...x.wrong].map((o) => o.trim().toLowerCase());
      if (new Set(all).size !== 4) err(label, 'the four options must all differ');
    }
    if (!str(x.why)) err(label, 'needs a one-line reason (why)');
    if (hasName(x.de)) err(label, 'uses a personal name; only Alice and Bob are allowed');
  });
}

/* sheets */
for (const sh of D.SHEETS) {
  if (!str(sh.title) || !str(sh.html)) err('sheet "' + sh.title + '"', 'needs title and html');
  if (!levelIds.has(sh.level)) err('sheet "' + sh.title + '"', 'unknown level');
  if (hasName(sh.html || '')) err('sheet "' + sh.title + '"', 'uses a personal name; only Alice and Bob are allowed');
}

/* month plan: every unit of its level exactly once, in course order, with a checkpoint per week */
{
  const P = D.PLAN;
  const planUnits = (P && P.weeks || []).flatMap((w) => w.units || []);
  const levelUnits = D.UNITS.filter((u) => u.level === (P && P.level)).map((u) => u.id);
  if (!P || !Array.isArray(P.weeks) || !P.weeks.length) err('plan', 'needs weeks');
  else {
    if (planUnits.join() !== levelUnits.join()) err('plan', 'must list every ' + P.level + ' unit once, in course order');
    const checkIds = P.weeks.map((w) => w.check && w.check.id);
    if (new Set(checkIds).size !== P.weeks.length || !checkIds.every((id) => /^[a-z0-9-]{1,32}$/.test(id || ''))) err('plan', 'each week needs a unique checkpoint id (a-z, 0-9, -)');
    if (2 * planUnits.length + P.weeks.length !== 30) err('plan', 'two days per unit plus one checkpoint per week must make 30 days');
    P.weeks.forEach((w, i) => {
      if (!w.check || !str(w.check.title) || !str(w.check.speak)) err('plan week ' + (i + 1), 'checkpoint needs title and speaking task');
      else if (hasName(w.check.speak)) err('plan week ' + (i + 1), 'uses a personal name; only Alice and Bob are allowed');
    });
    Object.keys(P.drills || {}).forEach((id) => { if (!planUnits.includes(id)) err('plan', 'drill unlock unit ' + id + ' is not in the plan'); });
    if (!(P.pass > 0 && P.pass <= 100)) err('plan', 'pass mark must be 1-100');
  }
}

const count = (level, f) => D.UNITS.filter((u) => u.level === level).reduce((n, u) => n + f(u), 0);
for (const l of D.LEVELS) {
  const units = D.UNITS.filter((u) => u.level === l.id).length;
  console.log(`${l.name}: ${units} units, ${count(l.id, (u) => u.words.length)} words, ${count(l.id, (u) => u.sentences.length)} sentences, ${count(l.id, (u) => (u.cloze || []).length)} gap-fills, ${D.SHEETS.filter((s) => s.level === l.id).length} sheets`);
}
warnings.forEach((m) => console.log('warn   ' + m));
errors.forEach((m) => console.log('ERROR  ' + m));
console.log(errors.length ? `\n${errors.length} error(s), ${warnings.length} warning(s)` : `\nOK — no errors, ${warnings.length} warning(s)`);
process.exit(errors.length ? 1 : 0);
