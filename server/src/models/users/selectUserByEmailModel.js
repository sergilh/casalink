import getPool from '../../db/getPool.js';

const selectUserByEmailModel = async (email) => {
	const pool = await getPool();

	const [users] = await pool.query(
		`SELECT id, password, role, isEmailVerified FROM users WHERE email=?`,
		[email]
	);

	return users[0];
};
export default selectUserByEmailModel;
