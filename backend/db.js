import Database from 'better-sqlite3';

// Inisialisasi database
const db = new Database('./database.sqlite');

// Buat tabel jika belum ada
db.exec(`
  CREATE TABLE IF NOT EXISTS missions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    waypoints TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`);

console.log("✅ SQLite database ready.");

export default db; // HARUS pakai export default
