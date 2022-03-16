'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var peliculaSchema = new Schema({
    _id : {
        type: Schema.ObjectId,
        auto: true
    },
    title : {
        type: String,
        required: true
    },
    year : {
        type: String,
        required: true
    },
    informacion : {
        type: String,
        required: true
    },
    generos : {
        type: Array,
        required: true
    },
    edad: {
        type : String,
        required: true
    },
    duracion : {
        type: String,
        required: true
    },
    image : {
        type: String
    },
    novedad:{
        type: String,
        required: true
    },
    tipo: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Pelicula", peliculaSchema);