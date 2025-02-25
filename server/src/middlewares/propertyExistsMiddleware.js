import getPool from '../db/getPool.js';
import generateErrorUtil from '../utils/generateErrorUtil.js';

const propertyExistsMiddleware = async (req, res, next) => {
	try {
		const { propertyId } = req.params;
		console.log('propertyId', propertyId);

		if (!propertyId) {
			throw generateErrorUtil('ID de propiedad no válido.', 400);
		}

		const pool = await getPool();
		const [properties] = await pool.query(
			`
				SELECT id FROM properties WHERE id=?
			`,
			[propertyId]
		);

		if (properties.length < 1) {
			throw generateErrorUtil('La propiedad ya no existe.', 404);
		}

		req.property = properties[0];
		next();
	} catch (err) {
		next(err);
	}
};

export default propertyExistsMiddleware;
