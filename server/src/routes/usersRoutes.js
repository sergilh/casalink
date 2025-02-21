// dependencias
import express from 'express';

// controladores
import usersController from '../controllers/user/usersController.js';
import usersInfoController from '../controllers/user/usersInfoController.js';
import usersLoginController from '../controllers/user/usersLoginController.js';
import usersRegisterController from '../controllers/user/usersRegisterController.js';
import sendRecoverPassMailController from '../controllers/user/sendRecoverPassMailController.js';
import validateUserController from '../controllers/user/validateUserController.js';
//import changePasswordController from '../controllers/user/changePasswordController.js';
import usersPreviousRatingController from '../controllers/user/usersPreviousRatingsController.js';

// middlewares
import authUserMiddleware from '../middlewares/authUserMiddleware.js';
import userExistsMiddleware from '../middlewares/userExistsMiddleware.js';

const router = express.Router();

// POST		/api/users/register		Registro de usuarios ✅
router.post('/users/register', usersRegisterController);

// POST		/api/users/validate		Validación de usuario (email) ✅
router.patch('/users/validate/:email', validateUserController);

// POST		/api/users/login		Autenticación JWT ✅
router.post('/users/login', usersLoginController);

// PATCH	/api/users/password		Cambio de contraseña ✅
router.patch('/users/password', sendRecoverPassMailController);

// GET		/api/users/:id			Información de usuario ✅
// router.get('/users/:id', usersController); esta es la que actualmente es '/profile'
router.get('/profile', authUserMiddleware, usersInfoController);

// PUT		/api/users/:id			Modificar usuario [EXTRA] ⛔
router.put('/users/:id', usersController);

// GET		/api/users/:id/reviews	Histórico de reseñas ⛔
router.get(
	'/users/:id/reviews',
	userExistsMiddleware,
	usersPreviousRatingController
);

// POST		/api/users/reviews		Enviar valoración ⛔
router.post('/users/reviews', usersController);

// POST		/api/users/blocks/:id	Bloquear propiedad [EXTRA] ⛔
router.post('/users/blocks/:id', usersController);

// GET		/api/users/blocks/		Lista de usuarios bloqueados [EXTRA] ⛔
router.get('/users/blocks/', usersController);

// ✅ Endpoint para obtener la lista de usuarios
// router.get('/users', usersController);
// Pasar a adminRoutes.js

// ✅ Endpoint para cambiar contraseña
// router.put(	'/users/change-password', authUserMiddleware, changePasswordController);
// revisar cuando se usa

export default router;
