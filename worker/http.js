/* Response helpers, request checks, and the headers every response carries. */

const SECURITY_HEADERS = {
  'Content-Security-Policy': [
    "default-src 'none'",
    "script-src 'self'",
    "style-src 'self' 'unsafe-inline'",   // the app sets bar widths through style attributes
    "img-src 'self' data:",
    "connect-src 'self'",
    "form-action 'self'",
    "base-uri 'none'",
    "frame-ancestors 'none'",
  ].join('; '),
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'no-referrer',
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Resource-Policy': 'same-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
  'X-Robots-Tag': 'noindex, nofollow',
};

export function json(body, status = 200, headers = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...headers },
  });
}

export function redirect(location) {
  return new Response(null, { status: 302, headers: { Location: location, 'Cache-Control': 'no-store' } });
}

export function methodNotAllowed(allow) {
  return json({ error: 'method_not_allowed' }, 405, { Allow: allow });
}

/* Returns a copy, because responses from the asset store have read-only headers. */
export function withSecurityHeaders(response) {
  const out = new Response(response.body, response);
  for (const [name, value] of Object.entries(SECURITY_HEADERS)) out.headers.set(name, value);
  return out;
}

/* Browsers attach Origin to every non-GET request. Requiring it to match our own origin
   stops another site from making a signed-in browser act on its behalf (CSRF). */
export function sameOrigin(request) {
  const origin = request.headers.get('Origin');
  return origin !== null && origin === new URL(request.url).origin;
}

/* Reads a JSON object body of at most maxBytes.
   Returns { value } on success or { error, status } to send back. */
export async function readJsonObject(request, maxBytes) {
  if (Number(request.headers.get('Content-Length') || 0) > maxBytes) return { error: 'too_large', status: 413 };
  const text = await request.text();
  if (text.length > maxBytes) return { error: 'too_large', status: 413 };
  let value;
  try {
    value = JSON.parse(text);
  } catch (e) {
    return { error: 'invalid_json', status: 400 };
  }
  if (!value || typeof value !== 'object' || Array.isArray(value)) return { error: 'invalid_shape', status: 400 };
  return { value };
}
