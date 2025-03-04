// dependencias
import express from 'express';

// controladores
import usersInfoController from '../controllers/users/usersInfoController.js';
import usersLoginController from '../controllers/users/usersLoginController.js';
import usersRegisterController from '../controllers/users/usersRegisterController.js';
import sendRecoverPassMailController from '../controllers/users/sendRecoverPassMailController.js';
import validateUserController from '../controllers/users/validateUserController.js';
import changePasswordController from '../controllers/users/changePasswordController.js';
import usersPreviousRatingController from '../controllers/users/usersPreviousRatingsController.js';
import addReviewController from '../controllers/reviews/addReviewController.js';
import usersByIdController from '../controllers/users/usersByIdController.js';
import usersModificationController from '../controllers/users/usersModificationController.js';
import usersAvatarController from '../controllers/users/usersAvatarController.js';

// middlewares
import authUserMiddleware from '../middlewares/authUserMiddleware.js';
import userExistsMiddleware from '../middlewares/userExistsMiddleware.js';
import activeContractExists from '../middlewares/activeContractExists.js';
import noReviewExistsFromUser from '../middlewares/noReviewExistsFromUser.js';
import { avatarUploadMiddleware } from '../middlewares/avatarUploadMiddleware.js';

const router = express.Router();

// 01 POST	/api/users/register		Registro de usuarios
router.post('/users/register', usersRegisterController);

// 02 POST	/api/users/validate		Validación de usuario (email)
router.patch('/users/validate/', validateUserController);

// 03 POST	/api/users/login		Autenticación JWT
router.post('/users/login', usersLoginController);

// 04 GET	/api/users/password		Cambio de contraseña
router.get('/users/password/', sendRecoverPassMailController); // Revisar que se hará después

// 05 GET	/api/users/profile			Información de usuario
router.get('/users/profile', authUserMiddleware, usersInfoController);

// 06 GET	/api/users/:userId			Información de un usuario
router.get('/users/:userId', authUserMiddleware, usersByIdController);

// 07 PUT	/api/users/			Modificar usuario [EXTRA]
router.put('/users/', authUserMiddleware, usersModificationController);

// 08 Endpoint para cambiar contraseña
router.put(
	'/users/change-password',
	authUserMiddleware,
	changePasswordController
);

// 09 GET	/api/users/:id/reviews	Histórico de reseñas
router.get(
	'/users/:id/reviews',
	authUserMiddleware,
	userExistsMiddleware,
	usersPreviousRatingController
);

// 10 POST		/api/users/reviews		Enviar valoración
router.post(
	'/users/reviews/',
	authUserMiddleware,
	activeContractExists,
	noReviewExistsFromUser,
	addReviewController
);

// 11 PATCH	/api/users/avatar		Avatar del usuario
router.patch(
	'/users/avatar',
	authUserMiddleware,
	avatarUploadMiddleware,
	usersAvatarController
);

export default router;
