const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  if (req.session.login != null) {
    let userName = req.session.login.rows[0].name;
    let login = `<div id="login-user"><span>ようこそ </span><a href="#">${userName}</a><span> さん</span></div>`
    const data = {
      login: login
    }
    res.render('index', data);
  } else {
    let login = '<div id="login"><a href="users/login">ログイン</a></div>'
    const data = {
      login: login
    }
    res.render('index', data);
  }
});

module.exports = router;
