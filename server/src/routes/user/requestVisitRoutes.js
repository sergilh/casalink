import express from 'express';
import requestVisitController from '../../controllers/user/requestVisitController.js';
import authUserMiddleware from '../../middlewares/authUserMiddleware.js';

const router = express.Router();

// Endpoint para solicitar una visita( requiere autenticación)
router.post('/request-visit', authUserMiddleware, requestVisitController);

export default router;
