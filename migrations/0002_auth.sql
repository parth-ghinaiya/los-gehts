-- Signed-in browsers. The cookie holds a random token; `id` is a keyed hash of it,
-- so this table alone cannot be used to forge a cookie.
CREATE TABLE IF NOT EXISTS sessions (
  id         TEXT PRIMARY KEY,
  created_at INTEGER NOT NULL,   -- unix time in milliseconds, as are the columns below
  last_seen  INTEGER NOT NULL,
  expires_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS sessions_expires_at ON sessions (expires_at);

-- Failed sign-in counter per client address (stored as a keyed hash), for throttling.
CREATE TABLE IF NOT EXISTS login_attempts (
  client       TEXT PRIMARY KEY,
  failures     INTEGER NOT NULL,
  window_start INTEGER NOT NULL
);
