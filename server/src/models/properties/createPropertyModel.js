import { getPool } from '../../db/getPool.js';

const createPropertyModel = async ({
	userId,
	title,
	type,
	description,
	locality,
	street,
	number,
	floor,
	hasEnergyCert,
	zipCode,
	location,
	squareMeters,
	bedrooms,
	bathrooms,
	price,
}) => {
	const pool = getPool();

	const [result] = await pool.query(
		`
			INSERT INTO properties 
			(
				ownerId,
				propertyTitle,
				propertyType,
				description,
				addressLocality,
				addressStreet,
				addressNumber,
				addressFloor,
				hasEnergyCert,
				zipCode,
				location,
				squareMeters,
				bedrooms,
				bathrooms,
				price,
				status,
				createdAt,
				updatedAt)
			VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
		`,
		[
			userId,
			title,
			type,
			description,
			locality,
			street,
			number,
			floor,
			hasEnergyCert,
			zipCode,
			location,
			squareMeters,
			bedrooms,
			bathrooms,
			price,
		]
	);

	return result.insertId;
};

export default createPropertyModel;
