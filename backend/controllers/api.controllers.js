'use strict'

var Pelicula = require('../models/Peliculas');
var Cuenta = require('../models/Cuenta');
var Usuario = require('../models/Usuario');

var validator = require('validator');
var jwt = require('jsonwebtoken');
var fs = require("fs");
var path = require("path");

var controller = {
    prueba: (req, res) => {
        res.send("Hello World");
    },
    getPeliculas: (req, res) => {
        const last = req.params.last;

        if(last){
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
            }).limit(6);
        }else{
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
        }
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
    searchPeliculas : (req,res) => {
        const search = req.params.search;

        Pelicula.find({
            "$or": [
                { "title": { "$regex": search, "$options": "i" } },
                { "year": { "$regex": search, "$options": "i" } }
            ]
        }).sort([['year', 'descending']]).exec((err, peliculas) => {
            if (err) {
                return res.status(500).send({
                    status: "error",
                    message: "Hay un error"
                });
            }

            if (!peliculas || peliculas.length <= 0) {
                return res.status(404).send({
                    status: "error",
                    message: "No existen peliculas con ese dato"
                });
            }

            return res.status(200).send({
                status: "success",
                peliculas
            });
        });
    },
    getImage : (req, res) => {
        var file = req.params.image;
        var path_file = './upload/peliculas/' + file;

        fs.exists(path_file, (exists) => {
            if (exists) {
                return res.sendFile(path.resolve(path_file));
            } else {
                return res.status(404).send({
                    status: "error",
                    message: "La imagen no existe"
                });
            }
        });
    },
    upload: (req, res) => {

        // Recoger el fichero de la peticion
        var file_name = 'Imagen no subida...';

        if (!req.files) {
            return res.status(404).send({
                status: "error",
                message: file_name
            });
        }

        // Conseguir el nombre y la extension
        var file_path = req.files.file0.path; //file0 es un nombre generico que le pondremos pq algunas librerias del frontend envian ese nombre
        var file_split = file_path.split("/");

        // Nombre del archivo
        var file_name = file_split[2];

        // Extension del fichero
        var extension_split = file_name.split(".");
        var file_ext = extension_split[1];


        // Comprobar la extension, solo imagenes, si es valida borrar el fichero
        if (file_ext != 'png' && file_ext != 'jpg' && file_ext != 'jpeg') {
            // borrar el archivo subido
            fs.unlink(file_path, (err) => {
                return res.status(200).send({
                    status: "error",
                    message: "La extension de la imagen no es valida"
                });
            });  //Borrar el fichero
        } else {
            // Sacando el id de la url
            var peliculaId = req.params.id;

            if (peliculaId) {
                // Buscar el articulo, asignarle el nombre de la imagen y actualizarlo
                Pelicula.findOneAndUpdate({ _id: peliculaId }, { image: file_name }, { new: true }, (err, pelicula) => {
                    if (err || !pelicula) {
                        return res.status(200).send({
                            status: "error",
                            message: "Error al guardar la imagen de la pelicula!!!"
                        });
                    }

                    return res.status(200).send({
                        status: "success",
                        pelicula
                    });
                });
            }else{  //En caso de que no sepa el id
                return res.status(200).send({
                    status: "success",
                    image: file_name
                });
            }

        }
    },
    // * CUENTAS
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
    getCuenta: (req, res) => {
        const cuentaId = req.params.id;

        Cuenta.findById(cuentaId, (err, cuenta) => {
            if(err){
                res.status(500).send({
                    status: "error",
                    message: "Hay un error!!!"
                });
            }

            if(!cuenta){
                res.status(404).send({
                    status: "error",
                    message: "No existe ese usuario"
                })
            }

            res.status(200).send({
                status: "success",
                message: cuenta
            })
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
    deleteCuenta: (req, res) => {
        const cuentaId = req.params.id;

        Cuenta.findByIdAndDelete(cuentaId, (err, cuenta) => {
            if (err || !cuenta) {
                return res.status(404).send({
                    status: "error",
                    message: "Hay un error al eliminar!!!"
                });
            }

            return res.status(200).send({
                status: "success",
                message: cuenta
            });
        });
    },
    // * USUARIOS
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
    },
    getUsuario : (req, res) => {
        const usuarioId = req.params.id;

        Usuario.findById(usuarioId, (err, usuario) => {
            if (err) {
                return res.status(500).send({
                    status: "error",
                    message: "Hay un error !!!"
                });
            }

            if (!usuario) {
                return res.status(404).send({
                    status: "error",
                    message: "No existe ese usuario!!!"
                });
            }

            return res.status(200).send({
                status: "success",
                message: usuario
            });
        })
    },
    deleteUsuario : (req, res) => {
        const usuarioId = req.params.id;

        Usuario.findByIdAndDelete(usuarioId,(err, usuario) => {
            if(err || !usuario){
                return res.status(404).send({
                    status: "error",
                    message: "Hay un error al eliminar!!!"
                });
            }

            return res.status(200).send({
                status: "success",
                message: usuario
            });

        });
    },
    updateUsuario : (req, res) => {
        const usuarioId = req.params.id;
        const body = req.body;

        Usuario.findByIdAndUpdate(usuarioId, body, (err, usuario) => {
            if(err || !usuario){
                return res.status(404).send({
                    status: "error",
                    message: "Hay un error al modificar!!!"
                });
            }

            return res.status(200).send({
                status: "success",
                message: usuario
            });
        });
    }
}

module.exports = controller;