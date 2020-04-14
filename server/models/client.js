const mongoose = require('mongoose');

const client = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  birthDate: Date,
  location: String,
  phone : String,
  image:{ type: String, default: 'http://ssl.gstatic.com/accounts/ui/avatar_2x.png' },
  purchases: [{ type: mongoose.Schema.Types.ObjectId, ref: 'purchase' }],
})

module.exports = mongoose.model('client', client);