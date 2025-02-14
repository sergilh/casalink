import express from 'express';
import usersController from '../../controllers/user/usersController.js';
import authUserMiddleware from '../../middlewares/authUserMiddleware.js';
import getUserInfo from '../../controllers/user/usersInfoController.js';

const router = express.Router();

// Endpoint para obtener la lista de usuarios
router.get('/users', usersController);

//Endpoint protegido para obtener la información del usuario autenticado
router.get('/profile', authUserMiddleware, getUserInfo);

export default router;
