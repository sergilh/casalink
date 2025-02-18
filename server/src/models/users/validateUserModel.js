import getPool from '../../db/getPool.js';

const validateUserModel = async ({ email = '' }) => {
	const pool = await getPool();

	let query = `UPDATE users SET isEmailVerified = TRUE WHERE email = ?`;

	const queryParams = [`%${email}%`];

	// Si no queremos retornar nada, simplemente llamamos a modificar la tabla y capturamos un res.status 200 o error
	return await pool.query(query, queryParams);
};

export default validateUserModel;
