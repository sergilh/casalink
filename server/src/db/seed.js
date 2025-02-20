import 'dotenv/config';
import getPool from './getPool.js';
import bcrypt from 'bcrypt';

const {
	SUPERADMIN_EMAIL,
	SUPERADMIN_PASSWORD,
	SUPERADMIN_NAME,
	SUPERADMIN_LASTNAME,
	SUPERADMIN_PHONE,
	USER_EMAIL,
	USER_PASSWORD,
	USER_NAME,
	USER_LASTNAME,
	USER_PHONE,
	ADMIN1_EMAIL,
	ADMIN1_PASSWORD,
	ADMIN1_NAME,
	ADMIN1_LASTNAME,
	ADMIN1_PHONE,
	ADMIN2_EMAIL,
	ADMIN2_PASSWORD,
	ADMIN2_NAME,
	ADMIN2_LASTNAME,
	ADMIN2_PHONE,
	ADMIN3_EMAIL,
	ADMIN3_PASSWORD,
	ADMIN3_NAME,
	ADMIN3_LASTNAME,
	ADMIN3_PHONE,
	ADMIN4_EMAIL,
	ADMIN4_PASSWORD,
	ADMIN4_NAME,
	ADMIN4_LASTNAME,
	ADMIN4_PHONE,
} = process.env;

// Datos de los usuarios
const users = [
	{
		name: SUPERADMIN_NAME,
		lastName: SUPERADMIN_LASTNAME,
		email: SUPERADMIN_EMAIL,
		phone: SUPERADMIN_PHONE,
		role: 'superadmin',
		password: SUPERADMIN_PASSWORD,
	},
	{
		name: USER_NAME,
		lastName: USER_LASTNAME,
		email: USER_EMAIL,
		phone: USER_PHONE,
		role: 'user',
		password: USER_PASSWORD,
	},
	{
		name: ADMIN1_NAME,
		lastName: ADMIN1_LASTNAME,
		email: ADMIN1_EMAIL,
		phone: ADMIN1_PHONE,
		role: 'admin',
		password: ADMIN1_PASSWORD,
	},
	{
		name: ADMIN2_NAME,
		lastName: ADMIN2_LASTNAME,
		email: ADMIN2_EMAIL,
		phone: ADMIN2_PHONE,
		role: 'admin',
		password: ADMIN2_PASSWORD,
	},
	{
		name: ADMIN3_NAME,
		lastName: ADMIN3_LASTNAME,
		email: ADMIN3_EMAIL,
		phone: ADMIN3_PHONE,
		role: 'admin',
		password: ADMIN3_PASSWORD,
	},
	{
		name: ADMIN4_NAME,
		lastName: ADMIN4_LASTNAME,
		email: ADMIN4_EMAIL,
		phone: ADMIN4_PHONE,
		role: 'admin',
		password: ADMIN4_PASSWORD,
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

				const query = `INSERT INTO users (name, lastName, email, password, phone, role, isEmailVerified) VALUES (?, ?, ?, ?, ?, ?, ?)`;
				const values = [
					user.name,
					user.lastName,
					user.email,
					hashedPassword,
					hashedPhone,
					user.role,
					1,
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