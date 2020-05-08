const router = require('express').Router();
const client = require('../models/client');
const user = require('../models/user');

router.get('/client/:id', async (req, res) => {
    const userResult = await client.findOne({ "_id": req.params.id }).populate({path: 'user'}).populate({path: 'purchases', populate: {path: 'purchaseDetails'}}).exec();
    res.send({ data: userResult })
  })

router.get('/all', async (req, res) => {
    const userResult = await client.find().populate({path: 'user'}).populate({path: 'purchases', populate: {path: 'purchaseDetails'}}).exec();
    res.send({ data: userResult })
  })

  router.post('/delete/:id', async (req, res) => {
    var userRes = await user.findOne({ "client": req.params.id })
    const clientResult = await client.deleteOne({ "_id": req.params.id }).exec();
    const userResult = await user.deleteOne({ "_id": userRes._id }).exec();
    res.send({ data: clientResult })
  })
module.exports = router;

