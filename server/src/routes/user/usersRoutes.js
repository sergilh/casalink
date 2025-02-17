import express from 'express';
import usersController from '../../controllers/user/usersController.js';
import getUserInfo from '../../controllers/user/getUserInfo.js';
import authUserMiddleware from '../../middlewares/authUserMiddleware.js';
import usersLoginController from '../../controllers/user/usersLoginController.js';
import sendRecoverPassMailController from '../../controllers/user/sendRecoverPassMailController.js';

const router = express.Router();

// Endpoint para obtener la lista de usuarios
router.get('/users', usersController);

//Endpoint para loguearse
router.post('/users/login', usersLoginController);

router.patch('/users/password', sendRecoverPassMailController);

//Endpoint protegido para obtener la información del usuario autenticado
//authUserMiddleware para obtener el token y verificarlo
router.get('/profile', authUserMiddleware, getUserInfo);

export default router;
