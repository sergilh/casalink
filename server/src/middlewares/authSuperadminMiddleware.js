import jwt from 'jsonwebtoken';
import generateErrorUtil from '../utils/generateErrorUtil.js';
import getPool from '../db/getPool.js';

const authSuperadminMiddleware = async (req, res, next) => {
	try {
		const { authorization } = req.headers;

		if (!authorization) {
			throw generateErrorUtil('Token requerido', 401);
		}

		// Verificamos el token
		const decoded = jwt.verify(authorization, process.env.JWT_SECRET);

		// Buscamos al usuario en la base de datos
		const pool = await getPool();
		const [user] = await pool.query(
			`SELECT id, role FROM users WHERE id = ?`,
			[decoded.id]
		);

		if (!user) {
			throw generateErrorUtil('Usuario no encontrado', 404);
		}

		const validRoles = ['superadmin'];

		if (!validRoles.includes(decoded.role)) {
			throw generateErrorUtil(
				`Acceso denegado: Se requieren permisos de super administrador (${[decoded.role]})`,
				403
			);
		}

		// Agregamos los datos del usuario a la request
		req.user = user;
		req.adminLevel = decoded.role;

		next();
	} catch (error) {
		next(error);
	}
};

export default authSuperadminMiddleware;
