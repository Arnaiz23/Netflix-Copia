'use strict'

var Pelicula = require('../models/Peliculas');
var Cuenta = require('../models/Cuenta');
var Usuario = require('../models/Usuario');

var validator = require('validator');
var jwt = require('jsonwebtoken');

var controller = {
    prueba: (req, res) => {
        res.send("Hello World");
    },
    getPeliculas: (req, res) => {
        Pelicula.find((err, peliculas) => {
            if (!peliculas) {
                return res.status(404).send({
                    status: "error",
                    messsage: "No hay películas actualmente"
                });
            }

            if (err) {
                return res.status(500).send({
                    status: "error",
                    messsage: "Ha habido un error"
                });
            }

            return res.status(200).send({
                status: "success",
                messsage: peliculas
            });
        });
    },
    getPelicula: (req, res) => {
        const id = req.params.id;

        Pelicula.findById(id, (err, pelicula) => {
            if (!pelicula) {
                return res.status(404).send({
                    status: "error",
                    messsage: "No existe esa pelicula"
                });
            }

            if (err) {
                return res.status(500).send({
                    status: "error",
                    messsage: "Ha habido un error"
                });
            }

            return res.status(200).send({
                status: "success",
                messsage: pelicula
            });
        });
    },
    newPelicula: (req, res) => {
        var body = req.body;

        try {

            var validate_title = !validator.isEmpty(body.title);
            var validate_year = !validator.isEmpty(body.year);
            var validate_informacion = !validator.isEmpty(body.informacion);
            // var validate_generos = !validator.isEmpty(body.generos);
            var validate_duracion = !validator.isEmpty(body.duracion);

        } catch (error) {
            return res.status(404).send({
                status: "error",
                message: 'Faltan datos por enviar !!!'
            });
        }

        if (validate_title && validate_year && validate_informacion && validate_duracion) {
            var newPelicula = Pelicula();

            newPelicula.title = body.title;
            newPelicula.year = body.year;
            newPelicula.informacion = body.informacion;
            newPelicula.generos = body.generos;
            newPelicula.duracion = body.duracion;

            newPelicula.save((err, pelicula) => {
                if (err || !pelicula) {
                    return res.status(404).send({
                        status: "error",
                        message: "No se ha podido guardar la pelicula"
                    });
                }

                return res.status(200).send({
                    status: "success",
                    message: pelicula
                });
            });

        } else {
            return res.status(404).send({
                status: "error",
                message: 'Los datos no son validos'
            });
        }

    },
    deletePelicula: (req, res) => {
        const id = req.params.id;

        Pelicula.findByIdAndDelete(id, (err, pelicula) => {
            if (err || !pelicula) {
                return res.status(404).send({
                    status: "error",
                    message: "No se ha podido borrar la pelicula"
                });
            }

            return res.status(200).send({
                status: "success",
                message: pelicula
            });
        });
    },
    updatePelicula: (req, res) => {
        const body = req.body;
        const id = req.params.id;

        Pelicula.findByIdAndUpdate(id, body, (err, pelicula) => {
            if (err) {
                return res.status(500).send({
                    status: "error",
                    message: "Error al actualizar"
                });
            }

            if (!pelicula) {
                return res.status(404).send({
                    status: "error",
                    message: "No existe ese producto"
                });
            }

            return res.status(200).send({
                status: "success",
                pelicula
            });
        })

    },
    getCuentas: (req, res) => {
        Cuenta.find((err, cuentas) => {
            if (err) {
                return res.status(500).send({
                    status: "error",
                    message: "Ha habido un error"
                });
            }

            if (!cuentas) {
                return res.status(404).send({
                    status: "error",
                    message: "No hay cuentas"
                });
            }

            return res.status(200).send({
                status: "success",
                cuentas
            });
        });
    },
    newCuenta: async (req, res) => {
        const body = req.body;

        try {

            var validate_password = !validator.isEmpty(body.password);
            var validate_email = (!validator.isEmpty(body.email) && validator.isEmail(body.email));
            var validate_facturacion = !validator.isEmpty(body.facturacion);

        } catch (error) {
            res.status(404).send({
                status: "error",
                message: "Faltan datos por enviar"
            })
        }


        if (validate_facturacion && validate_password && validate_email) {

            const newUsuario = new Cuenta({ usuarios: [], password: await Cuenta.encrypt(body.password), email: body.email, facturacion: body.facturacion });

            newUsuario.save((err, cuenta) => {

                if (err || !cuenta) {
                    return res.status(404).send({
                        status: "error",
                        message: "No se ha podido crear la cuenta"
                    });
                }

                return res.status(200).send({
                    status: "success",
                    message: cuenta
                });

            });

        } else {

            res.status(404).send({
                status: "error",
                message: "Los datos no son validos!!!"
            });

        }


    },
    // ! Falta por hacer
    updateCuenta: async (req, res) => {
        const usuarioId = req.params.id;
        const body = req.body;

        Cuenta.findByIdAndUpdate(usuarioId, body, (err, usuario) => {
            if (err || !usuario) {
                return res.status(404).send({
                    status: "error",
                    message: "Hay un error al actualizar!!!"
                });
            }

            return res.status(200).send({
                status: "success",
                message: usuario
            });

        })


    },
    // * Creacion de un usuario
    newUsuario: (req, res) => {
        const body = req.body;

        try {

            var validate_nombre = !validator.isEmpty(body.nombre);

        } catch (error) {
            return res.status(404).send({
                status: "error",
                message: "Faltan datos!!!"
            });
        }

        if (validate_nombre) {

            var usuario = new Usuario({ nombre: body.nombre, miLista: [] });

            usuario.save((err, usuario) => {
                if (err || !usuario) {

                    return res.status(404).send({
                        status: "error",
                        message: "No se ha podido crear el usuario"
                    });

                }

                return res.status(200).send({
                    status: "success",
                    message: usuario
                });

            });



        } else {

            return res.status(404).send({
                status: "error",
                message: "Los datos no son validos!!!"
            });

        }
    },
    getUsuarios: (req, res) => {
        Usuario.find((err, usuarios) => {
            if (err) {
                return res.status(500).send({
                    status: "error",
                    message: "Hay un error !!!"
                });
            }

            if (!usuarios) {
                return res.status(404).send({
                    status: "error",
                    message: "No hay usuarios!!!"
                });
            }

            return res.status(200).send({
                status: "success",
                message: usuarios
            });
        });
    }
}

module.exports = controller;