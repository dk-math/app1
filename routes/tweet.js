var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
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

// router.post('/', (req, res, next) => {
//   const client = new Client({
//     user: 'daisuke_kondo',
//     host: '127.0.0.1',
//     database: 'app1db',
//     password: 'gianluigi1978',
//     port: 5432
//   });
//   let title = req.body.book-title;
//   let ps = req.body.pass;
//   if 
// })

module.exports = router;
