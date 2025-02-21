// dependencias
import express from 'express';

// middlewares
import propertyExistsMiddleware from '../../middlewares/propertyExistsMiddleware.js';
import authUserMiddleware from '../../middlewares/authUserMiddleware.js';
import { fileUploadMiddleware } from '../middlewares/fileUploadMiddleware.js';
import authOwnerMiddleware from '../../middlewares/authOwnerMiddleware.js';

// controladores
import propertyDetailsController from '../../controllers/owner/propertyDetailsController.js';
import propertyController from '../../controllers/properties/propertyController.js';
import fileUploadController from '../controllers/owner/fileUploadController.js';

const router = express.Router();

// 09 Listado de propiedades ⛔
router.get('/properties');

// 10 Creación de nueva propiedad ✅
router.post('/properties', authUserMiddleware, propertyController);

// 11 Detalle de una propiedad ✅
router.get(
	'/properties/:id',
	propertyExistsMiddleware,
	propertyDetailsController
);

// 12 Cambio de estado de propiedad (disponible / no disponible) ✅
router.patch('/properties/:id', authUserMiddleware, propertyController);

// 13 Modificar una propiedad (dueño o admin) [EXTRA] ⛔
router.put('/properties/:id', authOwnerMiddleware, propertyController);

// 14 Ruta para subir imágenes y videos asociados a una propiedad
router.post(
	'/upload-files/:propertyId',
	fileUploadMiddleware,
	fileUploadController
);

export default router;
