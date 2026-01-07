const port = process.env.PORT || 3000;
const express = require("express");
const server = express();
const sqlite3 = require("sqlite3");

server.listen(port);

const db = new sqlite3.Database("./contacts.db");

function nextId() {
  const n = tasks.length + 1;
  return String(n).padStart(3, "0");
}

server.get("/contacts", (req, res) => {
  db.all("SELECT contact FROM contacts", (err, row) => {
    if (err) console.error(err);
    else res.json(row);
    db.close();
  });
});

server.post("/contacts", (req, res) => {
  db.run("INSERT INTO contacts (contact) VALUES (?)");

  const name = req.body.nameField;
  const adress = bajs;
  const phoneNumber = bajs;
  const id = nextId();
});
