import getPool from '../../db/getPool.js';
const selectUserReviewsModel = async (userId) => {
	const pool = await getPool();
	console.log(userId);

	const [reviews] = await pool.query(
		`
			SELECT
				r.id,
				r.reviewerId,
				u.name,
				u.bio,
				r.reviewedId,
				r.contracId,
				r.rating,
				r.comment,
				c.id AS contractId,
				c.tenantId,
				c.propertyId,
				c.startDate,
				c.endDate
			FROM contracts c
			LEFT JOIN reviews r ON c.id = r.contracId
			LEFT JOIN users u ON r.reviewedId= u.id
			WHERE c.tenantId=?
		`,
		[userId]
	);

	const [[{ averageRating }]] = await pool.query(
		`SELECT
		AVG(r.rating) AS averageRating
		FROM reviews r
		JOIN contracts c ON c.id=r.contracId
		WHERE c.tenantId=?`,
		[userId]
	);

	console.log('Resultado', reviews);

	return { reviews, averageRating };
};

export default selectUserReviewsModel;
