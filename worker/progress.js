/* Stored progress: the whole app state as one JSON document.
   Merging happens in the browser; the server only keeps the latest copy. */

import { json, readJsonObject } from './http.js';

const ROW_ID = 'me';
const MAX_BYTES = 512 * 1024;

export async function getProgress(env) {
  const row = await env.DB.prepare('SELECT data, updated_at FROM progress WHERE id = ?').bind(ROW_ID).first();
  if (!row) return json({ data: null, updatedAt: 0 });
  return json({ data: JSON.parse(row.data), updatedAt: row.updated_at });
}

export async function putProgress(request, env, now) {
  const body = await readJsonObject(request, MAX_BYTES);
  if (body.error) return json({ error: body.error }, body.status);
  const data = body.value;
  if (typeof data.cards !== 'object' || data.cards === null) return json({ error: 'invalid_shape' }, 400);

  await env.DB.prepare(
    'INSERT INTO progress (id, data, updated_at) VALUES (?, ?, ?) ' +
    'ON CONFLICT(id) DO UPDATE SET data = excluded.data, updated_at = excluded.updated_at'
  ).bind(ROW_ID, JSON.stringify(data), now).run();
  return json({ ok: true, updatedAt: now });
}
