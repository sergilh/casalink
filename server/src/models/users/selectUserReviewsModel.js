import getPool from '../../db/getPool.js';
const selectUserReviewsModel = async (userId) => {
	const pool = await getPool();
	console.log(userId);

	const [reviews] = await pool.query(
		`
			SELECT
				r.id,
				r.reviewerId,
				CONCAT(u.name, ' ',u.lastName) AS reviewedName,
				CONCAT(u2.name, ' ',u2.lastName) AS reviewerName,
				u.bio AS biography,
				u2.avatarUrl AS reviewerAvatar,
				r.reviewedId,
				r.contracId,
				r.rating,
				r.comment,
				c.id AS contractId,
				c.tenantId,
				c.propertyId,
				c.startDate,
				c.endDate,
				ROUND(AVG(r.rating), 0) AS averageRating
			FROM contracts c
			LEFT JOIN reviews r ON c.id = r.contracId
			LEFT JOIN users u ON r.reviewedId= u.id
			LEFT JOIN users u2 ON r.reviewerId= u2.id
			WHERE c.tenantId=?
			GROUP BY r.id, r.reviewerId, u.name, u.lastName, u.bio, r.reviewedId, r.contracId, r.rating, r.comment, c.id, c.tenantId, c.propertyId, c.startDate, c.endDate
		`,
		[userId]
	);

	const averageRating = reviews.length > 0 ? reviews[0].averageRating : null;
	const reviewedName = reviews.length > 0 ? reviews[0].reviewedName : null;
	const biography = reviews.length > 0 ? reviews[0].biography : null;

	return {
		user: {
			reviewedName,
			biography,
			averageRating,
		},
		reviews,
	};
};

export default selectUserReviewsModel;
