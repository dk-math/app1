const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
require('dotenv').config();
const { Client } = require("pg");

function loginCheck(req,res) {
  if (req.session.login == null) {
    req.session.back = '/tweet';
    res.redirect('/users/login');
    return true;
  } else {
    return false;
  }
}

/* GET home page. */
router.get('/', (req, res, next) => {
  if (loginCheck(req, res)) {return};
  if (req.session.login != null) {
    let userName = req.session.login.rows[0].name;
    let login = `<div id="login-user"><span>ようこそ </span><a href="#">${userName}</a><span> さん</span></div>`
    const data = {
      login: login
    }
    res.render('tweet', data);
  } else {
    let login = '<div id="login"><a href="users/login">ログイン</a></div>'
    const data = {
      login: login
    }
    res.render('tweet', data);
  }
});

router.post('/', (req, res, next) => {
  if (loginCheck(req, res)) {return};
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
  let userId = req.session.login.rows[0].id;
  let userName = req.session.login.rows[0].name;
  let title = req.body.bookTitle;
  let rate = req.body.rate;
  let comment = req.body.bookComment;
  const query = 'INSERT INTO tweet (userid, username, booktitle, bookrate, bookcomment) VALUES ($1, $2, $3, $4, $5)';
  const values = [userId, userName, title, rate, comment];
  client.connect()
  .then(() => console.log("接続完了"))
  .then(() => client.query(query, values))
  .then(result => {
    let back = req.session.back;
    console.log(back);
    if (back == null){
      back = '/tweet';
    }
    res.redirect(back);
  })
  .catch(err => console.log(err))
  .finally(() => client.end());
});

module.exports = router;
