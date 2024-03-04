var express = require('express');
var router = express.Router();
var select_option_form = require('../models/select_option_form');
var display_products = require('../models/display_table');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('director', { title: 'Director Page' });
  });

  /* GET /director. */
  router.get('/profile', async function(req, res, next) {
    let user_name = req.session.user_name;
    let shop = req.session.shop;
    // check interval time in session
  
    let select_html = await select_option_form();
    // console.log(req.session.user_name);
    if(user_name){
      let cells_string = await display_products("products", user_name, shop, 0);
      res.render('director', { title: 'Director Page', 
      product_cells: cells_string, select_form: select_html });
    }
    else{
      res.redirect('/users/login');
    }
  });
  /* POST from Director form */
  router.post('/profile', async function(req, res, next) { 
    let user_name = req.session.user_name;
    let shop = req.session.shop;
    let shop_id = req.body.shop_selected;
    let select_html = await select_option_form();
    // console.log(req.session.user_name);
    let cells_string = await display_products("products", user_name, shop, shop_id);
    res.render('director', { title: 'Director Page', product_cells: cells_string, select_form: select_html });
  });
  // /* Router for select refreshtime POST */
  // router.post('/profile/refreshtime', async function(req, res, next) { 
  //   req.session.interval = req.body.interval;
  //   res.redirect('/director');
  // });
module.exports = router;