const router = require('express').Router();
const user = require('../models/user');

router.get('/user/:id', async (req, res) => {
  const userResult = await user.findOne({ "_id": req.params.id }).exec();
  res.send({ data: userResult })
})

module.exports = router;
