'use strict'

const { Router } = require('express');

const router = Router();

const controllers = require('../controllers/api.controllers');

// * Ruta de prueba
router.get("/", controllers.prueba);

// * Rutas de peliculas
router.get("/peliculas" , controllers.getPeliculas); //Obtener todas las peliculas
router.get("/pelicula/:id", controllers.getPelicula); //Una pelicula
router.post("/peliculas" ,controllers.newPelicula); //Nueva pelicula
router.delete("/peliculas/:id" ,controllers.deletePelicula); //Eliminar pelicula
router.put("/peliculas/:id" ,controllers.updatePelicula); //Modificar pelicula

module.exports = router;