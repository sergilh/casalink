import express from 'express';
import usersController from '../../controllers/user/usersController.js';

import authUserMiddleware from '../../middlewares/authUserMiddleware.js';

const router = express.Router();

// Endpoint para obtener la lista de usuarios
//authUserMiddleware para obtener el token y verificarlo
router.get('/users', authUserMiddleware, usersController);

export default router;
