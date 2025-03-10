import getPool from '../../db/getPool.js';

const favController = async (req, res, next) => {
	try {
		const pool = await getPool();

		// Obtener los parámetros desde la URL (query params)
		const { propertyId } = req.params;

		// Obtener el usuario que está haciendo la solicitud
		const { id: userId } = req.user;

		// Obtener los favoritos de la propiedad
		const [favorites] = await pool.query(
			`SELECT * FROM favs WHERE propertyId = ? AND userId = ?`,
			[propertyId, userId]
		);

		if (favorites && favorites.length > 0) {
			// Eliminar el favorito de la propiedad
			await pool.query(
				`DELETE FROM favs WHERE propertyId = ? AND userId = ?`,
				[propertyId, userId]
			);
			console.log('Eliminado favorito de la propiedad');
			res.status(200).json({ message: 'Favorito eliminado' });
			return;
		}

		// Agregar el favorito a la propiedad
		await pool.query(
			`INSERT INTO favs (userId, propertyId) VALUES (?, ?)`,
			[userId, propertyId]
		);
		console.log('Agregado favorito a la propiedad');
		res.status(200).json({ message: 'Favorito agregado' });
	} catch (error) {
		console.error('Error ejecutando la consulta:', error);
		next(error);
	}
};
export default favController;
