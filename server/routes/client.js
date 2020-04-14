const router = require('express').Router();
const client = require('../models/client');

router.get('/client/:id', async (req, res) => {
    const userResult = await client.findOne({ "_id": req.params.id }).populate({path: 'user'}).populate({path: 'purchases', populate: {path: 'purchaseDetails'}}).exec();
    res.send({ data: userResult })
  })

router.get('/all', async (req, res) => {
    const userResult = await client.find().populate({path: 'user'}).populate({path: 'purchases', populate: {path: 'purchaseDetails'}}).exec();
    res.send({ data: userResult })
  })
module.exports = router;

