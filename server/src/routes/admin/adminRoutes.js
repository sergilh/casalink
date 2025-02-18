import express from 'express';
import usersController from '../../controllers/user/usersController.js';

const router = express.Router();

// Lista de usuarios (admin)
router.get('/admin/users', usersController);
// Gestionar usuarios (superadmin) [EXTRA]
router.put('/admin/users/:id', usersController);
// Aprobar propiedad (admin)
router.patch('/admin/properties/:id', usersController);
