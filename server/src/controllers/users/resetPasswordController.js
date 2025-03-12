import bcrypt from 'bcrypt';
import getPool from '../../db/getPool.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const resetPasswordController = async (req, res, next) => {
	try {
		const { newPassword, recoveryCode, email } = req.body;

		if (!recoveryCode || !newPassword) {
			res.send({
				status: 'error',
				message: 'Faltan datos obligatorios.',
			});
			generateErrorUtil('Faltan datos obligatorios.', 400);
			/*
			return res
				.status(400)
				.json({ message: 'Faltan datos obligatorios.' });
			*/
		}

		const pool = await getPool();

		const [user] = await pool.query(
			'SELECT password, recoveryCode FROM users WHERE email = ?',
			[email]
		);

		console.log('user:', user);

		if (!user.length) {
			res.send({
				status: 'error',
				message: 'Usuario no encontrado.',
			});
			generateErrorUtil('Usuario no encontrado.', 404);
			//return res.status(404).json({ message: 'Usuario no encontrado.' });
		}

		if (recoveryCode !== user[0].recoveryCode) {
			res.send({
				status: 'error',
				message: 'El código de recuperación es incorrecto.',
			});
			generateErrorUtil(
				'El usuario ya ha solicitado una nueva contraseña. Por favor, solicita un nuevo correo si necesitas cambiar tu contraseña.',
				401
			);
			/*
			return res
				.status(401)
				.json({ message: 'El código de recuperación es incorrecto.' });
			*/
		}

		const saltRounds = 10;
		const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

		await pool.query(
			'UPDATE users SET password = ?, recoveryCode = NULL WHERE email = ?',
			[hashedPassword, email]
		);

		return res.status(200).json({
			status: 'ok',
			message: 'Contraseña actualizada correctamente.',
		});
	} catch (error) {
		next(error);
	}
};

export default resetPasswordController;
