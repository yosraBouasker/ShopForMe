const router = require('express').Router();
const category = require('../models/category');

router.post('/add', async (req, res) => {
    const catResult = await category.create(req.body).catch(err => err);
    res.send({message: 'ok', data: catResult })
  })

router.get('/all', async (req, res) => {
    const result = await category.find().populate({ path: 'subCategories' , populate: { path: 'products'}}).exec();
    res.send({ data: result })
  })
  
router.get('/byId/:id', async (req, res) => {
    const catResult = await category.findOne({ "_id": req.params.id }).populate({ path: 'subCategories' , populate: { path: 'products'}}).exec();
    res.send({ data: catResult })
  })

router.get('/byName/:name', async (req, res) => {
    const catResult = await category.findOne({ "name": req.params.name }).populate({ path: 'subCategories' , populate: { path: 'products'}}).exec();
    res.send({ data: catResult })
  })

router.post('/update/:idCat', async (req, res) => {
    const catResult = await category.update({ "_id": req.params.idCat }, { $set: req.body }).exec();
    res.send({ data: catResult })
  })

router.post('/delete/:idCat', async (req, res) => {
    const catResult = await category.deleteOne({ "_id": req.params.idCat }).exec();
    res.send({ data: catResult })
  })

module.exports = router;