import express from 'express';
import usersController from '../../controllers/user/usersController.js';
import getUserInfo from '../../controllers/user/usersInfoController.js';

import authUserMiddleware from '../../middlewares/authUserMiddleware.js';

const router = express.Router();

// Endpoint para obtener la lista de usuarios
//authUserMiddleware para obtener el token y verificarlo
router.get('/users', authUserMiddleware, usersController);

//Endpoint protegido para obtener la información del usuario autenticado
router.get('/profile', authUserMiddleware, getUserInfo);

export default router;
