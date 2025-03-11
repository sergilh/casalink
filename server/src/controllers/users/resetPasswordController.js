import bcrypt from 'bcrypt';
import getPool from '../../db/getPool.js';

const resetPasswordController = async (req, res, next) => {
	try {
		const { newPassword, recoveryCode, email } = req.body;

		if (!recoveryCode || !newPassword) {
			return res
				.status(400)
				.json({ message: 'Faltan datos obligatorios.' });
		}

		const pool = await getPool();

		const [user] = await pool.query(
			'SELECT password, recoveryCode FROM users WHERE email = ?',
			[email]
		);

		console.log('user:', user);

		if (!user.length) {
			return res.status(404).json({ message: 'Usuario no encontrado.' });
		}

		if (recoveryCode !== user[0].recoveryCode) {
			return res
				.status(401)
				.json({ message: 'El código de recuperación es incorrecto.' });
		}

		const saltRounds = 10;
		const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

		await pool.query('UPDATE users SET password = ? WHERE email = ?', [
			hashedPassword,
			email,
		]);

		return res.status(200).json({
			message: 'Contraseña actualizada correctamente.',
		});
	} catch (error) {
		next(error);
	}
};

export default resetPasswordController;
