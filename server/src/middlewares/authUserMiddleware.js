import jwt from 'jsonwebtoken';
import generateErrorUtil from '../utils/generateErrorUtil.js';

// Middleware para autenticar al usuario mediante JWT
const authUserMiddleware = async (req, res, next) => {
	try {
		// Accede a los headers y obtiene el token
		const { authorization } = req.headers;

		// Si no hay token, lanza un error
		if (!authorization) {
			return next(
				generateErrorUtil('Falta la cabecera de autorización', 401)
			);
		}

		// Extraer solo el token si viene con el prefijo "Bearer"
		const token = authorization.startsWith('Bearer ')
			? authorization.split(' ')[1] // Si viene con "Bearer ", quitarlo
			: authorization;

		try {
			// Verificar el token
			const tokenInfo = jwt.verify(token, process.env.JWT_SECRET);
			req.user = tokenInfo; // Guardar la información del usuario en `req.user`

			next();
		} catch (err) {
			console.error('Error verificando el token:', err);
			return next(generateErrorUtil('Token inválido', 403));
		}
	} catch (err) {
		next(err);
	}
};

export default authUserMiddleware;
