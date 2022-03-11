'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Pelicula = require('./Peliculas');

var usuarioSchema = new Schema({
    _id: {
        type: Schema.ObjectId,
        auto: true
    },
    nombre : {
        type: String,
        unique: true
    },
    miLista : [
        {
            type: Schema.Types.ObjectId,
            ref: "Pelicula"
        }
    ]
});

module.exports = mongoose.model("Usuario", usuarioSchema);