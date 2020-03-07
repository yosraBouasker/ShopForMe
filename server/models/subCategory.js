const mongoose = require('mongoose');

const subCategory = new mongoose.Schema({
  name: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'category' },
  products:[{ type: mongoose.Schema.Types.ObjectId, ref: 'product' }]
})

module.exports = mongoose.model('subCategory', subCategory);
