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

const router = express.Router();

// 15 Lista de solicitudes de alquiler ✅
router.get('/contracts/', authUserMiddleware, contractsController);
// Ruta GET para obtener las solicitudes de alquiler ✅
//router.get('/requests', authUserMiddleware, requestController);
// creo que esta repetida

// 16 Solicitud de visita (contrato valido) ✅
router.post('/contracts', authUserMiddleware, requestVisitController);

// 17 Aceptar/Rechazar solicitud (dueño) ✅
router.patch(
	'/contracts/:id/status',
	authUserMiddleware,
	updateContractStatusController
);

// 18	POST	/api/contracts/:id/blocks/	Bloquear usuario de propiedad [EXTRA] ⛔
router.post(
	'/contracts/:id/blocks/',
	authUserMiddleware,
	contractExistMiddleware,
	blockUserController
);

router.post(
	'/contracts/:id/blocks/',
	authUserMiddleware,
	contractExistMiddleware,
	authOwnerMiddleware,
	blockUserController
);

export default router;
