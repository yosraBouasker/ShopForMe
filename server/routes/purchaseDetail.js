const router = require('express').Router();
const purchaseDetail = require('../models/purchaseDetail');
const purchase = require('../models/purchase');

router.get('/byId/:idPurchase', async (req, res) => {
    const Result = await purchaseDetail.findOne({ "_id": req.params.idPurchase }).populate({ path: 'product' }).exec();
    res.send({ data: Result })
})

router.post('/add/:idPurchase', async (req, res) => {
    req.body.purchase = req.params.idPurchase;
    const purchaseResult = await purchaseDetail.create(req.body).catch(err => err);
    const Result = await purchase.updateOne({ "_id": req.params.idPurchase }, { $push: { purchaseDetails: purchaseResult._id } }).exec();
    res.send({ data: purchaseResult })
})

router.post('/update/:idPurchase', async (req, res) => {
    const Result = await purchaseDetail.update({ "_id": req.params.idPurchase }, { $set: req.body }).exec();
    res.send({ data: Result })
})

router.post('/delete/:idPurchase', async (req, res) => {
    const purchaseD = await purchaseDetail.findOne({ "_id": req.params.idPurchase }).exec();
    var idCart = purchaseD.purchase;
    const Result = await purchase.updateOne({ "_id": idCart }, { $pull: { purchaseDetails: req.params.idPurchase } }).exec();
    const deleteResult = await purchaseDetail.deleteOne({ "_id": req.params.idPurchase }).exec();
    res.send({ data: deleteResult })
})

module.exports = router;

