CREATE TABLE IF NOT EXISTS section (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    created_at timestamptz default current_timestamp not null
);
