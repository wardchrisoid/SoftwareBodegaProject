const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    unique: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    // Regexp to validate emails with more strict rules as added in tests/users.js which also conforms mostly with RFC2822 guide lines
    match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please enter a valid email'],
  },
  hashedPassword: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    match: [/([0-9]+-)*[0-9]{3}-[0-9]{3}-[0-9]{4}/, 'Please enter a phone number'],
  },
  inventory: [{
    item: {
      itemID: mongoose.Schema.Types.ObjectId,
      name: String,
      desc: String,
      price: Number,
      quantity: Number,
    }
  }],
  cart: [{
    item: {
      itemID: mongoose.Schema.Types.ObjectId,
      name: String,
      desc: String,
      price: Number,
      quantity: Number,
    }
  }],
  paymentDetails: {
    type: String,
    info: String,
  },
  history: [{
    item: {
      itemID: mongoose.Schema.Types.ObjectId,
      name: String,
      desc: String,
      price: Number,
      quantity: Number,
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  roles: [{
    type: String,
  }]
}, {
  versionKey: false,
});


module.exports = mongoose.model('User', UserSchema);
