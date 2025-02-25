import multer from 'multer';
import path from 'path';

// Almacenamiento en memoria temporal
const storage = multer.memoryStorage();

// Filtro para aceptar solo imágenes y videos
const fileFilter = (req, file, cb) => {
	const formatosPermitidos = /jpeg|jpg|png/;
	const esValido =
		formatosPermitidos.test(
			path.extname(file.originalname).toLowerCase()
		) && formatosPermitidos.test(file.mimetype);

	if (esValido) {
		cb(null, true);
	} else {
		cb(
			new Error(
				'Formato no permitido. Solo se aceptan imágenes (JPEG y PNG).'
			)
		);
	}
};

// Configuración de multer
const upload = multer({
	storage,
	limits: { fileSize: 5 * 1024 * 1024 }, // Límite de 50MB
	fileFilter,
});

// Middleware para subir múltiples archivos
export const avatarUploadMiddleware = upload.array('avatar', 1);
