import jwt from 'jsonwebtoken';

import generateErrorUtil from '../utils/generateErrorUtil.js';

console.log('JWT_SECRET:', process.env.JWT_SECRET);

// Inicia el middleware.
const authUserMiddleware = async (req, res, next) => {
	try {
		//accede a los headers
		const { authorization } = req.headers;
		//si no hay header lanza error
		if (!authorization) {
			generateErrorUtil('Falta la cabecera de autorización', 401);
		}
		//si hay header lo desencripta
		try {
			const tokenInfo = jwt.verify(authorization, process.env.JWT_SECRET);
			//agregar el token al objero user en el objero req
			req.user = tokenInfo;

			next();
		} catch (err) {
			console.error(err);

			throw new Error('Token inválido');
		}
	} catch (err) {
		next(err);
	}
};

export default authUserMiddleware;
