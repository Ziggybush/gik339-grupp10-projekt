const port = process.env.PORT || 3000;
const express = require('express');
const server = express();
const sqlite3 = require('sqlite3');

server.listen(port);