const router = require('express').Router();
const product = require('../models/product');
const subCategory = require('../models/subCategory');
const multer = require('multer');




const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null,file.originalname)
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

router.post('/updateImage/:id', upload.single('image'), async (req, res) => {
  const body = {
    "image" : req.file.path
  }
  const Result = await product.update({ "_id": req.params.id }, { $set: body }).exec();
  res.send({Result});

})

router.post('/add/:idSubCat', async (req, res) => {
    req.body.subCategory = req.params.idSubCat;
    req.body.createdAt = new Date();
    const productResult = await product.create(req.body).catch(err => err);
    const subCatResult = await subCategory.updateOne({ "_id": req.params.idSubCat }, { $push: { products: productResult._id } }).exec();
    res.send({ data: productResult })
  })

router.post('/update/:idProduct', async (req, res) => {
    if (req.body.discount != undefined){
      req.body.updatedAt = new Date();
    }
    const productResult = await product.update({ "_id": req.params.idProduct }, { $set: req.body }).exec();
    res.send({ data: productResult })
  })

router.post('/delete/:idProduct', async (req, res) => {
  var productD = await product.findOne({ "_id": req.params.idProduct }).exec();
  var categoryId = productD.category;
  var listResult = await subCategory.updateOne({ "_id": categoryId }, { $pull: { product: req.params.idProduct } }).exec(); 
  const productResult = await product.deleteOne({ "_id": req.params.idProduct }).exec();
    res.send({ data: productResult })
  })

router.get('/all', async (req, res) => {
    const result = await product.find().populate({ path: 'subCategory', populate: { path: 'category'}}).exec();
    res.send({ data: result })
  })


router.get('/all/:idSub', async (req, res) => {
    const result = await product.find({ "subCategory": req.params.idSub }).exec();
    res.send({ data: result })
  })

router.get('/byId/:id', async (req, res) => {
    const productResult = await product.findOne({ "_id": req.params.id }).populate({ path: 'subCategory', populate: { path: 'category'}}).exec();
    res.send({ data: productResult })
  })

router.get('/byName/:name', async (req, res) => {
    const productResult = await product.findOne({ "name": req.params.name }).exec();
    res.send({ data: productResult })
  })

module.exports = router;
