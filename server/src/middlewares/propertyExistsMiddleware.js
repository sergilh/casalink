import getPool from '../db/getPool.js';
import generateErrorUtil from '../utils/generateErrorUtil.js';
const propertyExistsMiddleware = async (req, res, next) => {
	try {
		const { propertyId } = req.params;

		const pool = await getPool();

		const [properties] = await pool.query(
			`
            SELECT id FROM properties WHERE id=?`,
			[propertyId]
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
