const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcryptjs');
const db = new sqlite3.Database(path.join(__dirname, 'domostroy.db'));
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS services (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      price_per_unit INTEGER,
      unit TEXT,
      category TEXT,
      image_url TEXT
    )
  `);
  db.run(`
    CREATE TABLE IF NOT EXISTS requests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT,
      service_id INTEGER,
      message TEXT,
      status TEXT DEFAULT 'new',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL
    )
  `);
  const hashedPassword = bcrypt.hashSync('admin123', 10);
  db.run(`INSERT OR IGNORE INTO users (username, password_hash) VALUES (?, ?)`, ['admin', hashedPassword]);
  db.run(`INSERT OR IGNORE INTO services (id, name, description, price_per_unit, unit, category, image_url) VALUES 
    (1, 'Проектирование дома', 'Индивидуальный проект под ключ', 500, 'м²', 'design', '/images/design.jpg'),
    (2, 'Фундамент', 'Ленточный или плитный фундамент', 4500, 'м³', 'foundation', '/images/foundation.jpg'),
    (3, 'Возведение стен', 'Газоблок, кирпич, керамоблок', 3500, 'м²', 'walls', '/images/walls.jpg'),
    (4, 'Кровля', 'Металлочерепица, мягкая кровля', 2800, 'м²', 'roof', '/images/roof.jpg'),
    (5, 'Отделка', 'Черновая и чистовая отделка', 2500, 'м²', 'finishing', '/images/finishing.jpg')
  `);
});
module.exports = db;