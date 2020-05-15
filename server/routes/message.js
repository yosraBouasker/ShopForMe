const router = require('express').Router();
const message = require('../models/message');

router.post('/add', async (req, res) => {
    req.body.createdAt = new Date();
    const result = await message.create(req.body).catch(err => err);
    res.send({ data: result })
  })

router.get('/all', async (req, res) => {
    const result = await message.find().exec();
    res.send({ data: result })
  })

  router.post('/delete/:idMsg', async (req, res) => {
    const msgResult = await message.deleteOne({ "_id": req.params.idMsg }).exec();
    res.send({ data: msgResult })
  })
  
module.exports = router;
