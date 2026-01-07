const port = process.env.PORT || 3000;
const express = require("express");
const server = express();
const sqlite3 = require("sqlite3");

const path = require("path");

server.use(express.static(path.join(__dirname, "public")));
server.listen(port);

const db = new sqlite3.Database("./contacts.db");

db.run(
  `CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    phone TEXT NOT NULL,
    address TEXT,
    postalCode TEXT,
    city TEXT,
    category TEXT NOT NULL)`
  );

server.get("/contacts", (req, res) => {
  db.all(
    `SELECT
      id,
      firstName,
      lastName,
      phone,
      address,
      postalCode,
      city,
      category
     FROM contacts`,
    (err, rows) => 
    {
      if (err) return res.status(500).json({ error: "Database error" });
      else res.json(rows);
    }
  );
});

server.post("/contacts", (req, res) => {
  const { firstName, lastName, phone, address, postalCode, city, category } = req.body;

  db.run(
    "INSERT INTO contacts (firstName, lastName, phone, address, postalCode, city, category) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [firstName, lastName, phone, address, postalCode, city, category],
    function (err) {
      if (err) return res.status(500).json({ error: "Database error" });

      // this.lastID = id som SQLite skapade
      res.status(201).json({ message: "Kontakt skapad", id: this.lastID });
    }
  );
});