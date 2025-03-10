import getPool from '../../db/getPool.js';

const usersNotificationsController = async (req, res, next) => {
	try {
		const pool = await getPool();

		// Obtener los parámetros desde la URL (query params)
		const { id } = req.user;

		// Obtener los datos de las notificaciones del usuario
		const [notifications] = await pool.query(
			`SELECT * FROM notifications WHERE userId = ? ORDER BY createdAt DESC LIMIT 10 OFFSET 0`,
			[id]
		);

		res.status(200).json({ notifications });
	} catch (error) {
		console.error('Error ejecutando la consulta:', error);
		next(error);
	}
};

export default usersNotificationsController;
