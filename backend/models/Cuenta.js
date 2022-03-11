'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const bcryptjs = require("bcryptjs");

var Usuario = require('./Usuario');

var cuentaSchema = new Schema({
    _id: {
        type: Schema.ObjectId,
        auto: true
    },
    usuarios: [
        {
            type: Schema.Types.ObjectId,
            ref: "Usuario"
        }
    ],
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    facturacion: {
        type: String,
        required: true
    }

});

cuentaSchema.statics.encrypt = async (password) => {
    const salt = await bcryptjs.genSalt(10);
    return await bcryptjs.hash(password, salt);
}

cuentaSchema.statics.comparePassword = async (password, receivedPassword) => {
    return await bcryptjs.compare(password, receivedPassword);
}

module.exports = mongoose.model("Cuentas", cuentaSchema);