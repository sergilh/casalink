import getPool from '../../db/getPool.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const updatePropertyModel = async (propertyId, updateData) => {
	const pool = await getPool();

	if (!propertyId) {
		throw generateErrorUtil('ID de propiedad no válido.', 400);
	}

	const {
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
		status,
	} = updateData;

	const fields = [];
	const values = [];

	if (title !== undefined) {
		fields.push('propertyTitle = ?');
		values.push(title);
	}
	if (type !== undefined) {
		fields.push('propertyType = ?');
		values.push(type);
	}
	if (description !== undefined) {
		fields.push('description = ?');
		values.push(description);
	}
	if (locality !== undefined) {
		fields.push('addressLocality = ?');
		values.push(locality);
	}
	if (street !== undefined) {
		fields.push('addressStreet = ?');
		values.push(street);
	}
	if (number !== undefined) {
		fields.push('addressNumber = ?');
		values.push(number);
	}
	if (floor !== undefined) {
		fields.push('addressFloor = ?');
		values.push(floor);
	}
	if (hasEnergyCert !== undefined) {
		fields.push('hasEnergyCert = ?');
		values.push(hasEnergyCert ? 1 : 0);
	}
	if (zipCode !== undefined) {
		fields.push('zipCode = ?');
		values.push(zipCode);
	}
	if (location !== undefined) {
		const [lat, lng] = location.split(',').map(Number);
		fields.push('location = POINT(?, ?)');
		values.push(lat, lng);
	}
	if (squareMeters !== undefined) {
		fields.push('squareMeters = ?');
		values.push(Number(squareMeters));
	}
	if (bedrooms !== undefined) {
		fields.push('bedrooms = ?');
		values.push(Number(bedrooms));
	}
	if (bathrooms !== undefined) {
		fields.push('bathrooms = ?');
		values.push(Number(bathrooms));
	}
	if (price !== undefined) {
		fields.push('price = ?');
		values.push(Number(price));
	}

	if (fields.length === 0) {
		throw generateErrorUtil(
			'No se han proporcionado datos para actualizar.',
			400
		);
	}

	const updateQuery = `
			UPDATE properties
			SET ${fields.join(', ')}, status = '${status}'
			WHERE id = ?
		`;
	values.push(propertyId);

	const [result] = await pool.query(updateQuery, values);

	if (result.affectedRows === 0) {
		throw generateErrorUtil(
			'No se encontró la propiedad o no se pudo actualizar.',
			404
		);
	}

	return true;
};

export default updatePropertyModel;
