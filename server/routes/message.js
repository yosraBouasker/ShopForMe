const router = require('express').Router();
const message = require('../models/message');

router.post('/add', async (req, res) => {
    const result = await message.create(req.body).catch(err => err);
    res.send({ data: result })
  })

router.get('/all', async (req, res) => {
    const result = await message.find().exec();
    res.send({ data: result })
  })
  
module.exports = router;
