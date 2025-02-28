import getPool from '../../db/getPool.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';
import sendContractNotificationModel from '../../models/notifications/sendContractNotificationModel.js';

const requestVisitController = async (req, res, next) => {
	try {
		const tenantId = req.user.id; // ID del usuario autenticado
		const propertyId = req.params.propertyId; // ID de la propiedad

		const pool = await getPool();

		const [[{ ownerId }]] = await pool.query(
			`SELECT ownerId FROM properties WHERE id = ?`,
			[propertyId]
		);

		if (tenantId === ownerId) {
			throw generateErrorUtil('Eres dueño de esta propiedad.', 403);
		}

		const [[tenantData]] = await pool.query(
			`SELECT name, lastName FROM users WHERE id = ?`,
			[tenantId]
		);

		// Obtengo del body los detalles del contrato y la visita (startDate, endDate, visitDate)
		const { startDate, endDate, visitDate } = req.body;

		//Generar solicitud de visita
		const [contractId] = await pool.query(
			`INSERT INTO contracts (tenantId, propertyId, startDate, endDate, status)
			VALUES (?, ?, ?, ?, 'pending')`,
			[tenantId, propertyId, startDate, endDate]
		);

		const [[{ propertyTitle: propertyName }]] = await pool.query(
			`SELECT propertyTitle FROM properties WHERE id = ?`,
			[propertyId]
		);

		const messageOwner = `El usuario ${tenantData.name} ${tenantData.lastName} ha solicitado una visita a tu propiedad ${propertyName} el día ${visitDate}, ahora puedes aprobarla o rechazarla`;
		const messageTenant = `Se ha solicitado la visita a ${propertyName} para el día ${visitDate}, Solo esperamos que el dueño de la propiedad acepte o rechace la solicitud`;

		if (
			(await sendContractNotificationModel(
				ownerId,
				propertyId,
				messageOwner,
				'requested'
			)) &&
			(await sendContractNotificationModel(
				tenantId,
				propertyId,
				messageTenant,
				'requested'
			))
		) {
			res.status(200).json({
				success: true,
				message: `Visita solicitada con éxito y notificaciones enviadas`,
				contractId: contractId.insertId,
			});
		} else {
			generateErrorUtil('Error al enviar notificación', 500);
		}
	} catch (error) {
		next(error);
	}
};

export { requestVisitController };
