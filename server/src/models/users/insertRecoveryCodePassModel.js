import getPool from '../../db/getPool.js';

const insertRecoveryCodePassModel = async (recoveryCode, email) => {
	const pool = await getPool();

	const now = new Date();

	await pool.query(
		`
        UPDATE users SET recoveryCode=?, updatedAt=? WHERE email=?`,
		[recoveryCode, now, email]
	);
};

export default insertRecoveryCodePassModel;
