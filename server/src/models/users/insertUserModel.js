import bcrypt from 'bcrypt';
import getPool from '../../db/getPool.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const insertUserModel = async (
	name,
	lastName,
	email,
	password,
	phone,
	legalId
) => {
	// Obtenemos el pool.
	const pool = await getPool();

	// Obtenemos la lista de usuarios con el email de usuario recibido.
	const [usersByEmail] = await pool.query(
		`SELECT id FROM users WHERE email = ?`,
		[email]
	);

	// Si existe algún usuario con ese email lanzamos un error.
	if (usersByEmail.length > 0) {
		generateErrorUtil('Ya hay un usuario registrado con ese email', 409);
	}

	// Obtenemos la lista de usuarios con el documento de identidad recibido.
	const [usersByLegalId] = await pool.query(
		`SELECT id FROM users WHERE legalId = ? AND legalId IS NOT NULL`,
		[legalId]
	);

	// Si existe algún usuario con ese email lanzamos un error.
	if (usersByLegalId.length > 0) {
		generateErrorUtil(
			'Ya hay un usuario registrado con ese documento de identidad',
			409
		);
	}

	// Hash del email, phone y password
	const hashedPhone = await bcrypt.hash(phone, 10);
	const hashedPassword = await bcrypt.hash(password, 10);

	await pool.query(
		`INSERT INTO users (name, lastName, email, password, phone, legalId, isEmailVerified)
				VALUES (?, ?, ?, ?, ?, ?, false)`,
		[name, lastName, email, hashedPassword, hashedPhone, legalId]
	);
};

export default insertUserModel;
