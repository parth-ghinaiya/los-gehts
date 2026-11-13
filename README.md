# Los geht's — learn German from zero

A small web app for learning beginner (A1) German in short daily sessions. The site itself is
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
- Changes are pushed a couple of seconds after each answer, and when you leave the tab.
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
| **Learn** | 13 units. Each has a few short key ideas, about 20 words with audio, example sentences, then a practice round. |
| **Review** | Spaced repetition. A word returns after 1, 3, 7, 14, 30 and 60 days; a miss sends it back to the start. |
| **Drills** | Endless quick reps for der/die/das, numbers and present-tense verb forms. |
| **Grammar** | Reference tables: cases, pronouns, word order, prepositions, pronunciation, survival phrases. |
| **Guide** | A 15-minute daily plan, the reasoning behind the method, external resources, settings, sync, backup and sign-out. |

Exercises get harder as a word gets stronger: recognise it, pick it, hear it, then type it.
Nouns are always shown with their article and a fixed colour (der blue, die pink, das green).

Keyboard: `1`–`4` pick an option, `Enter` checks or continues. Umlauts can be typed as
`ae`, `oe`, `ue`, `ss`.

## Files

```
public/index.html      page shell and navigation
public/css/style.css   styles, light and dark theme
public/js/util.js      pure helpers (text normalising, number words, gender hints)
public/js/data.js      all course content
public/js/app.js       storage, sync, speech, spaced repetition, views
public/login.*         sign-in page (the only files served before sign-in)
worker/index.js        entry point: routes requests, requires a session for everything else
worker/auth.js         passphrase check, sessions, failed sign-in limit
worker/http.js         response helpers and security headers
worker/progress.js     progress API: GET and PUT /api/progress
migrations/            database tables, applied in order
wrangler.jsonc         Cloudflare configuration
```

## Adding content

Everything lives in `public/js/data.js`.

- Noun: `n('der', 'Tisch', 'Tische', 'table')` — article, word, plural, English, optional example pair.
- Anything else: `x('lernen', 'to learn', 'Ich lerne Deutsch.', 'I am learning German.')`.
- Sentence: `s('Heute lerne ich Deutsch.', 'Today I am learning German.', ['Ich lerne heute Deutsch.'])` —
  the third argument lists other word orders that should also be accepted.
- In tip and sheet HTML, `{{Guten Tag}}` renders a chip that speaks the text when tapped.

Within one unit every English gloss must be unique, because the glosses double as
multiple-choice options.
