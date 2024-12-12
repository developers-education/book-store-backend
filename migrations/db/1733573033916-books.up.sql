CREATE TABLE IF NOT EXISTS book (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    author TEXT NOT NULL,
    description TEXT,
    image_path TEXT,
    price REAL NOT NULL,
    discount_price REAL,
    section_id TEXT NOT NULL,
    created_at timestamptz default current_timestamp not null,
    FOREIGN KEY (section_id) REFERENCES section(id) ON DELETE CASCADE
);
