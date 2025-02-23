import getPool from '../db/getPool.js';
import generateErrorUtil from '../utils/generateErrorUtil.js';
const propertyExistsMiddleware = async (req, res, next) => {
	try {
		const { id } = req.params;
		console.log('propertyId', id);

		const pool = await getPool();

		const [properties] = await pool.query(
			`
				SELECT id FROM properties WHERE id=?
			`,
			[id]
		);

		if (properties.length < 1) {
			generateErrorUtil('La propiedad ya no existe', 404);
		}
		next();
	} catch (err) {
		next(err);
	}
};

export default propertyExistsMiddleware;
