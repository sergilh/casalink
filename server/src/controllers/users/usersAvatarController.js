import insertAvatarModel from '../../models/users/insertAvatarModel.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';
import saveFileUtil from '../../utils/saveFileUtil.js';

// Controlador para manejar la subida de archivos (imágenes y videos)
const userAvatarController = async (req, res, next) => {
	try {
		const {id: userId} = req.user;
		const [ avatar ] = req.files;
		console.log('avatar', avatar);

		// Verificar si se subieron archivos
		if (!avatar || avatar.length === 0) {
			throw generateErrorUtil('No se ha subido el avatar.', 400);
		}

		const fileName = await saveFileUtil(avatar.buffer, avatar.fieldname, 300);
		const result = await insertAvatarModel(userId, fileName);

		if (!result.success) {
			throw generateErrorUtil(result.message, 400);
		} else {
			res.status(201).json({
				status: 'ok',
				message: 'Avatar actualizado correctamente',
				avatar: fileName,
			});
		}
	} catch (err) {
		next(err);
	}
};

export default userAvatarController;
