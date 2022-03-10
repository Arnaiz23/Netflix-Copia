'use strict'

var mongoose = require('mongoose');
var port = '3900';
var app = require('./app');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://adrian:adrian@mongodb/api' , {useNewUrlParser : true} , () => {
    console.log("Conectado a la base de datos correctamente");

    app.listen(port, () =>{
        console.log("Backend corriendo por http://localhost:"+port);
    })
})