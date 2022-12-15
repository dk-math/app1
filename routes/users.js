const express = require('express');
const router = express.Router();
const { Client } = require("pg");

router.get('/login', (req, res, next) => {
  const data = {
     title:'ログイン',
     content:'ユーザー名とパスワードを入力してください。'
  }
  res.render('users/login', data);
});

router.post('/login', (req, res, next) => {
  const client = new Client({
    user: 'daisuke_kondo',
    host: '127.0.0.1',
    database: 'app1db',
    password: 'gianluigi1978',
    port: 5432
  });
  client.connect();
  let nm = req.body.name;
  let ps = req.body.pass;
  const query = `SELECT * FROM member WHERE member.name='${nm}' AND member.pass='${ps}'`;
  client.query(query)
  .then(result => {
    if (result.rows.length != 0) {
      req.session.login = result;
      let back = req.session.back;
      if (back == null){
        back = '/';
      }
      res.redirect(back);
      client.end();
    } else {
      const data = {
        title:'ログイン',
        content:'ユーザー名かパスワードに問題があります。再度入力してください。'
      }
      res.render('users/login', data);
      client.end();
    }
  })
  .catch(err => {
      console.error(err.stack);
      client.end();
  });
});

module.exports = router;
