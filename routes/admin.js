var express = require('express');
var router = express.Router();
var display_products = require('../models/display_table');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('admin', { title: 'Admin Page' });
  });

/* GET shops/profile. */
router.get('/profile', async function(req, res, next) {
    let user_name = req.session.user_name;
    let shop = req.session.shop;
    // console.log(req.session.user_name);
    if(user_name){
      let cells_string = await display_products("shops", user_name, shop, 0);
      res.render('profile', { title: 'Admin Page', product_cells: cells_string });
    }
    else{
      res.redirect('/admin');
    }
});

module.exports = router;