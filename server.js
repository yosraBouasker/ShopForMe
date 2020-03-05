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

// const auth = require('./server/routes/auth')
// app.use('/auth', auth);

// const article = require('./server/routes/article')
// app.use('/article', article);

// const comment = require('./server/routes/comment')
// app.use('/comment', comment);

// const user = require('./server/routes/user')
//app.use('/user', user);

app.listen(3000, ()=>{
  console.log('port:3000')
})
