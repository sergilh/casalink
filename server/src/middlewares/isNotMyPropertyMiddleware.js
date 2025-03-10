// Utilidades para generar errores
import generateErrorUtil from '../utils/generateErrorUtil.js';

const isNotMyPropertyMiddleware = async (req, res, next) => {
	try {
		const { id: userId } = req.user; // ID del usuario autenticado (de authUserMiddleware)
		const { ownerId, propertyId } = req; // ID del dueño de la propiedad

		console.log('propiedadId', propertyId);
		console.log('ownerId', ownerId);
		console.log('userId', userId);

		if (ownerId == userId) {
			generateErrorUtil(
				'No puedes ejecutar esta acción si eres el dueño de la propiedad.',
				403
			);
		}

		next(); // Permitir que la solicitud continúe si es el dueño
	} catch (err) {
		next(err);
	}
};

export default isNotMyPropertyMiddleware;
