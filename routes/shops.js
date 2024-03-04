var express = require('express');
var router = express.Router();
var crud = require('../models/db_crud');
var display_products = require('../models/display_table');

/* GET shops listing. */
router.get('/', function(req, res, next) {
  res.render('shops', { title: 'Shop Page' });
});


/* GET shops/profile. */
router.get('/profile', async function(req, res, next) {
    let user_name = req.session.user_name;
    let shop = req.session.shop;
    // console.log(req.session.user_name);
    if(user_name){
      let cells_string = await display_products("products", user_name, shop, 0);
      res.render('profile', { title: 'Shops Page', product_cells: cells_string });
    }
    else{
      res.redirect('/shops');
    }
});

/* POST CRUD */
router.post('/crud', async function(req, res, next) {
    let body = req.body;
    console.log(body) 
    // Call function to query CRUD
    await crud(body);
    res.redirect('/shops/profile');
  });
  
module.exports = router;