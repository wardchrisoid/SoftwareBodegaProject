const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const apiCtrl = require('../controllers/api.controller');

const router = express.Router();
module.exports = router;

// router.use(passport.authenticate('jwt', { session: false }))

router.get('/', retrieve);

router.route('/:vendorId')
  .get(retrieveInventory)
  .post(createItem);

router.route('/:vendorId/:itemId')
  .post(updateItem)
  .delete(deleteItem);

router.route('/item/:itemId')
  .get(retrieveItem);

async function retrieve(req, res) {
  let fridge = await apiCtrl.fridge();
  res.json(fridge);
}

async function retrieveInventory(req, res){
  let inventory = await apiCtrl.inventory(req.params.vendorId);
  res.json(inventory)
}

async function createItem(req, res){
  let item = await apiCtrl.createItem(req.params.vendorId, req.body);
  res.json(item);
}

async function retrieveItem(req, res){
  console.log(req.params.itemId);
  let item = await apiCtrl.retrieveItem(req.params.itemId);
  res.json(item);
}

async function updateItem(req, res){
  let item = await apiCtrl.updateItem(req.params.vendorId, req.params.itemId);
  res.json(item);
}
async function deleteItem(req, res){
  let item = await apiCtrl.deleteItem(req.params.vendorId, req.params.itemId);
  res.json(item);
}