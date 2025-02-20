import getPool from '../../db/getPool.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const getPropertyStatusModel = async (propertyId) => {
	const pool = await getPool();

	// Buscamos la propiedad por su ID
	const [property] = await pool.query(
		`SELECT status, id FROM properties WHERE id = ?`,
		[propertyId]
	);

	// Si no existe, lanzamos un error
	if (!property) {
		throw generateErrorUtil('Propiedad no encontrada', 404);
	}

	return property[0].status;
};

export default getPropertyStatusModel;
