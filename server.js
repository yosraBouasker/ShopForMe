const express = require('express')
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
app.use(bodyparser.json());

mongoose.connect('mongodb://localhost:27017/shop')

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

const auth = require('./server/routes/auth')
app.use('/auth', auth);

const category = require('./server/routes/category')
app.use('/category', category);

const subCategory = require('./server/routes/subCategory')
app.use('/subCategory', subCategory);

const product = require('./server/routes/product')
app.use('/product', product);

const user = require('./server/routes/user')
app.use('/user', user);

const client = require('./server/routes/client')
app.use('/client', client);

const purchase = require('./server/routes/purchase')
app.use('/purchase', purchase);

const purchaseDetail = require('./server/routes/purchaseDetail')
app.use('/purchaseDetail', purchaseDetail);

const message = require('./server/routes/message')
app.use('/message', message);

app.get('/', function(req, res) { // création de la route sous le verbe get
  res.send('Hello world  ! ') // envoi de hello world a l'utilisateur
})

app.listen(3000, ()=>{
  console.log('port:3000')
})
