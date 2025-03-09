import getPool from '../../db/getPool.js';

const getFavsController = async (req, res, next) => {
	try {
		const pool = await getPool();

		// Obtener los parámetros desde la URL (query params)
		const { id: userId } = req.user;

		console.log('userId', userId);

		// Obtener los favoritos de la propiedad
		const [favorites] = await pool.query(
			`SELECT * FROM favs WHERE userId = ?`,
			[userId]
		);

		if (!favorites) {
			res.status(200).json({ message: 'No hay favoritos' });
			return;
		}

		res.status(200).json({
			message: 'Favoritos obtenidos correctamente',
			data: favorites,
		});
	} catch (error) {
		console.error('Error ejecutando la consulta:', error);
		next(error);
	}
};

export default getFavsController;
