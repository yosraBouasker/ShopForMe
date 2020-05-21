const mongoose = require('mongoose');

const client = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  birthDate: Date,
  location: String,
  phone : String,
  image: String,
  purchases: [{ type: mongoose.Schema.Types.ObjectId, ref: 'purchase' }],
  searchHistory: [{type: String}]
})

module.exports = mongoose.model('client', client);