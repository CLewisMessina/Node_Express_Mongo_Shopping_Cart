let express = require('express');
let router = express.Router();
let Cart = require('../models/cart');

let Product = require('../models/product');
let Order = require('../models/order');

/* GET home page. */
router.get('/', function (req, res, next) {
  let successMsg = req.flash('success')[0];
  Product.find(function (err, docs) {
    let productChunks = [];
    let chunkSize = 3;
    for (let i = 0; i < docs.length; i += chunkSize) {
      productChunks.push(docs.slice(i, i + chunkSize));
    }
    res.render('shop/index', {
      title: 'Shopping Cart',
      products: productChunks,
      successMsg: successMsg,
      noMessages: !successMsg
    });
  });

});

//ADD TO CART ROUTE
router.get('/add-to-cart/:id', function (req, res, next) {
  let productId = req.params.id;
  let cart = new Cart(req.session.cart ? req.session.cart : {});

  Product.findById(productId, function (err, product) {
    if (err) {
      return res.redirect('/');
    }
    cart.add(product, product.id);
    req.session.cart = cart;
    console.log(req.session.cart);
    res.redirect('/');
  });
});

//REMOVE SINGLE ITEM ROUTE
router.get('/reduce/:id', function(req, res, next){
  let productId = req.params.id;
  let cart = new Cart(req.session.cart ? req.session.cart : {});

  cart.reduceByOne(productId);
  req.session.cart = cart;
  res.redirect('/shopping-cart');
});

//REMOVE ENTIRE ITEM GROUP ROUTE
router.get('/remove/:id', function(req, res, next){
  let productId = req.params.id;
  let cart = new Cart(req.session.cart ? req.session.cart : {});

  cart.removeItem(productId);
  req.session.cart = cart;
  res.redirect('/shopping-cart');
});

//CART ITEMS ROUTE
router.get('/shopping-cart', function (req, res, next) {
  //  Check if cart exists w/ if statement
  //    if cart does not exist, redirect to shopping-cart view
  //  Create new cart on shopping-cart view
  if (!req.session.cart) {
    return res.render('shop/shopping-cart', {
      products: null
    });
  }
  let cart = new Cart(req.session.cart);
  res.render('shop/shopping-cart', {
    products: cart.generateArray(),
    totalPrice: cart.totalPrice
  })
});

//CHECKOUT ROUTE
router.get('/checkout', isLoggedIn, function (req, res, next) {
  if (!req.session.cart) {
    return res.redirect('/shopping-cart');
  }
  let cart = new Cart(req.session.cart);
  let errMsg = req.flash('error')[0];
  res.render('shop/checkout', {total: cart.totalPrice, errMsg: errMsg, noError: !errMsg});
});
  
// POST STIPE OBJECT REPONSE FROM SERVER
  
router.post('/checkout', isLoggedIn, function (req, res, next) {
  if (!req.session.cart) {
    return res.redirect('/shopping-cart');
  }
  let cart = new Cart(req.session.cart);

  let stripe = require("stripe")("sk_test_DG4goAE8OPEgecJeeO056oWB");

  //STRIPE AMOUNT IS IN SMALLEST MONETARY UNIT (I.E. $USD = CENTS)
  stripe.charges.create({
    amount: cart.totalPrice * 100,
    currency: "usd",
    source: req.body.stripeToken, // obtained with Stripe.js
    description: "Test Charge"
  }, function (err, charge) {
    if(err){
      req.flash('error', err.message);
      return res.redirect('/checkout');
    }
    let order = new Order({
      user: req.user,
      cart: cart,
      address: req.body.address,
      name: req.body.name,
      paymentId: charge.id
    });
    order.save(function(err, result){
    req.flash('success', 'Your transaction was completed');
    req.session.cart = null;
    res.redirect('/');
    });
  });
});

module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
      return next();
  }
  req.session.oldUrl = req.url;
  res.redirect('/user/signin');
}

