const mongoose = require('mongoose');

const purchase = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'client' },
  orderDate: Date,
  shippingDate: Date,
  shippingAddress: String,
  phone: String,
  total: Number,
  progress: {type: String, default:'25%'},
  purchaseDetails: [{ type: mongoose.Schema.Types.ObjectId, ref: 'purchaseDetail' }]
})

module.exports = mongoose.model('purchase', purchase);
