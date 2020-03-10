const mongoose = require('mongoose');

const purchase = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'client' },
  orderDate: date,
  shippingDate: date,
  total: Number,
  purchaseDetails: [{ type: mongoose.Schema.Types.ObjectId, ref: 'purchaseDetail' }]
})

module.exports = mongoose.model('purchase', purchase);