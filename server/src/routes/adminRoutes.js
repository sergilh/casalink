// dependencias
import express from 'express';

// controladores
import approvePropertyController from '../controllers/admin/approvePropertyController.js';
import removeReviewController from '../controllers/reviews/removeReviewController.js';
import usersListController from '../controllers/admin/usersListController.js';
import updateUserRoleController from '../controllers/admin/updateUserRoleController;.js';
import updatePropertyController from '../controllers/properties/updatePropertyController.js';

// middlewares
import {
	authAdminMiddleware,
	authSuperadminMiddleware,
	propertyExistsMiddleware,
	validateRequest,
	reviewExistMiddleware,
} from '../middlewares/index.js';

// Validadores Joi
import { updatePropertySchema } from '../utils/validators.js';

const router = express.Router();

// 22	GET		/api/admin/users		Lista de usuarios ✅
router.get('/admin/users/', authAdminMiddleware, usersListController);

// 23 Gestionar usuarios (superadmin) [EXTRA] ✅
router.patch(
	'/admin/users/:userId/:newRole',
	authSuperadminMiddleware,
	updateUserRoleController
);

// 24 Aprobar/Rechazar propiedad ✅
router.patch(
	'/admin/properties/:propertyId/:action',
	authAdminMiddleware,
	approvePropertyController
);

// 25 Modificar una propiedad (admin) [EXTRA] ✅
router.put(
	'/admin/properties/:propertyId',
	authAdminMiddleware,
	propertyExistsMiddleware,
	validateRequest(updatePropertySchema),
	updatePropertyController
);

// 26	PATCH	/api/admin/review/:reviewId	Gestionar reseñas (admin) [EXTRA] ⛔
router.patch(
	'/admin/review/:reviewId',
	authAdminMiddleware,
	reviewExistMiddleware,
	removeReviewController
);

export default router;
