'use strict'

var mongoose = require('mongoose');
var port = process.env.PORT || 3900;
var app = require('./app');

const config = require('./config/config');

mongoose.Promise = global.Promise;

mongoose.connect(`mongodb+srv://arnaiz23:${config.password}@netflixclone.1l58o.mongodb.net/api?retryWrites=true&w=majority` , {useNewUrlParser : true} , () => {
    console.log("Conectado a la base de datos correctamente");

    app.listen(port, () =>{
        console.log("Backend corriendo por http://localhost:"+port);
    })
})