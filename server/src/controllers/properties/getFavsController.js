import getPool from '../../db/getPool.js';

const getFavsController = async (req, res, next) => {
	try {
		const pool = await getPool();
		const { id: userId } = req.user;
		const { propertyId } = req.query; // Obtenemos el parámetro opcional

		let query = 'SELECT * FROM favs WHERE userId = ?';
		let params = [userId];

		// Si existe propertyId, añadimos el filtro
		if (propertyId) {
			query += ' AND propertyId = ?';
			params.push(propertyId);
		}

		const [favorites] = await pool.query(query, params);

		// Manejo específico cuando se solicita un propertyId
		if (propertyId) {
			if (favorites.length === 0) {
				return res.status(404).json({
					message: 'La propiedad no está en tus favoritos',
				});
			}

			return res.status(200).json({
				message: 'Favorito obtenido correctamente',
				data: favorites[0],
			});
		}

		// Respuesta normal cuando no se filtra por propertyId
		res.status(200).json({
			message:
				favorites.length > 0
					? 'Favoritos obtenidos correctamente'
					: 'No hay favoritos registrados',
			data: favorites,
		});
	} catch (error) {
		console.error('Error ejecutando la consulta:', error);
		next(error);
	}
};

export default getFavsController;
