// dependencias
import express from 'express';

// controladores
import usersController from '../controllers/user/usersController.js';
import contractsController from '../controllers/contracts/contractsController.js';
import requestVisitController from '../../controllers/user/requestVisitController.js';
import blockUserController from '../../controllers/owner/blockUserController.js';
//import { requestController } from '../controllers/owner/requestController.js';

// middlewares
import authUserMiddleware from '../middlewares/authUserMiddleware.js';
import ownerMiddleware from '../middlewares/ownerMiddleware.js';

const router = express.Router();

// 15 Lista de solicitudes de alquiler ✅
router.get('/contracts/', authUserMiddleware, contractsController);
// Ruta GET para obtener las solicitudes de alquiler ✅
//router.get('/requests', authUserMiddleware, requestController);
// creo que esta repetida

// 16 Solicitud de visita (contrato valido) ✅
router.post('/contracts', authUserMiddleware, requestVisitController);

// 17 Aceptar/Rechazar solicitud (dueño) ⛔
router.patch('/contracts/:id', usersController);

// 18	POST	/api/contracts/:id/blocks/	Bloquear usuario de propiedad [EXTRA] ⛔
router.post('/contracts/:id/blocks/', ownerMiddleware, blockUserController);

export default router;
