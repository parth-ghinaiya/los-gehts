/* Progress API for a single user.
   Static files in ./public are served by Cloudflare before this code runs;
   only requests that match no file (i.e. /api/*) arrive here. */

const ROW_ID = 'me';
const MAX_BYTES = 512 * 1024;

const json = (body, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
});

/* Hash both sides to a fixed length, then compare in constant time,
   so neither the secret's content nor its length leaks through timing. */
async function sameSecret(provided, expected) {
  const enc = new TextEncoder();
  const [a, b] = await Promise.all([
    crypto.subtle.digest('SHA-256', enc.encode(provided)),
    crypto.subtle.digest('SHA-256', enc.encode(expected)),
  ]);
  return crypto.subtle.timingSafeEqual(a, b);
}

function bearer(request) {
  const header = request.headers.get('Authorization') || '';
  if (!header.startsWith('Bearer ')) return '';
  try {
    return decodeURIComponent(header.slice(7));   // client percent-encodes so any passphrase is header-safe
  } catch (e) {
    return '';
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname !== '/api/progress') return json({ error: 'not_found' }, 404);

    if (!env.SYNC_TOKEN) return json({ error: 'server_not_configured' }, 500);
    const token = bearer(request);
    if (!token || !(await sameSecret(token, env.SYNC_TOKEN))) return json({ error: 'unauthorized' }, 401);

    if (request.method === 'GET') {
      const row = await env.DB.prepare('SELECT data, updated_at FROM progress WHERE id = ?1').bind(ROW_ID).first();
      if (!row) return json({ data: null, updatedAt: 0 });
      return json({ data: JSON.parse(row.data), updatedAt: row.updated_at });
    }

    if (request.method === 'PUT') {
      const text = await request.text();
      if (text.length > MAX_BYTES) return json({ error: 'too_large' }, 413);
      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        return json({ error: 'invalid_json' }, 400);
      }
      if (!data || typeof data !== 'object' || Array.isArray(data) || typeof data.cards !== 'object' || data.cards === null) {
        return json({ error: 'invalid_shape' }, 400);
      }
      const now = Date.now();
      await env.DB.prepare(
        'INSERT INTO progress (id, data, updated_at) VALUES (?1, ?2, ?3) ' +
        'ON CONFLICT(id) DO UPDATE SET data = excluded.data, updated_at = excluded.updated_at'
      ).bind(ROW_ID, JSON.stringify(data), now).run();
      return json({ ok: true, updatedAt: now });
    }

    return json({ error: 'method_not_allowed' }, 405);
  },
};
