const mongoose = require('mongoose');

const user = new mongoose.Schema({
  name: String,
  lastname: String,
  email: { type: String, required: true, unique: true },
  password : String,
  location :String,
  phone :String,
  image:{ type: String, default: 'http://ssl.gstatic.com/accounts/ui/avatar_2x.png' },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'client' },
  role: { type: String, enum: ['admin','client'], default: 'client' }
})

module.exports = mongoose.model('user', user);
