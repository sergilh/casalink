import getPool from '../db/getPool.js';
import generateErrorUtil from '../utils/generateErrorUtil.js';
const userExistsMiddleware = async (req, res, next) => {
	try {
		const { id } = req.params;

		const pool = await getPool();

		const [user] = await pool.query(
			`
				SELECT id FROM users WHERE id=?
			`,
			[id]
		);

		if (user.length < 1) {
			generateErrorUtil('El usuario seleccionado no existe', 400);
		}

		next();
	} catch (err) {
		next(err);
	}
};

export default userExistsMiddleware;
