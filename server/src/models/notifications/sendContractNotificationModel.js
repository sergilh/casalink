import getPool from '../../db/getPool.js';
import validNotificationStatus from '../../utils/validNotificationStatus.js';

const sendContractNotificationModel = async (
	userId,
	propertyId,
	message,
	status
) => {
	const pool = await getPool();

	if (await validNotificationStatus('visit', status)) {
		// Generar la notificación
		const [result] = await pool.query(
			`INSERT INTO notifications (userId, propertyId, message, type, status)
			VALUES (?, ?, ?, ?, ?)`,
			[userId, propertyId, message, 'visit', status]
		);

		return result.insertId; // Devuelve el ID de la notificación creada
	}
};

export default sendContractNotificationModel;
