import getPool from '../../db/getPool.js';
import validNotificationStatus from '../../utils/validNotificationStatus.js';

const sendPropertyNotificationModel = async (userId, propertyId, status) => {
	const pool = await getPool();

	// ver de hacerlo modular

	console.log('status', status);
	// Validar que el `status` sea válido
	if (await validNotificationStatus('property', status)) {
		// Inserción de la notificación en la base de datos
		const [result] = await pool.query(
			`
			INSERT INTO notifications
			(userId, propertyId, message, type, status)
			VALUES (?, ?, ?, ?, ?)
			`,
			[
				userId,
				propertyId,
				`La propiedad ${await pool.query(
					`SELECT propertyTitle FROM properties WHERE id = ?`,
					[propertyId]
				)} ha sido ${status === 'approved' ? 'aprobada' : 'rechazada'}`,
				'property',
				status,
			]
		);
		return result.insertId; // Devuelve el ID de la notificación creada
	}
};

export default sendPropertyNotificationModel;
