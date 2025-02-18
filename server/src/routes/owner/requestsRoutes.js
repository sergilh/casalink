import express from 'express';
import { requestController } from '../../controllers/owner/requestController.js';
import propertyDetailsController from '../../controllers/owner/propertyDetailsController.js';
import propertyExistsMiddleware from '../../middlewares/propertyExistsMiddleware.js';
/*TO DO: import authMiddleware from lo que sea*/

const router = express.Router();

// Ruta GET para obtener las solicitudes de alquiler
router.get(
	'/requests',
	/*TO DO: authMiddleware, cuando lo tengamos descomentamos*/ requestController
);
//Ruta GET para obtener los detalles del alquiler
router.get(
	'/properties/:propertyId',
	propertyExistsMiddleware,
	propertyDetailsController
);

export default router;
