//mongobd pw: Bloodmoon92
//mzongobd connection : mongodb+srv://BenC92:<password>@cluster0.lylb1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority


const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');


const  sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

const app = express();

mongoose.connect('mongodb+srv://BenC92:Bloodmoon92@cluster0.lylb1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrlParser: true})
    .then(() => {
    console.log('Successfully connected to MongoDB Atlas!');
  })
  .catch((error) => {
    console.log('Unable to connect to MongoDB Atlas!');
    console.error(error);
  });

const allowedOrigin = ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://localhost:5501', 'http://127.0.0.1:5501']
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true)
    if (allowedOrigin.indexOf(origin) === -1) {
      const message = 'The CORS policy for this site does not ' +
                  'allow access from the specified Origin.'
      return callback(new Error(message), false)
    }
    return callback(null, true)
  },
  exposedHeaders: ['Origin, X-Requested-With, Content, Content-Length, Accept, Content-Type, Authorization'],
  credentials: true
}))


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;