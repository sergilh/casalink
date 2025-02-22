import getPool from '../../db/getPool.js';

const getPropertiesController = async (req, res) => {
	const {
		minPrice,
		maxPrice,
		bedrooms,
		bathrooms,
		minOwnerRating,
		energyCertificate,
		sortBy,
		order,
	} = req.query;

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
				p.energyCertificate,
				u.id AS ownerId,
				u.name AS ownerName,
				COALESCE(AVG(r.rating), 0) AS ownerRating
			FROM properties p
			JOIN users u ON p.ownerId = u.id
			LEFT JOIN ratings r ON u.id = r.userId
			WHERE
				(p.price BETWEEN ? AND ? OR ? IS NULL OR ? IS NULL)
				AND (p.bedrooms = ? OR ? IS NULL)
				AND (p.bathrooms = ? OR ? IS NULL)
				AND (p.energyCertificate = ? OR ? IS NULL)
			GROUP BY p.id, u.id
			HAVING
				(ownerRating >= ? OR ? IS NULL)
			ORDER BY
				CASE
					WHEN ? = 'price' AND ? = 'ASC' THEN p.price
					WHEN ? = 'price' AND ? = 'DESC' THEN p.price * -1
					WHEN ? = 'bedrooms' AND ? = 'ASC' THEN p.bedrooms
					WHEN ? = 'bedrooms' AND ? = 'DESC' THEN p.bedrooms * -1
					WHEN ? = 'bathrooms' AND ? = 'ASC' THEN p.bathrooms
					WHEN ? = 'bathrooms' AND ? = 'DESC' THEN p.bathrooms * -1
					WHEN ? = 'ownerRating' AND ? = 'ASC' THEN ownerRating
					WHEN ? = 'ownerRating' AND ? = 'DESC' THEN ownerRating * -1
					ELSE p.id
				END;
		`;
	const values = [
		minPrice || null,
		maxPrice || null,
		minPrice || null,
		maxPrice || null,
		bedrooms || null,
		bedrooms || null,
		bathrooms || null,
		bathrooms || null,
		energyCertificate || null,
		energyCertificate || null,
		minOwnerRating || null,
		minOwnerRating || null,
		sortBy,
		order,
		sortBy,
		order,
		sortBy,
		order,
		sortBy,
		order,
		sortBy,
		order,
		sortBy,
		order,
	];

	try {
		const [results] = await getPool.execute(query, values);
		res.json(results);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export default getPropertiesController;
