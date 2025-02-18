import express from 'express';
import usersController from '../../controllers/user/usersController.js';
import usersInfoController from '../../controllers/user/usersInfoController.js';
import authUserMiddleware from '../../middlewares/authUserMiddleware.js';
import usersLoginController from '../../controllers/user/usersLoginController.js';
import usersRegisterController from '../../controllers/user/usersRegisterController.js';
import sendRecoverPassMailController from '../../controllers/user/sendRecoverPassMailController.js';
import validateUserController from '../../controllers/user/validateUserController.js';

const router = express.Router();

// ✅ Endpoint para obtener la lista de usuarios
router.get('/users', usersController); // En que contexto se ejecuta?

// ✅ Endpoint para loguearse
router.post('/users/login', usersLoginController);

// ✅ Endpoint para recuperar contraseña
router.patch('/users/password', sendRecoverPassMailController);

// ✅ Endpoint para verificar usuario por email
router.patch('/users/validate/:email', validateUserController);

// ✅ Endpoint protegido para obtener la información del usuario autenticado
router.get('/profile', authUserMiddleware, usersInfoController);

// ✅ Registro de usuarios
router.post('/users/register', usersRegisterController);

// Información de usuario
// router.get('/users/:id', usersController); esta es la que actualmente es '/profile'

// Modificar usuario [EXTRA]
router.put('/users/:id', usersController);

// Histórico de reseñas
router.get('/users/:id/reviews', usersController);

// Enviar valoración
router.post('/users/reviews', usersController);

export default router;