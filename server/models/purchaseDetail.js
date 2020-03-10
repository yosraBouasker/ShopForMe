const mongoose = require('mongoose');

const purchaseDetail = new mongoose.Schema({
  quantity: Number,
  subTotal: Number,
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'product' }
})

module.exports = mongoose.model('purchaseDetail', purchaseDetail);