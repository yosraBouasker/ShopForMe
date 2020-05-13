const router = require('express').Router();
const subCategory = require('../models/subCategory');
const category = require('../models/category');
const product = require('../models/product');

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
  const subcat = await subCategory.findOne({ "_id": req.params.idSubCat }).exec();
  var idCategory = subcat.category;
  const Result = await category.updateOne({ "_id": idCategory }, { $pull: { subCategories: req.params.idSubCat } }).exec(); 
  for (let i=0; i<subcat.products.length; i++) {
    const prod = await product.deleteOne({"_id": subcat.products[i]._id }).exec();
  }
  const subcatResult = await subCategory.deleteOne({ "_id": req.params.idSubCat }).exec();

    res.send({ data: subcatResult })
  })

router.get('/all', async (req, res) => {
    const result = await subCategory.find().populate({ path: 'products' }).populate({ path: 'category' }).exec();
    res.send({ data: result })
  })

router.get('/byId/:id', async (req, res) => {
    const subcatResult = await subCategory.findOne({ "_id": req.params.id }).populate({ path: 'products' }).exec();
    res.send({ data: subcatResult })
  })

router.get('/byCategory/:idCat', async (req, res) => {
    const subcatResult = await subCategory.find({ "category": req.params.idCat }).populate({ path: 'products' }).exec();
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
