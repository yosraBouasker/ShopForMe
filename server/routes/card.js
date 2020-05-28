const router = require('express').Router();
const user = require('../models/user')
const client = require('../models/client')
const card = require('../models/card')

router.get('/getCard/:idClient', async (req, res) => {
    const cardResult = await card.find({ "client": req.params.idClient }).exec();
    res.send({ cardResult });
}); 

router.post('/addCard/:idClient', async (req, res) => {
    req.body.client = req.params.idClient;
    req.body.createdAt = new Date();
    req.body.expirationDate = new Date();
    req.body.expirationDate.setDate(req.body.createdAt.getDate() + 365);
    const cardResult = await card.create(req.body).catch(err => err);
    const clientResult = await client.updateOne({ "_id": req.params.idClient }, { $set: { card: cardResult._id } }).exec();
    res.send({ cardResult, clientResult});
  
});

router.post('/updateCard/:idCard', async (req, res) => {
    const cardResult = await card.update({ "_id": req.params.idCard }, { $set: req.body }).exec();
    res.send({ data: cardResult })
});

module.exports = router;