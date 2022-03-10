'use strict'

var Pelicula = require('../models/Peliculas');

var controller = {
    prueba: (req,res) => {
        res.send("Hello World");
    },
    getPeliculas: (req,res) => {
        Pelicula.find((err, peliculas) => {
            if(!peliculas){
                return res.status(404).send({
                    status : "error",
                    messsage : "No hay películas actualmente"
                });
            }

            if(err){
                return res.status(500).send({
                    status : "error",
                    messsage : "Ha habido un error"
                });
            }

            return res.status(200).send({
                status : "success",
                messsage : peliculas
            });
        });
    },
    getPelicula: (req,res) => {
        const id = req.params.id;

        Pelicula.findById(id,(err, pelicula) => {
            if(!pelicula){
                return res.status(404).send({
                    status : "error",
                    messsage : "No existe esa pelicula"
                });
            }

            if(err){
                return res.status(500).send({
                    status : "error",
                    messsage : "Ha habido un error"
                });
            }

            return res.status(200).send({
                status : "success",
                messsage : pelicula
            });
        });
    },
    newPelicula: (req,res) => {
        var body = req.body;
        var newPelicula = Pelicula();

        newPelicula.title = body.title;
        newPelicula.year = body.year;

        newPelicula.save((err, pelicula) => {
            if(err || !pelicula){
                return res.status(404).send({
                    status: "error",
                    message: "No se ha podido guardar la pelicula"
                });
            }

            return res.status(200).send({
                status: "success",
                message: pelicula
            });
        })
    },
    deletePelicula: (req,res) => {
        const id = req.params.id;

        Pelicula.findByIdAndDelete(id, (err, pelicula) => {
            if(err || !pelicula){
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
    updatePelicula: (req,res) => {
        const body = req.body;
        const id = req.params.id;

        Pelicula.findByIdAndUpdate(id, body,(err, pelicula) => {
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

    }
}

module.exports = controller;