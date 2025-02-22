import getPool from '../../db/getPool.js';

const requestVisitController = async (req, res) => {
	try {
		const pool = await getPool();
		const userId = req.user.id; // ID del usuario autenticado

		// Consultar solicitudes hechas (donde el usuario es inquilino)
		const [requestsMade] = await pool.query(
			`
				SELECT c.id, c.propertyId, c.status, c.startDate, c.createdAt,
						p.propertyTitle, u.name AS ownerName
				FROM contracts c
				JOIN properties p ON c.propertyId = p.id
				JOIN users u ON p.ownerId = u.id
				WHERE c.tenantId = ?
				ORDER BY c.createdAt DESC;
			 `,
			[userId]
		);

		// Consultar solicitudes recibidas (donde el usuario es dueño)
		const [requestsReceived] = await pool.query(
			`
				SELECT c.id, c.tenantId, c.status, c.startDate, c.createdAt,
						u.name AS tenantName, p.propertyTitle
				FROM contracts c
				JOIN users u ON c.tenantId = u.id
				JOIN properties p ON c.propertyId = p.id
				WHERE p.ownerId = ?
				ORDER BY c.createdAt DESC;
			 `,
			[userId]
		);

		res.json({
			requestsMade, // Slicitudes que el usuario hizo para alquilar propiedades
			requestsReceived, // Solicitudes que el usuario recibió como dueño de propiedades
		});
	} catch (error) {
		console.error('Error fetching rental requests:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
};

export { requestVisitController };
