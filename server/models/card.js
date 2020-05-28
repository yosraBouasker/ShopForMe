const mongoose = require('mongoose');

const card = new mongoose.Schema({
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'client' },
    points: { type: Number, default: 0 },
    createdAt: Date,
    expirationDate: Date
})

module.exports = mongoose.model('card', card);