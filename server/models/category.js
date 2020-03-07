const mongoose = require('mongoose');

const category = new mongoose.Schema({
  name: String,
  subCategories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'subCategory' }]
})

module.exports = mongoose.model('category', category);
