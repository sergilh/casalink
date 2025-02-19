import express from 'express';
import authUserMiddleware from '../../middlewares/authUserMiddleware.js';
import addReviewController from '../../controllers/reviews/addReviewController.js';

const router = express.Router();

// Endpoint para agregar una valoración
router.post('/reviews', authUserMiddleware, addReviewController);

export default router;
