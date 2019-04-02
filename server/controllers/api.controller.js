const User = require('../models/user.model');
const mongoose = require('mongoose');

module.exports = {
  fridge
}

async function fridge() {
  let result = User.find({roles: "vendor"}, 'inventory').exec(); 
  return result;
}
