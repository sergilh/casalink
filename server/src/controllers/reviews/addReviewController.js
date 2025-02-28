import addReviewModel from '../../models/reviews/addReviewModel.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';
import sendReviewNotificationModel from '../../models/notifications/sendReviewNotificationModel.js';
import getReviewModel from '../../models/reviews/getReviewModel.js';

const addReviewController = async (req, res, next) => {
	try {
		const { reviewedId, contractId, rating, comment } = req.body;
		const reviewerId = req.user.id; // Usuario autenticado que deja la reseña

		// Validaciones
		if (!reviewedId || !contractId || rating === undefined) {
			throw generateErrorUtil('Faltan datos requeridos', 400);
		}

		if (typeof rating !== 'number' || rating < 1 || rating > 5) {
			throw generateErrorUtil('La valoración debe ser entre 1 y 5', 400);
		}

		// Agregar la valoración en la base de datos
		const reviewId = await addReviewModel(
			reviewerId,
			reviewedId,
			contractId,
			rating,
			comment
		);

		const [[review]] = await getReviewModel(reviewId);

		// Enviar notificación a usuarios
		const results = await sendReviewNotificationModel(
			reviewerId,
			reviewedId,
			review.propertyTitle,
			review.tenantName,
			review.tenantId,
			review.ownerName,
			review.propertyId,
			rating
		);

		res.status(201).json({
			status: 'ok',
			message: 'Valoración enviada con éxito',
			data: { notifications: [results] },
		});
	} catch (error) {
		next(error);
	}
};

export default addReviewController;
