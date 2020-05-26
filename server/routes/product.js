const router = require('express').Router();
const product = require('../models/product');
const user = require('../models/user');
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
  
router.get('/bySearchHistory/:idUser', async (req, res) => {
  var currentUser = await user.findOne({ "_id": req.params.idUser }).populate({ path: 'client' }).exec();
  var allProd = await product.find().exec();
  var result = [];
  for (let j=0; j<allProd.length; j++){
    for (let i=0; i<currentUser.client.searchHistory.length; i++) {
      if (allProd[j].name.toLowerCase().includes(currentUser.client.searchHistory[i].toLowerCase())
      || allProd[j].description.toLowerCase().includes(currentUser.client.searchHistory[i].toLowerCase())){
        let exists = false;
        for (let k=0; k<result.length; k++){
          if (result[k]==allProd[j]){
            exists=true;
          }
        }
        if (!exists){
          result.push(allProd[j]);
        }
      }
    }
  }
  res.send({ data: result });
})

router.get('/similarToPurchases/:idUser', async (req, res) => {
  var currentUser = await user.findOne({ "_id": req.params.idUser }).populate({ path: 'client', populate: { path: 'purchases', populate: { path: 'purchaseDetails', populate: { path: 'product', populate: { path: 'subCategory'}}}}}).exec();
  var allProd = await product.find().populate({ path: 'subCategory'}).exec();
  var result = [];
  var max=0;
  var min=0;
  var purchasedProducts = [];
  for (let i=0; i<currentUser.client.purchases.length; i++) {
    for (let k=0; k<currentUser.client.purchases[i].purchaseDetails.length; k++) {
      for (let l=0; l<purchasedProducts.length; l++){
        let exists = false;
        if (currentUser.client.purchases[i].purchaseDetails[k].product._id.equals(purchasedProducts[l]._id))
          exists=true; 
      }
      purchasedProducts.push(currentUser.client.purchases[i].purchaseDetails[k].product);
    }
  }

  for (let j=0; j<allProd.length; j++){
    for (let i=0; i<currentUser.client.purchases.length; i++) {
      for (let k=0; k<currentUser.client.purchases[i].purchaseDetails.length; k++) {
        if (allProd[j].subCategory._id.equals(currentUser.client.purchases[i].purchaseDetails[k].product.subCategory._id)){
          if (currentUser.client.purchases[i].purchaseDetails[k].product.price>max){
            max = currentUser.client.purchases[i].purchaseDetails[k].product.price
          }
          if (currentUser.client.purchases[i].purchaseDetails[k].product.price<min){
            min = currentUser.client.purchases[i].purchaseDetails[k].product.price
          }
          let exists = false;
          for (let l=0; l<result.length; l++){
            if (allProd[j] == result[l])
              exists=true; 
          }
          let alreadyPurchased = false;
          for (let l=0; l<purchasedProducts.length; l++){
            if (allProd[j]._id.equals( purchasedProducts[l]._id))
              alreadyPurchased=true; 
          }
         if (!exists && allProd[j].price<=max && allProd[j].price>=min && !alreadyPurchased){
          result.push(allProd[j]);
          }
        }
      }
    }
  }
  res.send({ data: result });
})

module.exports = router;
