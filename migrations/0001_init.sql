CREATE TABLE IF NOT EXISTS providers (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  phone TEXT NOT NULL,
  website_url TEXT NOT NULL,
  booking_url TEXT NOT NULL,
  provider_email TEXT,
  logo_url TEXT,
  price_min INTEGER,
  price_max INTEGER,
  response_time_mins INTEGER,
  hotel_visits INTEGER NOT NULL DEFAULT 0,
  hours_json TEXT NOT NULL,
  services_json TEXT NOT NULL,
  areas_served_json TEXT NOT NULL,
  featured INTEGER NOT NULL DEFAULT 0,
  verified INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS leads (
  id TEXT PRIMARY KEY,
  provider_id TEXT,
  type TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  message TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS admin_sessions (
  id TEXT PRIMARY KEY,
  session_token_hash TEXT NOT NULL UNIQUE,
  created_at TEXT NOT NULL,
  expires_at TEXT NOT NULL
);
