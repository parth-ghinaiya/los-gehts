# Los geht's — learn German from zero

A small web app for learning beginner (A1) German in short daily sessions. The site itself is
plain static files with no build step and no dependencies. Progress is always kept in the
browser; optionally it is also synced to a small database so it follows you across devices.

## Run it locally

```bash
open public/index.html
```

Or with a local server (for example to use it from a phone on the same network):

```bash
cd public && python3 -m http.server 8000
# then open http://localhost:8000
```

Run like this, progress stays in that browser only. Use **Guide → Sync and backup → Export**
to move it by hand.

Audio uses the browser's built-in speech synthesis. If you hear nothing, install a German
voice in your operating system's speech settings (the Guide page shows which voice is used).

## Deploy with sync (Cloudflare, free plan)

This puts the site on Cloudflare Workers and stores progress in a D1 (SQLite) database.
You need a free Cloudflare account and Node.js. Run these once, from this folder:

```bash
npx wrangler login                                            # opens the browser to sign in
npx wrangler d1 create los-gehts --binding DB --update-config # creates the database, adds it to wrangler.jsonc
npx wrangler d1 execute los-gehts --remote --file=schema.sql  # creates the table
npx wrangler deploy                                           # uploads site + API, prints your URL
openssl rand -base64 24                                       # generates a passphrase: copy it
npx wrangler secret put SYNC_TOKEN                            # paste the passphrase when asked
```

If `d1 create` does not edit `wrangler.jsonc` for you, paste the `d1_databases` block it
prints into that file (next to `assets`) and continue.

Then open the URL from `wrangler deploy`, go to **Guide → Sync and backup**, enter the
passphrase and press **Connect**. Do the same once on every device you use.

To publish later changes: `npx wrangler deploy`.

### How sync behaves

- The app works from the browser's own storage first, so it stays usable offline.
- On load, and when you return to the tab, it fetches the server copy and merges it with the
  local one: for each word the more-practised copy wins, XP and records take the higher value.
  Practice done on two devices is combined, not overwritten.
- Changes are pushed a couple of seconds after each answer, and when you leave the tab.
- **Reset progress** and **Import** replace the data everywhere, on purpose.
- Theme and speech settings stay per device.

### Security notes

- The passphrase is the only thing protecting the API. Use a long random one (the `openssl`
  command above), not a memorable word.
- It is stored in the browser's local storage on each device you connect. Anyone with access
  to that browser profile can read it. To revoke it everywhere, run
  `npx wrangler secret put SYNC_TOKEN` again with a new value.
- Only the `public/` folder is uploaded as the website. Keep secrets out of it.
- The database holds nothing personal: word ids, counters and dates.

### Try the API locally

```bash
cp .dev.vars.example .dev.vars
npx wrangler d1 execute los-gehts --local --file=schema.sql
npx wrangler dev
```

## What is inside

| Area | What it does |
| --- | --- |
| **Learn** | 13 units. Each has a few short key ideas, about 20 words with audio, example sentences, then a practice round. |
| **Review** | Spaced repetition. A word returns after 1, 3, 7, 14, 30 and 60 days; a miss sends it back to the start. |
| **Drills** | Endless quick reps for der/die/das, numbers and present-tense verb forms. |
| **Grammar** | Reference tables: cases, pronouns, word order, prepositions, pronunciation, survival phrases. |
| **Guide** | A 15-minute daily plan, the reasoning behind the method, external resources, settings, sync and backup. |

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
worker/index.js        progress API: GET and PUT /api/progress
schema.sql             database table
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
