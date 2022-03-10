'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const bcryptjs = require("bcryptjs");

var usuarioSchema = new Schema({
    _id : {
        type: Schema.ObjectId,
        auto: true
    },
    nombre : {
        type: String,
        required: true
    },
    apellidos : {
        type: String,
        required: true
    },
    usuario : {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    date : {
        type: Date,
        default: Date.now
    },
    miLista : {
        type: Array,
        required: true
    }
    
});

usuarioSchema.statics.encrypt = async (password) =>{
    const salt = await bcryptjs.genSalt(10);
    return await bcryptjs.hash(password, salt);
}

usuarioSchema.statics.comparePassword = async (password, receivedPassword) =>{
    return await bcryptjs.compare(password, receivedPassword);
}

module.exports = mongoose.model("Usuario", usuarioSchema);