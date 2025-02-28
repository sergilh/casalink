// dependencias
import express from 'express';

// controladores
import contractsController from '../controllers/contracts/contractsController.js';
import { requestVisitController } from '../controllers/contracts/requestVisitController.js';
import blockUserController from '../controllers/contracts/blockUserController.js';
import updateContractStatusController from '../controllers/contracts/updateContractStatusController.js';

// middlewares
import authUserMiddleware from '../middlewares/authUserMiddleware.js';
import authOwnerMiddleware from '../middlewares/authOwnerMiddleware.js';
import contractExistMiddleware from '../middlewares/contractExistMiddleware.js';
import propertyExistsMiddleware from '../middlewares/propertyExistsMiddleware.js';
import validateRequest from '../middlewares/validateRequest.js';

// Validadores Joi
import { searchContractSchema } from '../utils/validators.js';

const router = express.Router();

// 18 Lista de solicitudes de alquiler ✅
router.get(
	`/contracts/`,
	authUserMiddleware,
	validateRequest(searchContractSchema),
	contractsController
);

// 19 Solicitud de visita (contrato valido) ✅
router.post(
	'/contracts/:propertyId',
	authUserMiddleware,
	propertyExistsMiddleware,
	requestVisitController
);

// 20 Aceptar/Rechazar solicitud (dueño) ✅
router.patch(
	'/contracts/:contractId/:status',
	authUserMiddleware,
	contractExistMiddleware,
	authOwnerMiddleware,
	updateContractStatusController
);

// 21	POST	/api/contracts/:id/blocks/	Bloquear usuario de propiedad [EXTRA] ✅
router.post(
	'/contracts/:contractId/blocks/',
	authUserMiddleware,
	contractExistMiddleware,
	authOwnerMiddleware,
	blockUserController
);

export default router;
