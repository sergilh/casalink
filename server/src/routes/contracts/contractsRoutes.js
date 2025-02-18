import express from 'express';
import usersController from '../../controllers/user/usersController.js';

const router = express.Router();
// Solicitud de visita (contrato valido)
router.post('/contracts', usersController);
// Lista de solicitudes de alquiler
router.get('/contracts', usersController);
// Aceptar/Rechazar solicitud (dueño)
router.patch('/contracts/:id', usersController);
