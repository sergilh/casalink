import express from 'express';
import usersController from '../../controllers/user/usersController.js';

const router = express.Router();

// Endpoint para obtener la lista de usuarios
router.get('/users', usersController);

export default router;
