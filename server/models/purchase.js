const mongoose = require('mongoose');

const purchase = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'client' },
  orderDate: Date,
  shippingDate: Date,
  total: Number,
  purchaseDetails: [{ type: mongoose.Schema.Types.ObjectId, ref: 'purchaseDetail' }]
})

module.exports = mongoose.model('purchase', purchase);
