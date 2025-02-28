import getPool from '../../db/getPool.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const addReviewModel = async (
	reviewerId,
	reviewedId,
	contractId,
	rating,
	comment
) => {
	const pool = await getPool(); //asegura conexión a la base de datos

	// Verificar si el contrato está "approved"
	const [contract] = await pool.query(
		'SELECT status FROM contracts WHERE id = ?',
		[contractId]
	);

	if (!contract.length || contract[0].status !== 'approved') {
		throw generateErrorUtil(
			'Solo puedes valorar después de que el contrato sea aprobado',
			403
		);
	}

	// Insertar la nueva reseña
	const [review] = await pool.query(
		`
			INSERT INTO reviews (reviewerId, reviewedId, contractId, rating, comment)
			VALUES (?, ?, ?, ?, ?)
		`,
		[reviewerId, reviewedId, contractId, rating, comment]
	);

	return review.insertId;
};

export default addReviewModel;
