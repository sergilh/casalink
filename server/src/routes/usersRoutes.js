// dependencias
import express from 'express';

// controladores
import usersController from '../controllers/users/usersController.js';
import usersInfoController from '../controllers/users/usersInfoController.js';
import usersLoginController from '../controllers/users/usersLoginController.js';
import usersRegisterController from '../controllers/users/usersRegisterController.js';
import sendRecoverPassMailController from '../controllers/users/sendRecoverPassMailController.js';
import validateUserController from '../controllers/users/validateUserController.js';
//import changePasswordController from '../controllers/users/changePasswordController.js';
import usersPreviousRatingController from '../controllers/users/usersPreviousRatingsController.js';
import addReviewController from '../controllers/reviews/addReviewController.js';

// middlewares
import authUserMiddleware from '../middlewares/authUserMiddleware.js';
import userExistsMiddleware from '../middlewares/userExistsMiddleware.js';

const router = express.Router();

// 01 POST	/api/users/register		Registro de usuarios ✅
router.post('/users/register', usersRegisterController);

// 02 POST	/api/users/validate		Validación de usuario (email) ✅
router.patch('/users/validate/:email', validateUserController);

// 03 POST	/api/users/login		Autenticación JWT ✅
router.post('/users/login', usersLoginController);

// 04 PATCH	/api/users/password		Cambio de contraseña ✅
router.patch('/users/password/:id', sendRecoverPassMailController);
// ✅ Endpoint para cambiar contraseña
// router.put(	'/users/change-password', authUserMiddleware, changePasswordController);
// revisar cuando se usa

// 05 GET	/api/users/:id			Información de usuario ✅
router.get('/profile', authUserMiddleware, usersInfoController);

// 06 PUT	/api/users/:id			Modificar usuario [EXTRA] ⛔
router.put('/users/:id', authUserMiddleware, usersController);

// 07 GET	/api/users/:id/reviews	Histórico de reseñas ⛔
router.get(
	'/users/:id/reviews',
	userExistsMiddleware,
	usersPreviousRatingController
);

// 08 POST		/api/users/reviews		Enviar valoración ✅
router.post('/users/reviews', authUserMiddleware, addReviewController);

export default router;
