import express from 'express';
import usersController from '../../controllers/user/usersController.js';
import authAdminMiddleware from '../../middlewares/authAdminMiddleware.js';
import approvePropertyController from '../../controllers/admin/approvePropertyController.js';

const router = express.Router();

// Lista de usuarios (admin)
router.get('/admin/users', usersController);
// Gestionar usuarios (superadmin) [EXTRA]
router.put('/admin/users/:id', usersController);
// Aprobar propiedad (admin)
router.patch('/properties/:id', authAdminMiddleware, approvePropertyController);

export default router;
