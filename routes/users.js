var express = require('express');
var router = express.Router();
const { Client } = require("pg");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', (req, res, next) => {
  var data = {
     title:'ログイン',
     content:'ユーザー名とパスワードを入力してください。'
  }
  res.render('users/login', data);
});

router.post('/login', (req, res, next) => {
  var client = new Client({
    user: 'daisuke_kondo',
    host: '127.0.0.1',
    database: 'app1db',
    password: 'gianluigi1978',
    port: 5432
  });
  client.connect();
  client.query("SELECT * FROM member where name=req.body.name AND pass=req.body.pass", (err, result) => {
    if (result != null) {
      req.session.login = result;
      let back = req.session.back;
      if (back == null){
        back = '/';
      }
      res.redirect(back);
      client.end();
    } else {
      var data = {
        title:'ログイン',
        content:'ユーザー名かパスワードに問題があります。再度入力してください。'
      }
      res.render('users/login', data);
      client.end();
    }
  });
});

module.exports = router;
