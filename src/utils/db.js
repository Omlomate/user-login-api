const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');  // Use ':memory:' for in-memory database or a file path for a file-based database

db.serialize(() => {
    db.run(`CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL
    )`);

    db.run(`CREATE TABLE otps (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL,
        otp TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
});

module.exports = db;
