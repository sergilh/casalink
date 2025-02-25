// dependencias
import express from 'express';

// Validadores Joi
import { propertyApprovalSchema } from '../utils/validators.js';

// controladores
import usersController from '../controllers/users/usersController.js';
import approvePropertyController from '../controllers/admin/approvePropertyController.js';
import propertyController from '../controllers/properties/propertyController.js';
import removeReviewController from '../controllers/reviews/removeReviewController.js';

// middlewares
import authAdminMiddleware from '../middlewares/authAdminMiddleware.js';
import authSuperadminMiddleware from '../middlewares/authSuperadminMiddleware.js';
import validateRequest from '../middlewares/validateRequest.js';

const router = express.Router();

// 19	GET		/api/admin/users		Lista de usuarios ✅
router.get('/admin/users', authAdminMiddleware, usersController);

// 20 Gestionar usuarios (superadmin) [EXTRA] ⛔
router.put('/admin/users/:id', authSuperadminMiddleware, usersController);

// 21 Aprobar propiedad ✅
router.patch(
	'/admin/properties/:propertyId/:action',
	authAdminMiddleware,
	validateRequest(propertyApprovalSchema),
	approvePropertyController
);

// 22 Modificar una propiedad (dueño o admin) [EXTRA] ⛔
router.put('/admin/properties/:id', authAdminMiddleware, propertyController);

// 23	PATCH	/api/admin/review/:id/	Gestionar reseñas (admin) [EXTRA] ⛔
router.patch('/admin/review/:id', authAdminMiddleware, removeReviewController);

export default router;
