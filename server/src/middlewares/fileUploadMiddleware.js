import multer from 'multer';
import path from 'path';

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
	const formatosPermitidos = /jpeg|jpg|png|gif|mp4|mov|avi|mkv/;
	const esValido =
		formatosPermitidos.test(
			path.extname(file.originalname).toLowerCase()
		) && formatosPermitidos.test(file.mimetype);

	if (esValido) {
		cb(null, true);
	} else {
		cb(
			new Error(
				'Formato no permitido. Solo se aceptan imágenes y videos.'
			)
		);
	}
};

const upload = multer({
	storage,
	limits: { fileSize: 50 * 1024 * 1024 }, // Límite de 50MB
	fileFilter,
});

export const fileUploadMiddleware = (req, res, next) => {
	upload.array('files', 10)(req, res, (err) => {
		console.log('📂 Archivos recibidos en el middleware:', req.files);
		if (err) {
			return res.status(400).json({ error: err.message });
		}

		console.log(
			'✅ fileUploadMiddleware ejecutado correctamente, llamando a next()'
		);

		// Guardamos los archivos en una nueva variable en req para evitar que se pierdan
		req.uploadedFiles = req.files;

		next();
	});
};
