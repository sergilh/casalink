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

	const [{ total }] = await pool.query(
		`SELECT COUNT(*) AS total FROM contracts WHERE user_id = ? AND status IN (?)`,
		[userId, statusFilter]
	);

	// Consulta para obtener los contratos paginados
	const [contracts] = await pool.query(
		`
			SELECT * FROM contracts WHERE user_id = ? AND status IN (?)
			ORDER BY created_at DESC
			LIMIT ? OFFSET ?
			`,
		[userId, statusFilter, Number(limit), Number(offset)]
	);

	return { contracts, total };
};

export default selectContractsByStatusModel;
