const router = require('express').Router();
const subCategory = require('../models/subCategory');
const category = require('../models/category');

router.post('/add/:idCat', async (req, res) => {
    req.body.category = req.params.idCat;
    const subCatResult = await subCategory.create(req.body).catch(err => err);
    const CatResult = await category.updateOne({ "_id": req.params.idCat }, { $push: { subCategories: subCatResult._id } }).exec();
    res.send({ data: CatResult })
  })

router.post('/update/:idSubCat', async (req, res) => {
    const subcatResult = await subCategory.update({ "_id": req.params.idSubCat }, { $set: req.body }).exec();
    res.send({ data: subcatResult })
  })

router.post('/delete/:idSubCat', async (req, res) => {
    const subcatResult = await subCategory.deleteOne({ "_id": req.params.idSubCat }).exec();
    res.send({ data: subcatResult })
  })

router.get('/all', async (req, res) => {
    const result = await subCategory.find().populate({ path: 'products' }).exec();
    res.send({ data: result })
  })

router.get('/byId/:id', async (req, res) => {
    const subcatResult = await subCategory.findOne({ "_id": req.params.id }).populate({ path: 'products' }).exec();
    res.send({ data: subcatResult })
  })

router.get('/byName/:name', async (req, res) => {
    const subcatResult = await subCategory.findOne({ "name": req.params.name }).populate({ path: 'products' }).exec();
    res.send({ data: subcatResult })
  })

router.get('/name/:id', async (req, res) => {
    const subcatResult = await subCategory.findOne({ "_id": req.params.id }).exec();
    res.send({ data: subcatResult.name })
  })
  
module.exports = router;
