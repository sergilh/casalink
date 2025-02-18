import express from 'express';
import { fileUploadMiddleware } from '../../middlewares/fileUploadMiddleware.js';
import fileUploadController from '../../controllers/owner/fileUploadController.js';

const router = express.Router();

// Ruta para subir imágenes y videos asociados a una propiedad
router.post('/upload-files/:propertyId', fileUploadMiddleware, fileUploadController);

export default router;
