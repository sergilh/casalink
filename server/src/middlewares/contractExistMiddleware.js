import getPool from '../db/getPool.js';

import generateErrorUtil from '../utils/generateErrorUtil.js';

const contractExistsMiddleware = async (req, res, next) => {
	try {
		const { contractId } = req.params;

		const pool = await getPool();

		const [contracts] = await pool.query(
			`
			SELECT id FROM properties WHERE id=?`,
			[contractId]
		);

		if (contracts.length < 1) {
			generateErrorUtil('El contrato no existe', 404);
		}
		next();
	} catch (err) {
		next(err);
	}
};

export default contractExistsMiddleware;
