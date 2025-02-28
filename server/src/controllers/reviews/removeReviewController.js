import removeReviewModel from '../../models/reviews/removeReviewModel.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';
import getReviewModel from '../../models/reviews/getReviewModel.js';
import sendReviewRejectionNotificationModel from '../../models/notifications/sendReviewRejectionNotificationModel.js';

const removeReviewController = async (req, res, next) => {
	try {
		const { reviewId } = req.params;
		const { reason } = req.body;

		const [[review]] = await getReviewModel(reviewId);

		// Enviar notificación a usuarios
		const results = await sendReviewRejectionNotificationModel(
			review.propertyId,
			review.propertyTitle,
			review.tenantId,
			review.tenantName,
			review.ownerName,
			review.reviewerId,
			review.reviewedId,
			reason
		);

		// Eliminar la reseña
		const [results2] = await removeReviewModel(reviewId, reason);

		if (results2[0] === 0) {
			throw generateErrorUtil('No se pudo eliminar la reseña', 400);
		}

		res.status(201).json({
			status: 'ok',
			message: 'Valoración enviada con éxito',
			data: { notifications: [results] },
		});
	} catch (error) {
		next(error);
	}
};

export default removeReviewController;
