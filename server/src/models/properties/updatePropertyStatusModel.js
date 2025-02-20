import getPool from '../../db/getPool.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const updatePropertyStatusModel = async (propertyId, newStatus) => {
	const pool = await getPool();

	const [property] = await pool.query(
		`SELECT id, status, ownerId FROM properties WHERE id = ?`,
		[propertyId]
	);

	if (!property) {
		throw generateErrorUtil(
			`La propiedad ${propertyId} no existe o ya tiene el estado ${newStatus}.`,
			404
		);
	}

	if (property.status === newStatus) {
		throw generateErrorUtil(
			`La propiedad ${propertyId} ya tiene el estado ${newStatus}.`,
			404
		);
	}

	await pool.query(`UPDATE properties SET status = ? WHERE id = ?`, [
		newStatus,
		Number(propertyId),
	]);

	return property[0].ownerId;
};

export default updatePropertyStatusModel;
