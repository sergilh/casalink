import express from 'express';
import usersController from '../../controllers/user/usersController.js';
import usersInfoController from '../../controllers/user/usersInfoController.js';
import authUserMiddleware from '../../middlewares/authUserMiddleware.js';
import usersLoginController from '../../controllers/user/usersLoginController.js';

const router = express.Router();

// Endpoint para obtener la lista de usuarios
//authUserMiddleware para obtener el token y verificarlo
router.get('/users', usersController);

//Endpoint para loguearse
router.post('/users/login', usersLoginController);

//Endpoint protegido para obtener la información del usuario autenticado
router.get('/profile', authUserMiddleware, usersInfoController);

export default router;
