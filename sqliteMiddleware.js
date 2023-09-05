const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('mydatabase.db');

db.run(`
  CREATE TABLE IF NOT EXISTS quotes (
    id INTEGER PRIMARY KEY,
    quote_text TEXT
  )
`);

function sqliteMiddleware(req, res, next) {
  req.db = db;
  next();
}

module.exports = sqliteMiddleware;
