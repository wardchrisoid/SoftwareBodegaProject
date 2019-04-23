const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const apiCtrl = require('../controllers/api.controller');

const router = express.Router();
module.exports = router;

// router.use(passport.authenticate('jwt', { session: false }))

router.route('/:id')
  .get(retrieve)
  .post(addToCart)

router.route('/:id/:itemId')
  .delete(removeFromCart)


router.route('/checkout/:id')
  .post(purchaseCart)

async function retrieve(req, res) {
  let cart = await apiCtrl.cart(req.params.id);
  res.json(cart);
}

async function addToCart(req, res){
  let item = await apiCtrl.addToCart(req.params.id, req.body);
  res.json(item);
}
async function removeFromCart(req, res){
  let item = await apiCtrl.removeFromCart(req.params.id, req.params.itemId);
  res.json(item);
}

async function purchaseCart(req, res){
  let cart = await apiCtrl.purchaseCart(req.params.id);
  res.json(cart);
}
