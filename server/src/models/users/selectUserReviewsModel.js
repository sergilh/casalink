import getPool from '../../db/getPool.js';
const selectUserReviewsModel = async (userId) => {
	const pool = await getPool();

	const [reviews] = await pool.query(
		`
			SELECT
				r.id,
				r.reviewerId,
				r.reviewedId,
				r.contracId,
				r.rating,
				r.comment,
				c.id,
				c.tenantId,
				c.propertyId,
				c.startDate,
				c.endDate
			FROM contracts c
			LEFT JOIN reviews r ON c.id = r.contracId
			WHERE c.tenantId=?
		`,
		[userId]
	);

	console.log('Resultado', reviews);

	return reviews;
};

export default selectUserReviewsModel;
