import getPool from '../../db/getPool.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const validateUserModel = async ({ email, validationCode }) => {
	const pool = await getPool();

	const [[{ isEmailVerified, recoveryCode }]] = await pool.query(
		`SELECT isEmailVerified, recoveryCode FROM users WHERE email=?`,
		[email]
	);

	if (isEmailVerified) {
		generateErrorUtil('El usuario ya ha sido verificado', 400);
	}

	if (recoveryCode !== validationCode) {
		generateErrorUtil(`El código de validación no es correcto`, 400);
	}

	const [{ verification }] = await pool.query(
		`UPDATE users SET isEmailVerified = TRUE, recoveryCode = NULL WHERE email = ?;`,
		[email]
	);

	console.log(verification);
	return verification;
};

export default validateUserModel;
