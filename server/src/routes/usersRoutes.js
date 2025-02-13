import express from 'express';
import { getUsers } from '../controllers/usersController.js';

const router = express.Router();

// Endpoint para obtener la lista de usuarios
router.get('/users', getUsers);

export default router;
