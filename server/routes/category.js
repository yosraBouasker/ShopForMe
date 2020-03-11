const router = require('express').Router();
const user = require('../models/category');
module.exports = router;

router.post('/addCategory', async (req, res) => {
  const CategoryResult = await category.create(req.body).catch(err => err);
  res.send({ data: CategoryResult })
})
