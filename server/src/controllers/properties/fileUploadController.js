import insertFileModel from '../../models/properties/insertFileModel.js';
import saveFileUtil from '../../utils/saveFileUtil.js';

// Controlador para manejar la subida de archivos (imágenes y videos)
const fileUploadController = async (req, res, next) => {
	try {
		// Verificar si se subieron archivos
		if (!req.files || req.files.length === 0) {
			return res
				.status(400)
				.json({ error: 'No se han subido archivos.' });
		}

		const { propertyId } = req.params;

		// Procesar y guardar cada archivo
		const savedFiles = [];
		for (let i = 0; i < req.files.length; i++) {
			const file = req.files[i];

			// Determinar el tipo de archivo
			const isImage = /jpeg|jpg|png|gif/.test(file.mimetype);
			const isVideo = /mp4|mov|avi|mkv/.test(file.mimetype);

			if (!isImage && !isVideo) {
				return res
					.status(400)
					.json({ error: 'Formato de archivo no permitido.' });
			}

			const fileType = isImage ? 'image' : 'video';
			const fileName = await saveFileUtil(file.buffer, fileType);
			await insertFileModel(propertyId, fileName, fileType, i + 1);
			savedFiles.push({ name: fileName, type: fileType });
		}

		res.status(201).json({
			status: 'ok',
			message: 'Archivos subidos con éxito',
			files: savedFiles,
		});
	} catch (err) {
		next(err);
	}
};

export default fileUploadController;
