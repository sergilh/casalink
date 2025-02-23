import 'dotenv/config';
import getPool from './getPool.js';
import bcrypt from 'bcrypt';

const {
	SUPERADMIN_NAME,
	SUPERADMIN_LASTNAME,
	SUPERADMIN_LEGAL_ID,
	SUPERADMIN_EMAIL,
	SUPERADMIN_PASSWORD,
	SUPERADMIN_PHONE,
	SUPERADMIN_BIO,
	ADMIN_NAME,
	ADMIN_LASTNAME,
	ADMIN_LEGAL_ID,
	ADMIN_EMAIL,
	ADMIN_PASSWORD,
	ADMIN_PHONE,
	ADMIN_BIO,
	USER_NAME,
	USER_LASTNAME,
	USER_LEGAL_ID,
	USER_EMAIL,
	USER_PASSWORD,
	USER_PHONE,
	USER_BIO,
} = process.env;

// Datos de los usuarios
const users = [
	{
		name: SUPERADMIN_NAME,
		lastName: SUPERADMIN_LASTNAME,
		legalId: SUPERADMIN_LEGAL_ID,
		email: SUPERADMIN_EMAIL,
		password: SUPERADMIN_PASSWORD,
		phone: SUPERADMIN_PHONE,
		bio: SUPERADMIN_BIO,
		role: 'superadmin',
	},
	{
		name: ADMIN_NAME,
		lastName: ADMIN_LASTNAME,
		legalId: ADMIN_LEGAL_ID,
		email: ADMIN_EMAIL,
		password: ADMIN_PASSWORD,
		phone: ADMIN_PHONE,
		bio: ADMIN_BIO,
		role: 'admin',
	},
	{
		name: USER_NAME,
		lastName: USER_LASTNAME,
		legalId: USER_LEGAL_ID,
		email: USER_EMAIL,
		password: USER_PASSWORD,
		phone: USER_PHONE,
		bio: USER_BIO,
		role: 'user',
	},
];

const pool = await getPool();

const seedUsers = async () => {
	try {
		console.log('Conectado a la base de datos');

		for (const user of users) {
			if (user.email !== '') {
				const hashedPhone = await bcrypt.hash(user.phone, 10);
				const hashedPassword = await bcrypt.hash(user.password, 10);

				const query = `INSERT INTO users (name, lastName, legalId, email, password, phone, bio, role, isEmailVerified, isDocsVerified) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1, 1)`;
				const values = [
					user.name,
					user.lastName,
					user.legalId,
					user.email,
					hashedPassword,
					hashedPhone,
					user.bio,
					user.role,
				];
				//console.log(JSON.stringify(values));
				await pool.execute(query, values);
				console.log(
					`Usuario ${user.name} ('${user.role}') insertado correctamente.`
				);
			}
		}
		console.log(`Semillas de datos de usuarios insertadas correctamente.`);
		process.exit(0);
	} catch (error) {
		console.error(`Error insertando usuarios:\n`, error);
		process.exit(1);
	}
};

seedUsers();
