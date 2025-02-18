import express from 'express';
import usersController from '../../controllers/user/usersController.js';

const router = express.Router();

// Listado de propiedades
router.get('/properties', usersController);
// Creación de nueva propiedad
router.post('/properties', usersController);
// Detalle de una propiedad
router.get('/properties/:id', usersController);
// Cambio de estado de propiedad (disponible / no disponible)
router.patch('/properties/:id', usersController);
// Modificar una propiedad (dueño o admin) [EXTRA]
router.put('/properties/:id', usersController);
