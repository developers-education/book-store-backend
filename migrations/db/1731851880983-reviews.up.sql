CREATE TABLE IF NOT EXISTS review (
    id TEXT PRIMARY KEY,
    text TEXT NOT NULL,
    rating INTEGER NOT NULL,
    book_id TEXT,
    created_at timestamptz default current_timestamp not null,
    FOREIGN KEY (book_id) REFERENCES book(id) ON DELETE CASCADE
);
