const port = process.env.PORT || 3000;
const express = require("express");
const server = express();
const sqlite3 = require("sqlite3").verbose();

const path = require("path");

server.use(express.json());
server.use(express.static(path.join(__dirname, "public")));
server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

const db = new sqlite3.Database("./contacts.db");

db.run(
  `CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    phone TEXT NOT NULL,
    address TEXT,
    postCode TEXT,
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
      postCode,
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

server.get("/contacts/:id", (req, res) => {
  db.get(
    `SELECT
     id,
     firstName,
     lastName,
     phone,
     address,
     postCode,
     city,
     category
    FROM contacts
    WHERE id = ?`, 
   [req.params.id],
   (err, row) => {
    if (err) return res.status(500).json({ error: "Databas error"});
    if (!row) return res.status(404).json({ message: "Kontakt hittades inte"})
    res.json(row);
   }
  );
});

server.post("/contacts", (req, res) => {
  const { firstName, lastName, phone, address, postCode, city, category } = req.body;

  db.run(
    "INSERT INTO contacts (firstName, lastName, phone, address, postCode, city, category) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [firstName, lastName, phone, address, postCode, city, category],
    function (err) {
      if (err) return res.status(500).json({ error: "Databas error" });

      // this.lastID = id som SQLite skapade
      res.status(201).json({ message: "Kontakt skapad", id: this.lastID });
    }
  );
});

server.put("/contacts", (req, res) => {
  const { id, firstName, lastName, phone, address, postCode, city, category } = req.body;
  db.run(`UPDATE contacts SET firstName = ?, lastName = ?, phone = ?, address = ?, postCode = ?, city = ?, category = ? WHERE id = ?`,
    [firstName, lastName, phone, address, postCode, city, category, id],
    function (err) {
      if (err) return res.status(500).json({ error: "Databas error" });
      res.status(200).json({ message: "Kontakt uppdaterad", id: this.lastID });
    }
  );
});

server.delete("/contacts/:id", (req, res) => {
  db.run(`DELETE FROM contacts WHERE id =?`, [req.params.id], 
    function (err) {
      if (err) return res.status(500).json({ error: "Databas error" });
      res.status(200).json({ message: "Kontakt borttagen" });
    }
  );
});