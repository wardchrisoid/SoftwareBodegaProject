const User = require('../models/user.model');
const Joi = require('joi');
const mongoose = require('mongoose');

const itemSchema = Joi.object({
  name: Joi.string(),
  desc: Joi.string(),
  price: Joi.number(),
  quantity: Joi.number().integer(),
  _id: Joi.string()
})

module.exports = {
  cart,
  fridge,
  inventory,
  createItem,
  retrieveItem,
  updateItem,
  deleteItem,
  addToCart,
  removeFromCart,
  purchaseCart
}

async function fridge() {
  let result = User.find({roles: "vendor"}, 'inventory').exec(); 
  return result;
}

async function cart(id) {
  let result = User.find({_id: id}, 'cart').exec(); 
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
  return result;
}

async function updateItem(vendorId, itemId, item){
  item = await Joi.validate(item, itemSchema, { abortEarly: false});
  item._id = itemId
  let result = []
  if(item.name)
    result = User.findOneAndUpdate({_id: vendorId, 'inventory._id': itemId}, {$set: {"inventory.$.name": item.name}}).exec();
  if(item.desc)
    result = User.findOneAndUpdate({_id: vendorId, 'inventory._id': itemId}, {$set: {"inventory.$.desc": item.desc}}).exec();
  if(item.price)
    result = User.findOneAndUpdate({_id: vendorId, 'inventory._id': itemId}, {$set: {"inventory.$.price": item.price}}).exec();
  if(item.quantity)
    result = User.findOneAndUpdate({_id: vendorId, 'inventory._id': itemId}, {$set: { "inventory.$.quantity": item.quantity}}).exec();
  if(item._id)
    result = User.findOneAndUpdate({_id: vendorId, 'inventory._id': itemId}, {$set: {"inventory.$._id": item._id}}).exec();
  return result;
}

async function deleteItem(vendorId, itemId){
  let result = User.findByIdAndUpdate(vendorId, {'$pull': {'inventory':{ '_id': itemId}}});
  return result;
}

async function addToCart(id, body){
  let vendorId = body["vendorId"];
  let itemId = body["itemId"];
  let quantity = body["quantity"];
  let tempItem = await retrieveItem(itemId)
  if(tempItem[0] != undefined){
    tempItem = tempItem[0]["inventory"][0];
    let item = {}
    item["quantity"] = tempItem["quantity"];
    item["name"] = tempItem["name"];
    item["desc"] = tempItem["desc"];
    item["price"] = tempItem["price"];
    if(item["quantity"]-quantity >= 0){
      item["quantity"] -= quantity;
      updateItem(vendorId,itemId,item);
      item["quantity"] = quantity;
      item["_id"] = tempItem["_id"];
      item["cartId"] = mongoose.Types.ObjectId();
      item["vendorId"] = vendorId;
      let result = await User.findOneAndUpdate({_id: id}, {$push: {cart: item}},{new: true}).exec();
      return result;
    }
  }
}

async function removeFromCart(id, body){
  let itemId = body["itemId"];
  let tempItem = await User.find({'cart._id': itemId, _id: id}, {cart: {$elemMatch: {_id: itemId}}}).exec();
  let currentItem = await retrieveItem(itemId)
  if(tempItem[0] != undefined){
    tempItem = tempItem[0]["cart"][0];  
    vendorId = tempItem["vendorId"];
    let item = {}
    item["quantity"] = tempItem["quantity"];
    item["name"] = tempItem["name"];
    item["desc"] = tempItem["desc"];
    item["price"] = tempItem["price"];
    if(currentItem[0] != undefined){
      item["quantity"] += currentItem[0]["inventory"][0]["quantity"];
      updateItem(vendorId,itemId,item);
    }
    let result = User.findOneAndUpdate({_id: id, 'cart.cartId': tempItem["cartId"]}, {'$pull': {'cart':{ 'cartId': tempItem["cartId"]}}},{new: true});
    return result;
  }
}

async function purchaseCart(id){
  let cart = await User.findOne({_id: id}, 'cart').exec();
  await User.findOneAndUpdate({_id: id}, {'$pull': {'cart':{}}},{new: true}).exec();

  cart = cart["cart"];
  let result = await User.findOneAndUpdate({_id: id}, {$push: {history: cart}},{new: true}).exec();
  return result;
}
