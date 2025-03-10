import getPool from '../../db/getPool.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';
const selectUserReviewsModel = async (userId) => {
	const pool = await getPool();
	console.log(userId);

	const [userDetails] = await pool.query(
		`SELECT
		CONCAT(name,' ',lastName) AS fullName,
		lastName,
		bio,
		avatarUrl,
		averageRating
		FROM users
		WHERE id=?`,
		[userId]
	);

	if (userDetails.length === 0) {
		generateErrorUtil('No se ha encontrado el usuario', 400);
	}
	const user = userDetails[0];

	const [reviews] = await pool.query(
		`
		SELECT
			r.id,
			r.reviewerId,
			CONCAT(u2.name, ' ', u2.lastName) AS reviewerName, 
			u2.avatarUrl AS reviewerAvatar,
			r.rating,
			r.comment,
			c.id AS contractId,
			c.status AS contractStatus,
			c.startDate,
			c.endDate
		FROM reviews r
		LEFT JOIN contracts c ON r.contractId = c.id
		LEFT JOIN users u2 ON r.reviewerId = u2.id
		WHERE r.reviewedId = ?
		ORDER BY c.endDate DESC
		`,
		[userId]
	);

	return {
		userDetails: user,
		reviews,
	};
};

export default selectUserReviewsModel;
