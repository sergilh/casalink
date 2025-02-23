import getPool from '../db/getPool.js';

const reviewExistMiddleware = async (req, res, next) => {
	try {
		const userId = req.user.id; // ID del usuario autenticado (JWT)
		const pool = await getPool();
		const contractId = req.contractId; // ID del contrato encontrado en el middleware anterior

		// Buscar si ya existe una reseña de este usuario sobre el contrato
		const [reviews] = await pool.query(
			`SELECT id FROM reviews WHERE contractId = ? AND reviewerId = ?`,
			[contractId, userId]
		);

		if (reviews.length > 0) {
			return res.status(409).json({
				message: 'Ya has dejado una reseña para este contrato.',
			});
		}

		next(); // Permite continuar si no hay una reseña previa
	} catch (error) {
		next(error);
	}
};

export default reviewExistMiddleware;
