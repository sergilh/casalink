import getPool from '../../db/getPool.js';
import validNotificationStatus from '../../utils/validNotificationStatus.js';

const sendVisitNotificationsModel = async ({
	ownerId,
	contractId,
	date,
	status,
}) => {
	const pool = getPool();
	const { propertyId, tenantId } = await pool.query(
		`SELECT propertyId, tenantId FROM contracts WHERE id = ?`,
		[contractId]
	);

	if (ownerId === tenantId) {
		ownerId = Number(
			await pool.query(`SELECT ownerId FROM properties WHERE id = ?`, [
				propertyId,
			])
		);
	}

	const ownerName = await pool.query(`SELECT name FROM users WHERE id = ?`, [
		ownerId,
	]);

	const tenantName = await pool.query(`SELECT name FROM users WHERE id = ?`, [
		tenantId,
	]);

	const propertyName = await pool.query(
		`SELECT propertyTitle FROM properties WHERE id = ?`,
		[propertyId]
	);

	let ownerMessage, tenantMessage;

	// Validar que el `status` sea válido
	if (validNotificationStatus('property', status)) {
		// Inserción de la notificación al propietario en la base de datos
		switch (status) {
			case 'approved':
				tenantMessage = `Tu visita a la propiedad ${propertyName} de ${ownerName} en ${date} fue aprobada.`;
				ownerMessage = `Recuerda tu visita programada para el ${date} con ${tenantName} en ${propertyName}`;
				break;
			case 'rejected':
				tenantMessage = `Tu visita a la propiedad ${propertyName} en ${date} fue rechazada.`;
				ownerMessage = `Si no quieres recibir mas solicitudes de ${tenantName} en ${propertyName}, indícanos en las reseñas.`;
				break;
			default:
				tenantMessage = `Tu visita a la propiedad ${propertyName} de ${ownerName} en ${date} está pendiente de aprobación.`;
				ownerMessage = `${tenantName} solicitó la visita a la propiedad ${propertyName} en ${date}, responde a la solicitud.`;
				break;
		}
		const [resultOwner] = await pool.query(
			`
			INSERT INTO notifications
			(userId, propertyId, message, type, status)
			VALUES (?, ?, ?, ?, ?)
			`,
			[ownerId, propertyId, ownerMessage, 'visit', status]
		);

		// Inserción de la notificación al tenant en la base de datos
		const [resultTenant] = await pool.query(
			`
			INSERT INTO notifications
			(userId, propertyId, message, type, status)
			VALUES (?, ?, ?, ?, ?)
			`,
			[tenantId, propertyId, tenantMessage, 'visit', status]
		);
		return resultOwner.insertId, resultTenant.insertId; // Devuelve el ID de las notificaciones creada
	}
};

export default sendVisitNotificationsModel;
