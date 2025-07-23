-- Erstellt die Tabelle klausuren
CREATE TABLE IF NOT EXISTS klausuren (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    fach VARCHAR(255) NOT NULL,
    semester INTEGER NOT NULL,
    klausur_pdf BYTEA,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Erstellt die Tabelle für Benutzer
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_klausuren_semester ON klausuren(semester);
CREATE INDEX IF NOT EXISTS idx_klausuren_fach ON klausuren(fach);

-- Erstellt die Tabelle loesungen
CREATE TABLE IF NOT EXISTS loesungen (
    id SERIAL PRIMARY KEY,
    klausur_id INTEGER REFERENCES klausuren(id),
    loesung_pdf BYTEA,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_loesungen_klausur_id ON loesungen(klausur_id);