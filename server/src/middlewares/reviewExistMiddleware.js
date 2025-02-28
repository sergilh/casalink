import getPool from '../db/getPool.js';
import generateErrorUtil from '../utils/generateErrorUtil.js';

const reviewExistMiddleware = async (req, res, next) => {
	try {
		const { reviewId } = req.params;

		const pool = await getPool();

		const query = `
			SELECT id FROM reviews
			WHERE id = ?
		`;
		const values = [reviewId];

		const [review] = await pool.query(query, values);

		if (review.length === 0) {
			generateErrorUtil('No se encontró la reseña', 404);
		}

		req.review = review;

		next();
	} catch (error) {
		next(error);
	}
};

export default reviewExistMiddleware;
