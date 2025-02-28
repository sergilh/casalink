import getPool from '../db/getPool.js';

import generateErrorUtil from '../utils/generateErrorUtil.js';

const contractExistsMiddleware = async (req, res, next) => {
	try {
		const { contractId } = req.params;

		const pool = await getPool();

		const [contracts] = await pool.query(
			`
				SELECT
					c.id AS contractId,
					p.id AS propertyId,
					p.ownerId
				FROM contracts c
				JOIN properties p ON c.propertyId = p.id
				WHERE c.id = ?;
			`,
			[contractId]
		);

		//console.log('contratos', contracts);

		if (contracts.length < 1) {
			generateErrorUtil('El contrato no existe', 404);
		}

		req.ownerId = contracts[0].ownerId;
		req.propertyId = contracts[0].propertyId;
		req.contractId = contracts[0].contractId;
		next();
	} catch (err) {
		next(err);
	}
};

export default contractExistsMiddleware;
