var express = require('express');
var router = express.Router();
var authenticate = require('../models/authen');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users', { title: 'Users Page' });
});
/* GET users/login. */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login Page', message: "" });
});
/* GET users/login. */
router.get('/logout', function(req, res, next) {
  req.session.destroy();
  res.redirect('/users');
});
/* POST from Login form */
router.post('/login', async function(req, res, next) {
  let user_name = req.body.uname;
  let pass_word = req.body.pword;
  req.session.user_name = user_name;
  auth_result = await authenticate(user_name, pass_word);
  req.session.shop = auth_result.shop;
  if(auth_result.auth) {
    if(auth_result.shop == 'director'){
      res.redirect('/director/profile');
    } 
    else if(auth_result.shop == 'admin'){
      res.redirect('/admin/profile');
    }
    else {
      res.redirect('/shops/profile');
    }
  }
  else{
    res.render('login', {title: "Login Page", message: "Wrong username and password"});
  }
});

module.exports = router;
