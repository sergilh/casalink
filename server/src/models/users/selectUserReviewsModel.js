import getPool from '../../db/getPool.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';
const selectUserReviewsModel = async (userId) => {
	const pool = await getPool();
	console.log(userId);

	const [userDetails] = await pool.query(
		`SELECT
		name,
		lastName,
		bio,
		avatarUrl
		FROM users
		WHERE id=?`,
		[userId]
	);

	if (userDetails.length === 0) {
		generateErrorUtil('No se ha encontrado el usuario', 400);
	}

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
				r.contractId,
				r.rating,
				r.comment,
				c.id AS contractId,
				c.tenantId,
				c.propertyId,
				c.startDate,
				c.endDate,
				ROUND(AVG(r.rating), 0) AS averageRating
			FROM contracts c
			LEFT JOIN reviews r ON c.id = r.contractId
			LEFT JOIN users u ON r.reviewedId= u.id
			LEFT JOIN users u2 ON r.reviewerId= u2.id
			WHERE c.tenantId=?
			GROUP BY r.id, r.reviewerId, u.name, u.lastName, u.bio, r.reviewedId, r.contractId, r.rating, r.comment, c.id, c.tenantId, c.propertyId, c.startDate, c.endDate
		`,
		[userId]
	);

	const averageRating = reviews.length > 0 ? reviews[0].averageRating : 0;

	return {
		user: {
			reviewedName: `${userDetails[0].name} ${userDetails[0].lastName}`,
			biography: userDetails[0].bio || 'Biografía no disponible',
			averageRating,
			avatarUrl: userDetails[0].avatarUrl || 'DefaultAvatarUrl',
		},
		reviews,
	};
};

export default selectUserReviewsModel;
