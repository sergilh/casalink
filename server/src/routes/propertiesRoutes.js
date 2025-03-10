import express from 'express';
import getPool from '../db/getPool.js';

// Middlewares
import propertyExistsMiddleware from '../middlewares/propertyExistsMiddleware.js';
import authUserMiddleware from '../middlewares/authUserMiddleware.js';
import checkPropertyOwnerOrAdmin from '../middlewares/checkPropertyOwnerOrAdmin.js';
import { fileUploadMiddleware } from '../middlewares/fileUploadMiddleware.js';
import validateRequest from '../middlewares/validateRequest.js';

// Controladores
import propertyDetailsController from '../controllers/properties/propertyDetailsController.js';
import propertyController from '../controllers/properties/propertyController.js';
import fileUploadController from '../controllers/properties/fileUploadController.js';
import propertyStatusController from '../controllers/properties/propertyStatusController.js';
import getPropertiesController from '../controllers/properties/getPropertiesController.js';
import updatePropertyController from '../controllers/properties/updatePropertyController.js';

// Validadores Joi
import {
	propertySchema,
	updatePropertySchema,
	searchPropertySchema,
	propertyStatusSchema,
} from '../utils/validators.js';

const router = express.Router();
const db = await getPool();

// 2.12 Listado de propiedades ✅ (Con validación)
router.get(
	'/properties',
	validateRequest(searchPropertySchema),
	getPropertiesController
);

// 2.13 Creación de nueva propiedad ✅ (Con validación)
router.post(
	'/properties',
	authUserMiddleware,
	fileUploadMiddleware, // 1) Parsea multipart/form-data (campos + archivos)
	validateRequest(propertySchema), // 2) Valida req.body con Joi
	propertyController // 3) Controlador final
);

// 2.14 Detalle de una propiedad ✅
router.get(
	'/properties/:propertyId',
	propertyExistsMiddleware,
	propertyDetailsController
);

// 2.15 Cambio de estado de propiedad (disponible / no disponible) ✅ (Con validación)
router.patch(
	'/properties/:propertyId',
	authUserMiddleware,
	propertyExistsMiddleware,
	checkPropertyOwnerOrAdmin,
	validateRequest(propertyStatusSchema),
	propertyStatusController
);

// 2.16 Modificar una propiedad (solo dueño) ✅ (Con validación)
router.put(
	'/properties/:propertyId',
	authUserMiddleware,
	propertyExistsMiddleware,
	checkPropertyOwnerOrAdmin,
	fileUploadMiddleware, // Permitir actualizar imagen
	validateRequest(updatePropertySchema),
	updatePropertyController
);

/* YA NO SE NECESITA PARA SUBIR IMÁGENES CUANDO SE CREA UNA PROPIEDAD
PERO LO DEJO POR SI ACASO SE NECESITA PARA SUBIR IMAGENES DE PROPIEDADES YA EXISTENTES*/

// 2.17 Ruta para subir imágenes y videos asociados a una propiedad ✅
router.post(
	'/properties/:propertyId/upload',
	authUserMiddleware,
	propertyExistsMiddleware,
	checkPropertyOwnerOrAdmin,
	fileUploadMiddleware,
	(req, res, next) => {
		console.log('🚀 La ruta ha llegado hasta fileUploadController');
		setTimeout(() => next(), 100); // Agregamos un pequeño retraso antes de llamar a next()
	},
	fileUploadController
);

// 2.18 Obtener todas las propiedades de un usuario
router.get(
	'/users/:userId/properties',
	authUserMiddleware,
	async (req, res) => {
		const { userId } = req.params;

		try {
			const [properties] = await db.query(
				'SELECT * FROM properties WHERE ownerId = ?',
				[userId]
			);

			if (properties.length === 0) {
				return res.status(404).json({
					error: 'No se encontraron propiedades para este usuario',
				});
			}

			res.json({ properties });
		} catch (error) {
			console.error(error);
			res.status(500).json({
				error: 'Error obteniendo propiedades del usuario',
			});
		}
	}
);

export default router;
