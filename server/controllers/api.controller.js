const User = require('../models/user.model');
const Joi = require('joi');
const mongoose = require('mongoose');

const itemSchema = Joi.object({
  name: Joi.string().required(),
  desc: Joi.string().required(),
  price: Joi.number().required(),
  quantity: Joi.number().integer().required()
})

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
  let result = User.find({_id: vendorId ,roles: "vendor"}, 'inventory').exec();
  return result;
}

async function createItem(vendorId, item){
  item = await Joi.validate(item, itemSchema, { abortEarly: false});
  let result = await User.findOneAndUpdate({_id: vendorId}, {$push: {inventory: item}},{new: true}).exec();
  return result;
}

async function retrieveItem(id){
  let result = User.find({'inventory._id': id}, {inventory: {$elemMatch: {_id: id}}}).exec();
  console.log(await result)
  return result;
}

async function updateItem(vendorId, itemId){
  return [];
}

async function deleteItem(vendorId, itemId){
  return [];
}