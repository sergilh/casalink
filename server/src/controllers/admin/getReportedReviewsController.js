import getPool from '../../db/getPool.js';

const getReportedReviewsController = async (req, res, next) => {
	try {
		const pool = await getPool();

		// Obtener los parámetros desde la URL (query params)
		const { limit = 12, page = 1 } = req.query;

		const offset = (page - 1) * limit;

		// Obtener los datos de las reseñas reportadas
		const [reviews] = await pool.query(
			`SELECT * FROM reviews WHERE status = 'reported' ORDER BY createdAt DESC LIMIT ? OFFSET ?`,
			[limit, offset]
		);

		res.status(200).json({ reviews });
	} catch (error) {
		console.error('Error ejecutando la consulta:', error);
		next(error);
	}
};

export default getReportedReviewsController;
