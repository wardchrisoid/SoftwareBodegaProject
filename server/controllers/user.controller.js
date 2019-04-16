const bcrypt = require('bcrypt');
const Joi = require('joi');
const User = require('../models/user.model');
const mongoose = require('mongoose');

const userSchema = Joi.object({
  fullname: Joi.string().required(),
  email: Joi.string().email(),
  mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/),
  password: Joi.string().required(),
  repeatPassword: Joi.string().required().valid(Joi.ref('password'))
})

const updateUserSchema = Joi.object({
  fullname: Joi.string(),
  email: Joi.string().email(),
  mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/),
  roles: Joi.string()
})

module.exports = {
  insert,
  retreive,
  updateUser
}

async function insert(user) {
  user = await Joi.validate(user, userSchema, { abortEarly: false });
  user.hashedPassword = bcrypt.hashSync(user.password, 10);
  user.userId = mongoose.Types.ObjectId();
  delete user.password;
  return await new User(user).save();
}


async function retreive(id) {
  return await User.find({ _id: id}).exec();
}

async function updateUser(id, user) {
  user = await Joi.validate(user, updateUserSchema, { abortEarly: false });
  return await User.findOneAndUpdate({ _id: id}, {$set:{email: user.email, 
                                                        phoneNumber : user.phoneNumber,
                                                        roles : user.roles,}}).exec();
} 

