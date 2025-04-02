import getPool from '../../db/getPool.js';
import fs from 'fs/promises';
import path from 'path';

const userAvatarModel = async (userId, newAvatarUrl) => {
	const pool = await getPool();
	// Obtener el avatar actual del usuario
	const [[{ avatarUrl: oldAvatarUrl }]] = await pool.query(
		'SELECT avatarUrl FROM users WHERE id = ?',
		[userId]
	);
	console.log('oldAvatarUrl:', oldAvatarUrl);
	try {
		if (oldAvatarUrl) {
			const avatarPath = path.join(
				process.cwd(),
				'public',
				'uploads',
				'avatars',
				oldAvatarUrl
			);

			await fs.unlink(avatarPath);
			console.log(`Avatar eliminado: ${avatarPath}`);
		}
		// Guardar el nuevo avatar en la base de datos
		await pool.query('UPDATE users SET avatarUrl = ? WHERE id = ?', [
			newAvatarUrl,
			userId,
		]);
		return { success: true, message: 'Avatar actualizado correctamente' };
	} catch (error) {
		console.log(error);
	}
};

export default userAvatarModel;
