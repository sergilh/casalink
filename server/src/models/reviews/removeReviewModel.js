import getPool from '../../db/getPool.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';
import sendReviewRejectionNotificationModel from '../notifications/sendReviewRejectionNotificationModel.js';
import getReviewModel from './getReviewModel.js';

const removeReviewModel = async (reviewId, reason) => {
	const pool = await getPool();

	const query = `
		DELETE FROM reviews
		WHERE id = ?
	`;

	const values = [reviewId];

	const {
		propertyId,
		propertyTitle,
		tenantId,
		tenantName,
		ownerName,
		reviewerId,
		reviewedId,
	} = await getReviewModel(reviewId);

	// Enviar notificación a usuarios
	const notifications = sendReviewRejectionNotificationModel(
		propertyId,
		propertyTitle,
		tenantId,
		tenantName,
		ownerName,
		reviewerId,
		reviewedId,
		reason
	);

	const [result] = await pool.query(query, values);

	if (result.affectedRows === 0) {
		generateErrorUtil('No se pudo eliminar la reseña', 400);
	}

	console.log('Notifications-removeReviewModel', notifications);

	return [result.affectedRows, notifications];
};

export default removeReviewModel;
