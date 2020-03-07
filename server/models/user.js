const mongoose = require('mongoose');

const user = new mongoose.Schema({
  name: String,
  lastname: String,
  email: { type: String, required: true, unique: true },
  password: String,
  role: { type: String, enum: ['admin','client'], default: 'client' }
})

module.exports = mongoose.model('user', user);
