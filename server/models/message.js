const mongoose = require('mongoose');

const message = new mongoose.Schema({
  fullName: String,
  email: String,
  text: String
})

module.exports = mongoose.model('message', message);
