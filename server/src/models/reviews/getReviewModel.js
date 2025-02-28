import getPool from '../../db/getPool.js';

const getReviewModel = async (reviewId) => {
	const pool = await getPool();

	const [review] = await pool.query(
		`
		SELECT
			p.id AS propertyId,
			p.propertyTitle AS propertyTitle,
			c.tenantId,
			CONCAT(t.name, ' ', t.lastName) AS tenantName,
			p.ownerId,
			CONCAT(u.name, ' ', u.lastName) AS ownerName,
			r.reviewerId as reviewerId,
			r.reviewedId as reviewedId
		FROM reviews r
		JOIN contracts c ON r.contractId = c.id
		JOIN properties p ON c.propertyId = p.id
		JOIN users t ON c.tenantId = t.id
		JOIN users u ON p.ownerId = u.id
		WHERE r.id = ?
	`,
		[reviewId]
	);

	return [review];
};

export default getReviewModel;
