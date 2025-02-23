import bcrypt from 'bcrypt';
import getPool from '../../db/getPool.js';

const changePasswordController = async (req, res, next) => {
	try {
		const { id } = req.user;
		const { oldPassword, newPassword } = req.body;

		if (!oldPassword || !newPassword) {
			return res
				.status(400)
				.json({ message: 'Faltan datos obligatorios.' });
		}

		const pool = await getPool();

		const [user] = await pool.query(
			'SELECT password FROM users WHERE id = ?',
			[id]
		);

		if (!user.length) {
			return res.status(404).json({ message: 'Usuario no encontrado.' });
		}

		const validPassword = await bcrypt.compare(
			oldPassword,
			user[0].password
		);

		if (!validPassword) {
			return res
				.status(401)
				.json({ message: 'La contraseña actual es incorrecta.' });
		}

		const saltRounds = 10;
		const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

		await pool.query('UPDATE users SET password = ? WHERE id = ?', [
			hashedPassword,
			id,
		]);

		return res.status(200).json({
			message: 'Contraseña actualizada correctamente.',
		});
	} catch (error) {
		next(error);
	}
};

export default changePasswordController;
