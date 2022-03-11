'use strict'

var Pelicula = require('../models/Peliculas');
var Usuario = require('../models/Usuarios');

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
    getUsuarios: (req, res) => {
        Usuario.find((err, usuarios) => {
            if (err) {
                return res.status(500).send({
                    status: "error",
                    message: "Ha habido un error"
                });
            }

            if (!usuarios) {
                return res.status(404).send({
                    status: "error",
                    message: "No hay usuarios"
                });
            }

            return res.status(200).send({
                status: "success",
                usuarios
            });
        });
    },
    newUsuario: async(req, res) => {
        const body = req.body;

        try {

            var validate_usuario = !validator.isEmpty(body.usuario);
            var validate_password = !validator.isEmpty(body.password);
            var validate_email = (!validator.isEmpty(body.email) && validator.isEmail(body.email));
            // var validate_miLista = !validator.isEmpty(body.miLista);

        } catch (error) {
            res.status(404).send({
                status: "error",
                message: "Faltan datos por enviar"
            })
        }


        if (validate_usuario && validate_password && validate_email) {

            const newUsuario = new Usuario({usuario: body.usuario, password: await Usuario.encrypt(body.password), email: body.email, miLista: body.miLista});

            res.status(200).send({
                status: "success",
                message: newUsuario
            });

        } else {

            res.status(404).send({
                status: "error",
                message: "Los datos no son validos;"
            });

        }


    }
}

module.exports = controller;