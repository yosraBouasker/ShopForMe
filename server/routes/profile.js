const router = require('express').Router();
const user = require('../models/user')
const bcrypt = require('bcryptjs');

router.post('/update/:id', async (req, res) => {
  if (req.body.password != undefined) {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
  }
  const userResult = await user.update({ "_id": req.params.id }, { $set: req.body }).exec();
  res.send({ userResult });
})

router.get('/info/:id', async (req, res) => {
  const userResult = await user.find({ "_id": req.params.id }).exec();
  res.send({ userResult });
})

module.exports = router;
