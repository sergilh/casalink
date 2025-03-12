import getPool from '../../db/getPool.js';

const selectContractsByStatusModel = async ({
	userId,
	statusFilter,
	page,
	limit,
}) => {
	// Obtenemos el pool.
	const pool = await getPool();

	// Parámetros de paginación
	const offset = (page - 1) * limit;

	const [[{ total }]] = await pool.query(
		`SELECT COUNT(*) AS total FROM contracts c JOIN properties p ON c.propertyId=p.id WHERE (c.tenantId = ? OR p.ownerId=?) AND c.status IN (?)`,
		[userId, userId, statusFilter]
	);

	console.log(
		await pool.query(
			`SELECT COUNT(*) AS total FROM contracts WHERE tenantId = ? AND status IN (?)`,
			[userId, statusFilter]
		)
	);

	// Consulta para obtener los contratos paginados
	const [contracts] = await pool.query(
		`
			SELECT c.*, p.propertyTitle, p.ownerId, p.propertyType, p.price, p.addressLocality, u1.name AS ownerName, u2.name AS tenantName,
				c.tenantId FROM contracts c  JOIN properties p ON c.propertyId=p.id JOIN users u1 ON p.ownerId = u1.id JOIN users u2 ON c.tenantId = u2.id WHERE (c.tenantId = ? OR p.ownerId = ?) AND c.status IN (?)
			ORDER BY c.createdAt DESC
			LIMIT ? OFFSET ?
			`,
		[userId, userId, statusFilter, Number(limit), Number(offset)]
	);

	console.log('Total:', total);
	return { contracts, total: Number(total) };
};

export default selectContractsByStatusModel;
