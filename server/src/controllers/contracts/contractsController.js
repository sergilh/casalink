import getPool from '../../db/getPool.js';

const contractsController = async (req, res, next) => {
	try {
		const pool = await getPool();
		const { status = null } = req.query; // Estado opcional desde la URL000
		const { page = 1, limit = 10 } = req.query; // Parámetros de paginación
		const userId = req.user.id; // ID del usuario autenticado
		const offset = (page - 1) * limit;

		console.log('Usuario autenticado:', userId);
		console.log('Estado recibido:', status);

		// Si status no está definido, asignamos NULL
		const statusFilter = status || null;

		/*console.log('status', status);

		// Consultar solicitudes hechas (donde el usuario es inquilino)

		console.log(
			'SQL',
			pool.format(
				`
				SELECT c.id, c.propertyId, c.status, c.startDate, c.createdAt,
						p.propertyTitle, u.name AS ownerName
				FROM contracts c
				JOIN properties p ON c.propertyId = p.id
				JOIN users u ON p.ownerId = u.id
				WHERE c.tenantId = ? AND c.status IN (COALESCE(?, ('pending', 'approved', 'ongoing')))
				ORDER BY c.createdAt DESC
				LIMIT ? OFFSET ?
			 `,
				[userId, status, Number(limit), Number(offset)]
			)
		);
		*/
		const [contractsAsTenant] = await pool.query(
			`
				SELECT
					c.id,
					c.propertyId,
					c.status,
					c.startDate,
					c.createdAt,
					p.propertyTitle,
					u.name AS ownerName
				FROM contracts c
				JOIN properties p ON c.propertyId = p.id
				JOIN users u ON p.ownerId = u.id
				WHERE c.tenantId = ?
				AND (COALESCE(?, c.status) = c.status)
				ORDER BY c.createdAt DESC
				LIMIT ? OFFSET ?
			 `,
			[userId, statusFilter, Number(limit), Number(offset)]
		);

		// Consultar solicitudes recibidas (donde el usuario es dueño)
		const [contractsAsOwner] = await pool.query(
			`
				SELECT
					c.id,
					c.tenantId,
					c.status,
					c.startDate,
					c.createdAt,
					u.name AS tenantName,
					p.propertyTitle
				FROM contracts c
				JOIN users u ON c.tenantId = u.id
				JOIN properties p ON c.propertyId = p.id
				WHERE p.ownerId = ?
				AND (COALESCE(?, c.status) = c.status)
				ORDER BY c.createdAt DESC
				LIMIT ? OFFSET ?
			 `,
			[userId, statusFilter, Number(limit), Number(offset)]
		);

		res.json({
			contractsAsTenant, // Slicitudes que el usuario hizo para alquilar propiedades
			contractsAsOwner, // Solicitudes que el usuario recibió como dueño de propiedades
		});
	} catch (error) {
		next(error);
	}
};

export default contractsController;
