import getPool from '../../db/getPool.js';

const userModel = async ({ email = '' }) => {
	const pool = await getPool(); // Obtenemos la conexión a la base de datos

	//  Si no se proporciona email, obtenemos todos los usuarios
	let query = `
		SELECT
			id,
			name,
			lastName,
			legalId,
			email,
			phone,
			avatarUrl,
			bio,
			role,
			isEmailVerified,
			isDocsVerified,
			createdAt,
			updatedAt
		FROM users
	`;
	const queryParams = [];

	//  Si se proporciona un email, filtramos por él
	if (email) {
		query += ` WHERE email LIKE ?`;
		queryParams.push(`%${email}%`);
	}

	//  Ejecutamos la consulta en la base de datos
	const [users] = await pool.query(query, queryParams);

	return users;
};

export default userModel;
