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

	/*
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
			u.name AS ownerName,
			JSON_OBJECT(
				'ownerId', u.id,
				'ownerName', u.name,
				'lastName', u.lastName,
				'avatarUrl', u.avatarUrl,
				'isDocsVerified', u.isDocsVerified,
				'averageRating', IFNULL(AVG(r.rating), 0),
				'totalReviews', COUNT(r.id)
			) AS ownerInfo,
			(SELECT pi.imageUrl FROM images pi WHERE pi.propertyId = p.id ORDER BY pi.sortIndex ASC LIMIT 1) AS mainImage
		FROM properties p
		JOIN users u ON p.ownerId = u.id
		LEFT JOIN reviews r ON u.id = r.reviewedId
		WHERE
			p.status = 'available'
			AND (p.price >= ? OR ? IS NULL)
			AND (p.price <= ? OR ? IS NULL)
			AND (p.bedrooms = ? OR ? IS NULL)
			AND (p.bathrooms = ? OR ? IS NULL)
			AND (p.hasEnergyCert = ? OR ? IS NULL)
			AND (u.averageRating >= ? OR ? IS NULL)
		GROUP BY p.id, u.id
		ORDER BY ${sortColumn} ${sortOrder}
		LIMIT ? OFFSET ?;
	`;

	// Ajustar `values` a los placeholders
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
		limit,
		offset,
	];
	*/

	//console.log('Query:', query);
	//console.log('Values:', values);

	try {
		const pool = await getPool();

		/*
		const [results] = await pool.query(
			`
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
			u.name AS ownerName,
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
			p.status = ?
			AND (p.price >= ? OR ? IS NULL)
			AND (p.price <= ? OR ? IS NULL)
			AND (p.bedrooms = ? OR ? IS NULL)
			AND (p.bathrooms = ? OR ? IS NULL)
			AND (p.hasEnergyCert = ? OR ? IS NULL)
		GROUP BY p.id, u.id
		HAVING
			AVG(r.rating) >= COALESCE(?, 0)
		ORDER BY p.${sortColumn} ${sortOrder}
		LIMIT ? OFFSET ?;
	`,
			[
				'pending',
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
				limit,
				offset,
			]
		);
		*/

		const [results] = await pool.query(
			`
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
				u.name AS ownerName,
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
				p.status IN ('available', 'pending')
				AND (COALESCE(?, p.price) <= p.price)
				AND (COALESCE(?, p.price) >= p.price)
				AND (COALESCE(?, p.bedrooms) = p.bedrooms)
				AND (COALESCE(?, p.bathrooms) = p.bathrooms)
				AND (COALESCE(?, p.hasEnergyCert) = p.hasEnergyCert)
				AND (COALESCE(?, u.averageRating) >= u.averageRating)
			GROUP BY p.id, u.id
			ORDER BY ${sortColumn} ${sortOrder}
			LIMIT ? OFFSET ?;
		`,
			[
				minPrice,
				maxPrice,
				bedrooms,
				bathrooms,
				energyCertificate,
				minOwnerRating,
				limit,
				offset,
			]
		);

		console.log('minPrice:', minPrice);
		console.log('maxPrice', maxPrice);
		console.log('bedrooms', bedrooms);
		console.log('bathrooms', bathrooms);
		console.log('energyCertificate', energyCertificate);
		console.log('minOwnerRating', minOwnerRating);
		console.log('SortBy', sortBy);
		console.log('order', order);
		console.log('Resultados:', results);

		res.json(results);
	} catch (error) {
		console.error('Error ejecutando la consulta:', error);
		next(error);
	}
};

export default getPropertiesController;
