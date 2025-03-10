import generateErrorUtil from '../utils/generateErrorUtil.js';

const authAPIMiddleware = (req, res, next) => {
	const apiKey = req.headers['x-api-key'];
	if (!apiKey || apiKey !== process.env.EMAIL_API_KEY) {
		generateErrorUtil('Acceso al API no autorizado', 403);
	}
	next();
};

export default authAPIMiddleware;
