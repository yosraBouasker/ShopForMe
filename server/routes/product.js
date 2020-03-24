const router = require('express').Router();
const product = require('../models/product');
const subCategory = require('../models/subCategory');

router.post('/add/:idSubCat', async (req, res) => {
    req.body.subCategory = req.params.idSubCat;
    const productResult = await product.create(req.body).catch(err => err);
    const subCatResult = await subCategory.updateOne({ "_id": req.params.idSubCat }, { $push: { products: productResult._id } }).exec();
    res.send({ data: subCatResult })
  })

router.post('/update/:idProduct', async (req, res) => {
    if (req.body.discount != undefined){
      req.body.updatedAt = new Date();
    }
    const productResult = await product.update({ "_id": req.params.idProduct }, { $set: req.body }).exec();
    res.send({ data: productResult })
  })

router.post('/delete/:idProduct', async (req, res) => {
    const productResult = await product.deleteOne({ "_id": req.params.idProduct }).exec();
    res.send({ data: productResult })
  })

router.get('/all', async (req, res) => {
    const result = await product.find().exec();
    res.send({ data: result })
  })


router.get('/all/:idSub', async (req, res) => {
    const result = await product.find({ "subCategory": req.params.idSub }).exec();
    res.send({ data: result })
  })

router.get('/byId/:id', async (req, res) => {
    const productResult = await product.findOne({ "_id": req.params.id }).exec();
    res.send({ data: productResult })
  })

router.get('/byName/:name', async (req, res) => {
    const productResult = await product.findOne({ "name": req.params.name }).exec();
    res.send({ data: productResult })
  })
  
module.exports = router;