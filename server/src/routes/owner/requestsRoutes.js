import express from 'express';
import { requestController } from '../../controllers/owner/requestController.js';
/*import authMiddleware from lo que sea*/

const router = express.Router();

// Ruta GET para obtener las solicitudes de alquiler
router.get(
    '/requests',
    /*authMiddleware, cuando lo tengamos descomentamos*/ requestController
);

export default router;
