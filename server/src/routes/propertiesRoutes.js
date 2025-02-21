// dependencias
import express from 'express';

// middlewares
import propertyExistsMiddleware from '../../middlewares/propertyExistsMiddleware.js';
import authUserMiddleware from '../../middlewares/authUserMiddleware.js';

// controladores
import propertyDetailsController from '../../controllers/owner/propertyDetailsController.js';
import propertyController from '../../controllers/properties/propertyController.js';

const router = express.Router();

// Listado de propiedades
router.get('/properties');

// Creación de nueva propiedad ✅
router.post('/properties', authUserMiddleware, propertyController);

// Detalle de una propiedad
router.get(
	'/properties/:propertyId',
	propertyExistsMiddleware,
	propertyDetailsController
);

// Cambio de estado de propiedad (disponible / no disponible)
router.patch('/properties/:id');

// Modificar una propiedad (dueño o admin) [EXTRA]
router.put('/properties/:id');

export default router;
