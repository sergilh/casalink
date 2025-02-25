import fs from 'fs/promises';
import path from 'path';

const deleteOldAvatarUtil = async (oldAvatarUrl) => {
	// Si el usuario ya tiene un avatar, eliminar el archivo existente
	if (oldAvatarUrl) {
		const avatarPath = path.join(
			process.cwd(),
			'uploads',
			'avatars',
			oldAvatarUrl
		);

		await fs.unlink(avatarPath);
		console.log(`Avatar eliminado: ${avatarPath}`);
	}
};

export default deleteOldAvatarUtil;
