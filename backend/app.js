'use strict'

const express = require('express');
var bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.urlencoded({extended:false}));  //cargar el bodyparser
app.use(bodyParser.json());  //Convertir todo lo que recibamos a json

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use('/api', require('./routes/api.routes'));

module.exports = app;