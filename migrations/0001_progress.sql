-- One row per user. This app has a single user, stored under id 'me'.
-- `data` is the whole progress state as JSON (word history, XP, streak, drill records).
CREATE TABLE IF NOT EXISTS progress (
  id         TEXT PRIMARY KEY,
  data       TEXT NOT NULL,
  updated_at INTEGER NOT NULL   -- unix time in milliseconds
);
