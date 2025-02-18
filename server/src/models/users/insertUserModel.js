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
	let [users] = await pool.query(`SELECT id FROM users WHERE email = ?`, [
		email,
	]);

	// Si existe algún usuario con ese email lanzamos un error.
	if (users.length > 0) {
		generateErrorUtil('Email no disponible', 409);
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
