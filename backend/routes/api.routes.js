'use strict'

const { Router } = require('express');

const router = Router();

const controllers = require('../controllers/api.controllers');

var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './upload/peliculas'}); //En este caso estamos configurando donde va a guardar los archivos

// * Ruta de prueba
router.get("/", controllers.prueba);

// * Rutas de peliculas
router.get("/peliculas/:last?" , controllers.getPeliculas); //Obtener todas las peliculas
router.get("/pelicula/:id", controllers.getPelicula); //Una pelicula
router.get("/peliculasTipo/:tipo", controllers.getPeliculasTipo); //Todas las peliculas de un tipo
router.get("/peliculasNovedad", controllers.getPeliculasNovedades); //Todas las novedades
router.post("/peliculas" ,controllers.newPelicula); //Nueva pelicula
router.delete("/peliculas/:id" ,controllers.deletePelicula); //Eliminar pelicula
router.put("/peliculas/:id" ,controllers.updatePelicula); //Modificar pelicula
router.get("/search-peliculas/:search" ,controllers.searchPeliculas); //Buscar peliculas
router.get("/getImage/:image" , controllers.getImage); //Devolver una imagen
router.post('/upload-image/:id?', md_upload, controllers.upload); //Subir una imagen

// * Rutas cuentas
router.get("/cuentas" , controllers.getCuentas); //Obtener todos las cuentas
router.post("/cuenta" , controllers.getCuenta); //Obtener una cuenta
router.post("/cuentas" , controllers.newCuenta); //Nuevo cuenta
router.put("/cuentas/:id" , controllers.updateCuenta); //Modificar cuenta
router.delete("/cuentas/:id" , controllers.deleteCuenta); //Eliminar cuenta
router.post("/comprobar-cuenta" , controllers.comprobarCuenta); //Comprobar cuenta

// * Rutas usuarios
router.post("/usuario" , controllers.newUsuario); //Crear un usuario
router.get("/usuarios" , controllers.getUsuarios); //Mostrar todos los usuarios
router.get("/usuario/:id" , controllers.getUsuario); //Mostrar un usuario
router.delete("/usuario/:id" , controllers.deleteUsuario); //Eliminar un usuario
router.put("/usuario/:id" , controllers.updateUsuario); //Modificar un usuario


module.exports = router;