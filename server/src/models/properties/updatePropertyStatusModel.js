import getPool from '../../db/getPool.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const updatePropertyStatusModel = async (propertyId, newStatus) => {
	const pool = await getPool();

	const [[property]] = await pool.query(
		`SELECT id, status, ownerId FROM properties WHERE id = ?`,
		[propertyId]
	);

	console.log('Propiedad:', property);
	console.log('Estado actual:', property.status);

	// Verificar que la propiedad ya fuera aprobada
	if (property.status === 'pending') {
		throw generateErrorUtil(
			'La propiedad no puede estar pendiente de aprobación, debe ser aprobada primero.',
			400
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

	return property.ownerId;
};

export default updatePropertyStatusModel;
