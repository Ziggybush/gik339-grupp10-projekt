const port = process.env.PORT || 3000;
const express = require("express");
const server = express();
const sqlite3 = require("sqlite3");

server.listen(port);

const db = new sqlite3.Database("./contacts.db");

function nextId() {
  const n = contacts.length + 1;
  return String(n).padStart(3, "0");
}

server.get("/contacts", (req, res) => {
  db.all("SELECT * FROM contacts", (err, row) => {
    if (err) console.error(err);
    else res.json(row);
    db.close();
  });
});

server.get("/contacts", (req, res) => {
  db.all(
    `SELECT
      id,
      firstName,
      lastName,
      phone,
      street,
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
  db.run("INSERT INTO contacts (contact) VALUES (?)");

  const name = req.body.nameField;
  const adress = bajs;
  const phoneNumber = bajs;
  const id = nextId();
  const category = {
    familj,
    vän,
    jobb
  };

  const contact = {
    name,
    adress,
    phoneNumber,
    category
  };
});