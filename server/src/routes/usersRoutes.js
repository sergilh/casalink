import express from 'express';
import { getUsers } from '../controllers/usersController.js';

import authUserMiddleware from '../middlewares/authUserMiddleware.js';

const router = express.Router();

// Endpoint para obtener la lista de usuarios
//authUserMiddleware para obtener el token y verificarlo
router.get('/users', authUserMiddleware, getUsers);

export default router;
