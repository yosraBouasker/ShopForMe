const mongoose = require('mongoose');

const purchaseDetail = new mongoose.Schema({
  purchase: { type: mongoose.Schema.Types.ObjectId, ref: 'purchase' },
  quantity: Number,
  subTotal: Number,
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'product' }
})

module.exports = mongoose.model('purchaseDetail', purchaseDetail);