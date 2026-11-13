# Los geht's — learn German from zero to B1

A small web app for learning German in short daily sessions, from the first words (A1) to
independent use (B1). The A2 and B1 courses are built towards the telc Deutsch A2 and
telc Deutsch B1 exams. The site itself is
plain static files with no build step and no dependencies. Deployed, it sits behind a sign-in
page and keeps progress in a small database, so it follows you across devices.

## Run it locally

```bash
open public/index.html
```

Or with a local server (for example to use it from a phone on the same network):

```bash
cd public && python3 -m http.server 8000
# then open http://localhost:8000
```

Run like this there is no sign-in and progress stays in that browser only. Use
**Guide → Sync and backup → Export** to move it by hand.

Audio uses the browser's built-in speech synthesis. If you hear nothing, install a German
voice in your operating system's speech settings (the Guide page shows which voice is used).

## Deploy (Cloudflare, free plan)

This puts the site on Cloudflare Workers, behind a sign-in page, with progress stored in a D1
(SQLite) database. You need a free Cloudflare account and Node.js. Run these once, from this
folder:

```bash
npx wrangler login                                            # opens the browser to sign in
npx wrangler d1 create los-gehts --binding DB --update-config # creates the database, adds it to wrangler.jsonc
npx wrangler d1 migrations apply los-gehts --remote           # creates the tables
npx wrangler deploy                                           # uploads site + server code, prints your URL
openssl rand -base64 24                                       # generates a passphrase: copy it
npx wrangler secret put SYNC_TOKEN                            # paste the passphrase when asked
```

Open the URL, enter the passphrase, and let your password manager save it. That is all the
setup a device needs: sync starts by itself.

To publish later changes: `npx wrangler deploy`. If `migrations/` gained a file, run
`npx wrangler d1 migrations apply los-gehts --remote` first.

### Signing in

- Nothing but the sign-in page is served to a browser that is not signed in: not the app, not
  its scripts, not the course content. The check runs on the server before any file is sent.
- Signing in sets a session cookie that page scripts cannot read. The passphrase is not kept
  in the browser.
- A session lasts 30 days from the last visit and at most 180 days in total, so a device in
  regular use asks again about twice a year.
- Five wrong passphrases from one address lock that address out for 15 minutes.
- **Guide → Sign out** ends the session on that device and clears its copy of the progress.
  **All devices** ends every session.
- Lost a device, or want to change the passphrase? Run `npx wrangler secret put SYNC_TOKEN`
  with a new value. Every device is signed out at once.

### How sync behaves

- The app works from the browser's own storage first, then keeps the server copy up to date.
- On load, and when you return to the tab, it fetches the server copy and merges it with the
  local one: for each word the more-practised copy wins, XP and records take the higher value.
  Practice done on two devices is combined, not overwritten.
- Changes are pushed a couple of seconds after each answer, at once when a round is finished,
  and when you leave the tab. The end-of-round screen confirms the save; a "Not synced" mark
  in the header appears only while something has not reached the server.
- **Reset progress** and **Import** replace the data everywhere, on purpose.
- Theme and speech settings stay per device.

### Security notes

- The passphrase is the only credential. Use a long random one (the `openssl` command above),
  not a memorable word. The sign-in limit slows guessing; it does not make a weak passphrase safe.
- There is one user and one passphrase: no accounts, no second factor, no password reset
  other than setting a new secret.
- If a session runs out while the app is open, the progress already on that device stays in
  its browser storage until the next sign-in merges it. Use **Sign out** on a shared device.
- Only the `public/` folder can be served, and only after sign-in. Keep secrets out of it.
- The database holds no personal data: word ids, counters and dates, plus session records
  and failed sign-in counts keyed by a hash of the client address.
- Every request runs the Worker, so page loads count toward the Workers free-plan request limit.

### Run the full stack locally

```bash
cp .dev.vars.example .dev.vars                        # local passphrase
npx wrangler d1 migrations apply los-gehts --local
npx wrangler dev
```

## What is inside

| Area | What it does |
| --- | --- |
| **Learn** | Three levels: A1 (13 units), A2 (12) and B1 (12). Each unit has a few short key ideas, about 20 words with audio, example sentences, then a practice round. Level cards show a progress ring; every unit and every word shows how far along it is. |
| **Review** | Spaced repetition. A word returns after 1, 3, 7, 14, 30 and 60 days; a miss sends it back to the start. |
| **Drills** | Endless quick reps for der/die/das, numbers and present-tense verb forms. |
| **Grammar** | Reference sheets per level. A2 and B1 open with an overview of the telc exam and how the course maps to it. |
| **Guide** | A 15-minute daily plan, the reasoning behind the method, external resources, settings, sync, backup and sign-out. |

Exercises get harder as a word gets stronger: recognise it, pick it, hear it, then type it.
Nouns are always shown with their article and a fixed colour (der blue, die pink, das green).
A2 and B1 rounds add gap-fill questions in the style of telc "Sprachbausteine", and each unit
ends its key ideas with a telc tip: phrases to reuse in the speaking and writing parts.

