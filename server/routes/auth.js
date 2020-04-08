const router = require('express').Router();
const user = require('../models/user');
const client = require('../models/client');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.post('/login', async (req, res) => {
  const userResult = await user.findOne({ email: req.body.email }).exec();
  if (!userResult) res.send({ message: 'Wrong email or password' })
  if (!bcrypt.compareSync(req.body.password, userResult.password)) res.send({ message: 'Wrong email or password' })
  res.send({ message: 'ok', token: jwt.sign({ data: userResult }, ' secret_pass ') })
})

router.post('/register', async (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, 10);
  const userResult = await user.create(req.body).catch(err => err);
  const clientResult = await client.create({'user':userResult._id}).catch(err => err);
  const Result = await user.update({ "_id": userResult._id }, { $set: {'client': clientResult._id} }).exec();
  res.send({ message: 'ok', token: jwt.sign({ data: userResult }, ' secret_pass ') });
})

router.get('/all', async (req,res )=> {
  const userResult = await user.find().exec()
  res.send({userResult})
})



module.exports = router;
