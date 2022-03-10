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
        type: Number,
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
    duracion : {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Pelicula", peliculaSchema);