### About the telc alignment

The syllabus follows the usual A2 and B1 progression of topics and grammar, and the exam
overview sheets use figures from telc's own exam pages and practice tests. This is study
material, not an official telc product: it has no listening or reading comprehension papers
and no mock exam. Use telc's published practice tests alongside it, and check telc.net for
the exact format of the exam you register for.

Keyboard: `1`–`4` pick an option, `Enter` checks or continues. Umlauts can be typed as
`ae`, `oe`, `ue`, `ss`.

## Design

The look is defined once, as tokens at the top of `public/css/style.css`: colours, type,
spacing, radii, shadows and motion, each with a light and a dark value. Components use the
tokens only, so a rebrand is a change to that block.

- **Theme:** "Caffeine", a shadcn/ui theme published on tweakcn: coffee-brown primary, latte
  secondary, neutral greys. The token values are the theme's own. Success colours, a
  text-safe red and three roast swatches were added in the same family.
- **Look:** a German Kaffeehaus. Serif headings like a menu card, dashed menu rules, a cup
  for the daily streak, beans (*Bohnen*) for points, and roast levels for the courses:
  *helle*, *mittlere* and *dunkle Röstung* for A1, A2 and B1. Section labels are in German
  with the English next to them.
- **der / die / das** keep their own blue, pink and green everywhere and are used for nothing else.
- **Type:** the theme's system font stacks, so no font files are downloaded.
- **Icons:** inline line icons, no emoji and no icon font. Shapes are from Feather (MIT licence);
  the flame is from Lucide (ISC licence); the bean is our own. They live in the `ICONS` map in
  `public/js/app.js`.
- Touch targets are at least 44px, focus is always visible, and motion is disabled when the
  system asks for reduced motion.

`public/login.css` repeats the handful of token values it needs, because the main stylesheet
is not served before sign-in.

## Files

```
public/index.html      page shell and navigation
public/css/style.css   styles, light and dark theme
public/js/util.js      pure helpers (text normalising, number words, gender hints)
public/js/data.js      shared content helpers, the level list and the A1 course
public/js/courses/     A2 and B1 courses (two files each) and the telc exam overviews
public/js/app.js       storage, sync, speech, spaced repetition, views
public/login.*         sign-in page (the only files served before sign-in)
worker/index.js        entry point: routes requests, requires a session for everything else
worker/auth.js         passphrase check, sessions, failed sign-in limit
worker/http.js         response helpers and security headers
worker/progress.js     progress API: GET and PUT /api/progress
migrations/            database tables, applied in order
tests/                 content checker and the server, app and browser test suites
wrangler.jsonc         Cloudflare configuration
```

## Adding content

A1 lives in `public/js/data.js`; A2 and B1 live in `public/js/courses/`. A course file
registers its units with `DE_DATA.addUnits('a2', [...])` and its reference sheets with
`DE_DATA.addSheets('a2', [...])`. A new file must also be listed in `public/index.html`.

- Noun: `n('der', 'Tisch', 'Tische', 'table')` — article, word, plural, English, optional example pair.
- Anything else: `x('lernen', 'to learn', 'Ich lerne Deutsch.', 'I am learning German.')`.
- Sentence: `s('Heute lerne ich Deutsch.', 'Today I am learning German.', ['Ich lerne heute Deutsch.'])` —
  the third argument lists other word orders that should also be accepted.
- Gap-fill: `c('Ich bleibe zu Hause, ___ ich krank bin.', 'weil', ['denn', 'deshalb', 'dass'], 'I am staying at home because I am ill.', 'weil sends the verb to the end.')` —
  sentence with one gap, the answer, three wrong options, English, and the reason shown afterwards.
- In tip and sheet HTML, `{{Guten Tag}}` renders a chip that speaks the text when tapped.

Within one unit every English gloss must be unique, because the glosses double as
multiple-choice options. Unit ids are part of every stored progress record, so never rename one.

After any content change run the checker. It catches missing fields, duplicate glosses,
repeated words, malformed gap-fills and personal names:

```bash
node tests/check-content.mjs
```

## Tests

```bash
cp .dev.vars.example .dev.vars
npx wrangler d1 migrations apply los-gehts --local
npx wrangler dev --port 47615 --ip 127.0.0.1     # leave running in another terminal

node tests/check-content.mjs     # course content
node tests/server.test.mjs       # sign-in gate, sessions, throttling, API
node tests/app.test.mjs          # sync and sign-out logic
node tests/browser.test.mjs      # headless Chrome: sign-in, levels, a full round, offline, sign-out
node tests/screenshots.mjs light desktop   # screenshots of every screen into .tmp/shots
```

The server and app suites empty the tables of the local test database. The browser suites
need Google Chrome installed in the default macOS location.
