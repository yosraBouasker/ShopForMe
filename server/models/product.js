const mongoose = require('mongoose');

const product = new mongoose.Schema({
  subCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'subCategory' },
  name: String,
  reference: String,
  description: String,
  price: Number,
  discount: Number,
  image:{ data: Buffer, contentType: String }
})

module.exports = mongoose.model('product', product);
