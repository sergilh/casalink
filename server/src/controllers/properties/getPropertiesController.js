import { pool } from '../../db/getPool.js';

export const getProperties = async (req, res) => {
	try {
		// Extraer filtros de la query
		const {
			minPrice,
			maxPrice,
			propertyType = 'casa', // Valor por defecto
			bedrooms,
			bathrooms,
			rating,
			certified,
			orderBy = 'price', // Valor por defecto
			orderDirection = 'ASC', // ASC o DESC
		} = req.query;

		// Crear la consulta base
		let query = `SELECT * FROM properties WHERE 1=1`;
		const values = [];

		// Aplicar filtros dinámicos
		if (minPrice) {
			query += ` AND price >= ?`;
			values.push(minPrice);
		}
		if (maxPrice) {
			query += ` AND price <= ?`;
			values.push(maxPrice);
		}
		if (propertyType) {
			query += ` AND bedrooms = ?`;
			values.push(bedrooms);
		}
		if (bedrooms) {
			query += ` AND bedrooms = ?`;
			values.push(bedrooms);
		}
		if (bathrooms) {
			query += ` AND bathrooms = ?`;
			values.push(bathrooms);
		}
		if (rating) {
			query += ` AND owner_rating >= ?`;
			values.push(rating);
		}
		if (certified) {
			query += ` AND energy_certificate IS NOT NULL`;
		}

		// Aplicar ordenamiento
		const allowedFields = [
			'price',
			'bedrooms',
			'bathrooms',
			'ownerRating',
			'updatedAt',
		];
		if (allowedFields.includes(orderBy)) {
			query += ` ORDER BY ${orderBy} ${orderDirection.toUpperCase() === 'DESC' ? 'DESC' : 'ASC'}`;
		}

		// Ejecutar la consulta
		const [rows] = await pool.query(query, values);
		res.json(rows);
	} catch (error) {
		console.error('Error fetching properties:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};
