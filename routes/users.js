const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const { Client } = require("pg");

router.get('/add', (req, res, next) => {
  const data = {
     title: 'アカウント作成',
     content: 'ユーザー名とパスワードを入力してください。',
     form: {name:'', pass:''}
  }
  res.render('users/add', data);
});

router.post('/add', [
  check('name').isLength({min:1, max: 12}).withMessage('ユーザー名 は1文字以上、12文字以下にしてください'),
  check('pass').isLength({min: 8}).withMessage('パスワード は8文字以上にしてください'),
  check('pass').custom((value, { req }) => {
    if (value.match(/^(?=.*[a-zA-z])(?=.*[0-9])([a-zA-Z0-9]+$)/)) {
      return true;
    }
  }).withMessage('パスワード は半角英字、数字を組み合わせてください')
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let result = '<ul class="text-danger">';
    let resultArr = errors.array();
    for (let i in resultArr) {
      result += '<li>' + resultArr[i].msg + '</li>';
    }
    result += '</ul>';
    const data = {
      title: 'アカウント作成',
      content: result,
      form: req.body
    }
    res.render('users/add', data);
  } else {
    // const client = new Client({
    //   user: 'daisuke_kondo',
    //   host: '127.0.0.1',
    //   database: 'app1db',
    //   password: 'gianluigi1978',
    //   port: 5432
    // });
    const client= new Client({
      connectionString: process.env.DB_URL,
      ssl: {
        rejectUnauthorized: false
      }
    });
    let nm = req.body.name;
    let ps = req.body.pass;
    const query = 'INSERT INTO member (name, pass) VALUES ($1, $2)';
    const values = [nm, ps];
    client.connect()
    .then(() => console.log("接続完了"))
    .then(() => client.query(query, values))
    .then(result => {
      let back = req.session.back;
      console.log(back);
      if (back == null){
        back = '/';
      }
      res.redirect(back);
    })
    .catch(err => console.log(err))
    .finally(() => client.end());
  }
});

router.get('/login', (req, res, next) => {
  const data = {
     title:'ログイン',
     content:'ユーザー名とパスワードを入力してください。',
     form: {name: '', pass: ''}
  }
  res.render('users/login', data);
});

router.post('/login', (req, res, next) => {
  // const client = new Client({
  //   user: 'daisuke_kondo',
  //   host: '127.0.0.1',
  //   database: 'app1db',
  //   password: 'gianluigi1978',
  //   port: 5432
  // });
  const client= new Client({
    connectionString: process.env.DB_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });
  let nm = req.body.name;
  let ps = req.body.pass;
  const query = `SELECT * FROM member WHERE member.name='${nm}' AND member.pass='${ps}'`;
  client.connect()
  .then(() => console.log("接続完了"))
  .then(() => client.query(query))
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
        content:'ユーザー名かパスワードに問題があります。再度入力してください。',
        form: req.body
      }
      res.render('users/login', data);
      client.end();
    }
  })
  .catch(err => console.log(err))
  .finally(() => client.end());
});


module.exports = router;
