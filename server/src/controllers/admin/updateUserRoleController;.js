import getPool from '../../db/getPool.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const updateUserRoleController = async (req, res, next) => {
	try {
		const connection = await getPool();

		const { userId, newRole } = req.params;

		// Validar que el nuevo rol sea válido
		const validRoles = ['user', 'admin', 'superadmin'];
		if (!validRoles.includes(newRole.toLowerCase())) {
			return res.status(400).json({
				status: 'error',
				message:
					'Rol inválido. Solo se permiten user, admin o superadmin.',
			});
		}

		// Obtener información del usuario a modificar
		const [[user]] = await connection.query(
			`SELECT id, role FROM users WHERE id = ?`,
			[userId]
		);

		if (!user) {
			generateErrorUtil('Usuario no encontrado', 404);
		}

		// Prevenir que un superadmin pierda su rol
		if (user.role === 'superadmin' && newRole !== 'superadmin') {
			generateErrorUtil(
				'No puedes degradar a un superadmin a otro rol.',
				403
			);
		}

		// Actualizar el rol en la base de datos
		await connection.query(
			`UPDATE users SET role = ?, updatedAt = NOW() WHERE id = ?`,
			[newRole, userId]
		);

		// Responder con éxito
		res.status(200).json({
			status: 'success',
			message: `El rol del usuario ${userId} ha sido actualizado a ${newRole}.`,
		});
	} catch (error) {
		next(error);
	}
};

export default updateUserRoleController;
