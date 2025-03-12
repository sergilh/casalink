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

	if (!contract.length || contract[0].status !== 'finished') {
		throw generateErrorUtil(
			'Solo puedes valorar después de que el contrato sea aprobado',
			403
		);
	}

	// Verificar si el usuario ya ha dejado una reseña para este contrato
	const [existingReview] = await pool.query(
		'SELECT * FROM reviews WHERE reviewerId = ? AND contractId = ?',
		[reviewerId, contractId]
	);

	if (existingReview.length > 0) {
		throw generateErrorUtil(
			'Ya has dejado una reseña para este contrato.',
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
