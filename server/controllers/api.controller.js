const User = require('../models/user.model');
const mongoose = require('mongoose');

module.exports = {
  fridge,
  inventory,
  createItem,
  retrieveItem,
  updateItem,
  deleteItem
}

async function fridge() {
  let result = User.find({roles: "vendor"}, 'inventory').exec(); 
  return result;
}

async function inventory(vendorId){
  let result = User.find({_id:  vendorId ,roles: "vendor"}, 'inventory').exec();
  return result;
}

async function createItem(item){
  return [];
}

async function retrieveItem(id){
  let result = User.find({'inventory.itemId': mongoose.Types.ObjectId(id)}, {inventory: {$elemMatch: {itemId: mongoose.Types.ObjectId(id)}}}).exec();
  console.log(await result)
  return result;
}

async function updateItem(vendorId, itemId){
  return [];
}

async function deleteItem(vendorId, itemId){
  return [];
}