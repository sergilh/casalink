import express from 'express';
import usersController from '../../controllers/user/usersController.js';
import contractsController from '../../controllers/contracts/contractsController.js';
import authUserMiddleware from '../../middlewares/authUserMiddleware.js';
import updateContractStatusController from '../../controllers/contracts/updateContractStatusController.js';

const router = express.Router();

// Solicitud de visita (contrato valido)
router.post('/contracts', usersController);
// Lista de solicitudes de alquiler
router.get('/contracts/', authUserMiddleware, contractsController);
// Aceptar/Rechazar solicitud (dueño)
router.patch('/contracts/:id', usersController);
// Endpoint para aceptar/rechazar una visita/alquiler (casero)
router.patch(
	'/contracts/:contractId/status',
	authUserMiddleware,
	updateContractStatusController
);

export default router;
