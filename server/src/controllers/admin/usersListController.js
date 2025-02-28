import getPool from '../../db/getPool.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const usersListController = async (req, res, next) => {
	try {
		const connection = await getPool();

		// Obtener filtros desde la query string
		const { email, id, name, lastName, updatedAt, createdAt, role } =
			req.query;

		// Base de la consulta SQL
		let sql = `SELECT id, name, lastName, email, avatarUrl, role, isEmailVerified, isOwner, createdAt, updatedAt FROM users`;
		let values = [];
		let conditions = [];

		// Aplicar filtros dinámicos
		if (id) {
			conditions.push(`id = ?`);
			values.push(id);
		}
		if (email) {
			conditions.push(`email LIKE ?`);
			values.push(`%${email}%`);
		}
		if (name) {
			conditions.push(`name LIKE ?`);
			values.push(`%${name}%`);
		}
		if (lastName) {
			conditions.push(`lastName LIKE ?`);
			values.push(`%${lastName}%`);
		}
		if (updatedAt) {
			conditions.push(`DATE(updatedAt) = ?`);
			values.push(updatedAt);
		}
		if (createdAt) {
			conditions.push(`DATE(createdAt) = ?`);
			values.push(createdAt);
		}
		if (role) {
			const validRoles = ['user', 'admin', 'superadmin'];
			if (validRoles.includes(role.toLowerCase())) {
				conditions.push(`role = ?`);
				values.push(role.toLowerCase());
			} else {
				throw generateErrorUtil(
					'El rol especificado no es válido. Debe ser user, admin o superadmin.',
					400
				);
			}
		}

		// Construir la consulta SQL final
		if (conditions.length > 0) {
			sql += ` WHERE ` + conditions.join(' AND ');
		}
		sql += ` ORDER BY createdAt DESC`;

		// Ejecutar consulta
		const [users] = await connection.query(sql, values);

		// Respuesta
		res.status(200).json({
			status: 'success',
			data: users,
		});
	} catch (error) {
		next(error);
	}
};

export default usersListController;
