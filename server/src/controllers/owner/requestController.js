import getPool from '../../db/getPool.js';

const requestController = async (req, res) => {
	try {
		const pool = await getPool();

		// Verificar si el usuario está autenticado
		if (!req.user) {
			return res.status(403).json({ message: 'Unauthorized access' });
		}

		// Obtener ID del usuario autenticado
		const userId = req.user.id;

		// Consultar solicitudes de alquiler relacionadas con el usuario autenticado
		const [requests] = await pool.query(
			`SELECT c.id, c.propertyId, c.status, c.startDate, c.createdAt, 
                    p.propertyTitle AS propertyTitle, p.ownerId,
                    u.name AS ownerName
             FROM contracts c
             JOIN properties p ON c.propertyId = p.id
             JOIN users u ON p.ownerId = u.id
             WHERE c.tenantId = ? OR p.ownerId = ?
             ORDER BY c.createdAt DESC;`,
			[userId, userId]
		);

		res.json(requests);
	} catch (error) {
		console.error('Error fetching rental requests:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
};

export { requestController };
