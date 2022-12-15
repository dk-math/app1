const express = require('express');
const router = express.Router();
const { Client } = require("pg");

/* GET home page. */
router.get('/', (req, res, next) => {
  const client = new Client({
    user: 'daisuke_kondo',
    host: '127.0.0.1',
    database: 'app1db',
    password: 'gianluigi1978',
    port: 5432
  });
  client.connect();
  client.query("SELECT * FROM member", (err, result) => {
    content = result.rows;
    var data = {
      content: content
    }
    res.render('index', data);
    client.end();
  });
});

module.exports = router;
