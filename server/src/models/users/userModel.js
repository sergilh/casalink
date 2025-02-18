import getPool from '../../db/getPool.js';

const userModel = async ({ email = '' }) => {
	const pool = await getPool(); // Obtenemos la instancia del pool de conexiones

	// ✅ Si no se proporciona email, obtenemos todos los usuarios
	let query = `
    SELECT 
      u.id, 
      u.name, 
      u.email, 
      r.name AS role
    FROM users u
    LEFT JOIN userRoles ur ON u.id = ur.userId
    LEFT JOIN roles r ON ur.roleId = r.id
  `;

	const queryParams = [];

	// Si se proporciona un email, aplicamos el filtro en la consulta
	if (email) {
		query += ` WHERE u.email LIKE ?`;
		queryParams.push(`%${email}%`);
	}

	// ✅ Ejecutamos la consulta en la base de datos
	const [users] = await pool.query(query, queryParams);

	return users;
};

export default userModel;
