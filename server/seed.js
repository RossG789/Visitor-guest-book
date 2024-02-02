import Database from "better-sqlite3";
const db = new Database("database.db");

db.exec(`CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    date TEXT,
    message TEXT
)`);

db.exec(`INSERT INTO messages (name, date, message)
VALUES
('Ross Gray', '01/02/2024', 'This place was great!')`);
