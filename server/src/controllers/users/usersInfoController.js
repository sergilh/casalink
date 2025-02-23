import getPool from '../../db/getPool.js';

// Controlador para obtener la información del usuario verificado
const usersInfoController = async (req, res, next) => {
	try {
		// Extraer el ID del usuario autenticado desde el token
		const { id } = req.user;

		// Obtener la conexión al pool de la base de datos
		const pool = await getPool(); // <-- Añadir await

		// Obtener los datos del usuario desde la base de datos
		const [user] = await pool.query(
			`SELECT id, name, lastName, email, phone, avatarUrl, isEmailVerified, isDocsVerified, createdAt 
			FROM users WHERE id = ?`,
			[id]
		);

		if (user.length === 0) {
			return res.status(404).json({ error: 'Usuario no encontrado' });
		}

		// Responder con los datos del usuario
		res.json({ user: user[0] });
	} catch (error) {
		next(error);
	}
};

export default usersInfoController;
