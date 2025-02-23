// Pool de conexiones a la base de datos
import getPool from '../db/getPool.js';

// Utilidades para generar errores
import generateErrorUtil from '../utils/generateErrorUtil.js';

const authOwnerMiddleware = async (req, res, next) => {
	try {
		const { id: userId } = req.user; // ID del usuario autenticado (de authUserMiddleware)
		const { id: propertyId } = req.params; // ID de la propiedad desde la URL

		// Consultar si la propiedad pertenece al usuario autenticado
		const pool = await getPool();
		const [property] = await pool.query(
			'SELECT ownerId FROM properties WHERE id = ?',
			[propertyId]
		);

		if (property[0].ownerId !== userId) {
			generateErrorUtil(
				'Acceso denegado. No eres el propietario de esta propiedad.',
				403
			);
		}

		next(); // Permitir que la solicitud continúe si es el dueño
	} catch (err) {
		next(err);
	}
};

export default authOwnerMiddleware;
