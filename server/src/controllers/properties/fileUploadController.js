import insertFileModel from '../../models/properties/insertFileModel.js';
import saveFileUtil from '../../utils/saveFileUtil.js';
import getPool from '../../db/getPool.js';

// Controlador para manejar la subida de archivos (imágenes y videos)
const fileUploadController = async (req, res, next) => {
	console.log('📌 fileUploadController se está ejecutando');
	console.log(
		'Archivos recibidos en el backend:',
		req.uploadedFiles || req.files
	);
	console.log(
		'Contenido exacto de req.uploadedFiles:',
		JSON.stringify(req.uploadedFiles || req.files, null, 2)
	);

	try {
		const db = await getPool();

		if (!req.files || req.files.length === 0) {
			return res
				.status(400)
				.json({ error: 'No se han subido archivos.' });
		}

		const { propertyId } = req.params;

		// Consultar la propiedad en la base de datos
		const [property] = await db.query(
			'SELECT ownerId FROM properties WHERE id = ?',
			[propertyId]
		);

		// Validar si el usuario tiene permisos para modificar la propiedad
		if (
			!property ||
			(req.user.role !== 'admin' && property.ownerId !== req.user.id)
		) {
			return res.status(403).json({
				error: 'No tienes permisos para modificar esta propiedad.',
			});
		}

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
