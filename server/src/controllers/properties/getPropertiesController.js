import getPool from '../../db/getPool.js';

const getPropertiesController = async (req, res, next) => {
	const {
		minPrice = 0,
		maxPrice = null,
		bedrooms = null,
		bathrooms = null,
		minOwnerRating = null,
		energyCertificate = null,
		sortBy = 'createdAt',
		order = 'DESC',
		limit = 10,
		page = 1,
	} = req.body;

	const offset = (page - 1) * limit;

	console.log({
		minPrice,
		maxPrice,
		bedrooms,
		bathrooms,
		energyCertificate,
		minOwnerRating,
		sortBy,
		order,
		limit,
		offset,
	});

	// Validar `sortBy` y `order` para evitar SQL Injection
	const validSortBy = [
		'price',
		'bedrooms',
		'bathrooms',
		'ownerRating',
		'createdAt',
	];
	const validOrder = ['ASC', 'DESC'];

	const sortColumn = validSortBy.includes(sortBy) ? sortBy : 'createdAt';
	const sortOrder = validOrder.includes(order.toUpperCase())
		? order.toUpperCase()
		: 'DESC';

	const query = `
		SELECT
			p.id AS propertyId,
			p.propertyTitle,
			p.propertyType,
			p.description,
			p.zipCode,
			p.bedrooms,
			p.bathrooms,
			p.price,
			p.status,
			p.hasEnergyCert,
			p.createdAt AS propertyCreatedAt,
			JSON_OBJECT(
				'ownerId', u.id,
				'ownerName', u.name,
				'lastName', u.lastName,
				'avatarUrl', u.avatarUrl,
				'isDocsVerified', u.isDocsVerified,
				'averageRating', u.averageRating,
				'totalReviews', u.totalReviews
			) AS ownerInfo,
			(SELECT pi.imageUrl FROM images pi WHERE pi.propertyId = p.id ORDER BY pi.sortIndex ASC LIMIT 1) AS mainImage
		FROM properties p
		JOIN users u ON p.ownerId = u.id
		LEFT JOIN reviews r ON u.id = r.reviewedId
		WHERE
			AND (p.price >= ? OR ? IS NULL)
			AND (p.price <= ? OR ? IS NULL)
			AND (p.bedrooms = ? OR ? IS NULL)
			AND (p.bathrooms = ? OR ? IS NULL)
			AND (p.hasEnergyCert = ? OR ? IS NULL)
		GROUP BY p.id, u.id
		HAVING
			(IFNULL(AVG(r.rating), 0) >= ? OR ? IS NULL)
		ORDER BY '${sortColumn}' ${sortOrder}
		LIMIT ? OFFSET ?;
	`;

	const values = [
		minPrice,
		minPrice,
		maxPrice,
		maxPrice,
		bedrooms,
		bedrooms,
		bathrooms,
		bathrooms,
		energyCertificate,
		energyCertificate,
		minOwnerRating,
		minOwnerRating,
		limit,
		offset,
	];

	console.log('Query:', query);

	try {
		const pool = await getPool();
		const [results] = await pool.execute(query, values);

		console.log('Resultados:', results);

		res.json(results);
	} catch (error) {
		next(error);
	}
};

export default getPropertiesController;
