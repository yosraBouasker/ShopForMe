const router = require('express').Router();
const user = require('../models/user')
const client = require('../models/client')
const bcrypt = require('bcryptjs');

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
  const userResult = await user.update({ "_id": req.params.id }, { $set: req.body }).exec();
  const clientResult = await client.update({ "user": req.params.id }, { $set: body }).exec();
  res.send({userResult,clientResult});

})

router.post('/update/:id', async (req, res) => {
  if (req.body.password != undefined) {
    req.body.password = bcrypt.hashSync(req.body.password, 4);
  }
  const userResult = await user.update({ "_id": req.params.id }, { $set: req.body }).exec();
  const clientResult = await client.update({ "user": req.params.id }, { $set: req.body }).exec();
  res.send({ userResult,  clientResult});
})

router.get('/info/:id', async (req, res) => {
  const userResult = await user.find({ "_id": req.params.id }).populate({path : 'client'}).exec();
  res.send({ userResult });
})

router.get('/card/:idUser', async (req, res) => {
  const userResult = await user.find({ "_id": req.params.id }).populate({path : 'client'}).exec();

});


module.exports = router;
