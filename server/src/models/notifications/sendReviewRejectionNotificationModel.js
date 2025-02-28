import getPool from '../../db/getPool.js';

const sendReviewRejectionNotificationsModel = async (
	propertyId,
	propertyTitle,
	tenantId,
	tenantName,
	ownerName,
	reviewerId,
	reviewedId,
	reason
) => {
	const pool = await getPool();

	let reviewedName, reviewerName;

	if (reviewerId === tenantId) {
		reviewerName = tenantName;
		reviewedName = ownerName;
	} else {
		reviewerName = ownerName;
		reviewedName = tenantName;
	}

	const reviewerMessage = `Tu reseña, por la propiedad ${propertyTitle}, en el perfil de ${reviewedName} ha sido rechazada por ${reason}.`;
	const reviewedMessage = `La reseña de ${reviewerName} en tu perfil por la propiedad ${propertyTitle} ha sido rechazada y ya no aparecerá en tu historial de reseñas.`;

	const notifications = [
		{ userId: reviewerId, propertyId, message: reviewerMessage },
		{ userId: reviewedId, propertyId, message: reviewedMessage },
	];

	const values = notifications
		.map(() => "(?, ?, ?, 'review', 'approved')")
		.join(', ');
	const params = notifications.flatMap((n) => [
		n.userId,
		n.propertyId,
		n.message,
	]);

	const [result] = await pool.query(
		`
			INSERT INTO notifications (userId, propertyId, message, type, status)
			VALUES ${values}
		`,
		params
	);

	const insertedNotifications = notifications.map((notification, index) => ({
		id: result.insertId + index, // Calculamos el ID insertado
		userId: notification.userId,
		message: notification.message,
	}));

	return insertedNotifications; // Devuelve el ID de las notificaciones creada
};

export default sendReviewRejectionNotificationsModel;
