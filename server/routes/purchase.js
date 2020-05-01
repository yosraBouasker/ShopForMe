const router = require('express').Router();
const purchase = require('../models/purchase');
const client = require('../models/client');

router.post('/add/:idClient', async (req, res) => {
    req.body.client = req.params.idClient;
    const purchaseResult = await purchase.create(req.body).catch(err => err);
    const Result = await client.updateOne({ "_id": req.params.idClient }, { $push: { purchases: purchaseResult._id } }).exec();
    res.send({ data: purchaseResult })
  })

router.post('/update/:idPurchase', async (req, res) => {
    const Result = await purchase.update({ "_id": req.params.idPurchase }, { $set: req.body }).exec();
    res.send({ data: Result })
})

router.post('/delete/:idPurchase', async (req, res) => {
    const Result = await purchase.deleteOne({ "_id": req.params.idPurchase }).exec();
    res.send({ data: Result })
})

router.get('/byId/:idPurchase', async (req, res) => {
    const Result = await purchase.findOne({ "_id": req.params.idPurchase }).populate({ path: 'purchaseDetails', populate: { path: 'product'}}).exec();
    res.send({ data: Result })
})

router.get('/purchasesByClient/:idClient', async (req, res) => {
    const Result = await purchase.find({ "client": req.params.idClient }).populate({ path: 'purchaseDetails', populate: { path: 'product'}}).exec();
    var finalResult = Result.filter(r => r.orderDate!=undefined)
    res.send({ data: finalResult })
})

router.get('/all', async (req, res) => {
    const Result = await purchase.find().populate({ path: 'purchaseDetails', populate: { path: 'product'}}).populate({path: 'client', populate: { path: 'user'}}).exec();
    res.send({ data: Result })
})

module.exports = router;
