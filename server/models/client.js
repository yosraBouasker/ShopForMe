const mongoose = require('mongoose');

const client = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  age: String,
  address: String,
  city: String,
  country: String,
  postalCode: String,
  profileImg: String,
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'product' }]
})

module.exports = mongoose.model('client', client);