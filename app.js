//on appelle le framework express
const express = require('express');

//app permet d'avoir toutes les fonctions natives d'express
const app = express();

//pour la suppression des images modifiés
const path = require('path');

app.use(express.json());

//on lance la connection avec mongodb
require('./lib/dbConfig');

//on declare nos routes 
const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');

//bodyParser pour pouvoir recuperer les element du dom req.body.name
const bodyParser = require('body-parser');
app.use(bodyParser.json());


//middleware de declarer des droits de connection et de securite cors sur toutes les routes
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


//attention double underscore avant dirname
app.use('/images', express.static(path.join(__dirname, 'images')));

//on declare la route des stuff
app.use('/api/auth/', userRoutes);
app.use('/api/sauces', sauceRoutes);

module.exports = app;