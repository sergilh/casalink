/*
import getPool from '../../db/getPool.js';

const getPropertiesController = async (req, res, next) => {
	try {
		const pool = await getPool();

		// Obtener los parámetros desde la URL (query params)
		const {
			minPrice = 0,
			maxPrice = null,
			bedrooms = null,
			bathrooms = null,
			minOwnerRating = 0,
			energyCertificate = null,
			locality = null,
			sortBy = 'updatedAt',
			order = 'DESC',
			limit = 10,
			page = 1,
		} = req.query; // Ahora tomamos los valores desde query params

		const offset = (page - 1) * limit;

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

		// Construcción dinámica de la consulta
		let query = `
			SELECT
				p.id AS propertyId,
				p.propertyTitle,
				p.propertyType,
				p.description,
				p.zipCode,
				p.bedrooms,
				p.bathrooms,
				p.price,
				p.squareMeters,
				p.addressLocality,
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
				u.averageRating AS ownerRating,
				(SELECT pi.imageUrl FROM images pi WHERE pi.propertyId = p.id ORDER BY pi.sortIndex ASC LIMIT 1) AS mainImage
			FROM properties p
			JOIN users u ON p.ownerId = u.id
			LEFT JOIN reviews r ON u.id = r.reviewedId
			WHERE 1=1
			AND p.status = 'available'
		`;

		const values = [];

		// Agregar condiciones dinámicamente si se proporcionan parámetros
		if (minPrice) {
			query += ` AND p.price >= ?`;
			values.push(minPrice);
		}
		if (maxPrice) {
			query += ` AND p.price <= ?`;
			values.push(maxPrice);
		}
		if (bedrooms) {
			query += ` AND p.bedrooms >= ?`;
			values.push(bedrooms);
		}
		if (bathrooms) {
			query += ` AND p.bathrooms >= ?`;
			values.push(bathrooms);
		}
		if (energyCertificate) {
			query += ` AND p.hasEnergyCert = 1`;
		}
		if (minOwnerRating) {
			query += ` HAVING ownerRating >= ?`;
			values.push(minOwnerRating);
		}
		if (locality) {
			query += ` AND p.addressLocality LIKE ? `;
			values.push(locality);
		}

		query += ` ORDER BY p.${sortColumn} ${sortOrder} LIMIT ? OFFSET ?`;
		values.push(parseInt(limit), parseInt(offset));

		const [results] = await pool.query(query, values);

		console.log(pool.format(query, values));

		res.json(results);
	} catch (error) {
		console.error('Error ejecutando la consulta:', error);
		next(error);
	}
};

export default getPropertiesController;
*/

import getPool from '../../db/getPool.js';

const getPropertiesController = async (req, res, next) => {
	try {
		const pool = await getPool();

		// Obtener los parámetros desde la URL (query params)
		const {
			minPrice = 0,
			maxPrice = null,
			bedrooms = null,
			bathrooms = null,
			minOwnerRating = 0,
			energyCertificate = null,
			locality = null,
			sortBy = '',
			order = '',
			limit = 12,
			page = 1,
		} = req.query;

		const offset = (page - 1) * limit;

		// Validar `sortBy` y `order` para evitar SQL Injection
		const validSortBy = [
			'p.price',
			'p.bedrooms',
			'p.bathrooms',
			'u.averageRating',
			'p.updatedAt',
		];
		const validOrder = ['ASC', 'DESC'];

		const sortColumn = validSortBy.includes(sortBy)
			? sortBy
			: 'p.updatedAt';
		const sortOrder = validOrder.includes(order.toUpperCase())
			? order.toUpperCase()
			: 'DESC';

		console.log(sortColumn, sortOrder);

		// Construcción de la consulta base
		let baseQuery = `FROM properties p
			JOIN users u ON p.ownerId = u.id
			LEFT JOIN reviews r ON u.id = r.reviewedId
			WHERE 1=1 AND p.status = 'available'`;

		const values = [];

		// Aplicar filtros dinámicos
		if (minPrice) {
			baseQuery += ` AND p.price >= ?`;
			values.push(minPrice);
		}
		if (maxPrice) {
			baseQuery += ` AND p.price <= ?`;
			values.push(maxPrice);
		}
		if (bedrooms) {
			baseQuery += ` AND p.bedrooms >= ?`;
			values.push(bedrooms);
		}
		if (bathrooms) {
			baseQuery += ` AND p.bathrooms >= ?`;
			values.push(bathrooms);
		}
		if (energyCertificate) {
			baseQuery += ` AND p.hasEnergyCert = 1`;
		}
		if (locality) {
			baseQuery += ` AND p.addressLocality LIKE ?`;
			values.push(`%${locality}%`);
		}
		if (minOwnerRating) {
			baseQuery += ` AND u.averageRating >= ?`;
			values.push(minOwnerRating);
		}

		// Consulta para obtener el número total de propiedades que cumplen los filtros
		const totalQuery = `SELECT COUNT(DISTINCT p.id) AS totalProperties ${baseQuery}`;
		const [[{ totalProperties }]] = await pool.query(totalQuery, values);

		// Calcular total de páginas
		const totalPages = Math.ceil(totalProperties / limit);

		// Consulta para obtener las propiedades paginadas
		const propertiesQuery = `
			SELECT
				p.id AS propertyId,
				p.propertyTitle,
				p.propertyType,
				p.description,
				p.zipCode,
				p.bedrooms,
				p.bathrooms,
				p.price,
				p.squareMeters,
				p.addressLocality,
				p.hasEnergyCert,
				p.createdAt AS propertyCreatedAt,
				u.name AS ownerName,
				u.averageRating,
				JSON_OBJECT(
					'ownerId', u.id,
					'ownerName', u.name,
					'lastName', u.lastName,
					'avatarUrl', u.avatarUrl,
					'isDocsVerified', u.isDocsVerified,
					'averageRating', u.averageRating,
					'totalReviews', u.totalReviews
				) AS ownerInfo,
				u.averageRating AS ownerRating,
				(SELECT pi.imageUrl FROM images pi WHERE pi.propertyId = p.id ORDER BY pi.sortIndex ASC LIMIT 1) AS mainImage
			${baseQuery}
			GROUP BY p.id
			ORDER BY ${sortColumn} ${sortOrder}
			LIMIT ? OFFSET ?`;

		values.push(parseInt(limit), parseInt(offset));

		console.log(pool.format(propertiesQuery, values));

		const [properties] = await pool.query(propertiesQuery, values);

		// Enviar la respuesta con la paginación
		res.json({
			totalProperties,
			totalPages,
			currentPage: parseInt(page),
			limit: parseInt(limit),
			properties,
		});
	} catch (error) {
		console.error('Error ejecutando la consulta:', error);
		next(error);
	}
};

export default getPropertiesController;
