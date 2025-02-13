import jwt from 'jsonwebtoken';

import generateErrorUtil from '../utils/generateErrorUtil.js';

// Inicia el middleware.
const authUserMiddleware = async (req, res, next) => {
    try {
        const { authorization } = req.headers;

        if (!authorization) {
            generateErrorUtil('Falta la cabecera de autorización', 401);
        }

        try {
            const tokenInfo = jwt.verify(authorization, process.env.SECRET);

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
