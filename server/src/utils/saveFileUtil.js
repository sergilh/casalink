import path from 'path';
import fs from 'fs/promises';
import sharp from 'sharp';
import crypto from 'crypto';

// Función para guardar archivos en el servidor
const saveFileUtil = async (fileBuffer, fileType, width = 500) => {
	try {
		// Determinar la carpeta de destino
		let folderPath;
		switch (fileType) {
			case 'image':
				folderPath = path.join(
					process.cwd(),
					'public',
					'uploads',
					'images'
				);
				break;
			case 'video':
				folderPath = path.join(
					process.cwd(),
					'public',
					'uploads',
					'videos'
				);
				break;
			case 'avatar':
				folderPath = path.join(
					process.cwd(),
					'public',
					'uploads',
					'avatars'
				);
				break;
			default:
				throw new Error('Tipo de archivo no reconocido.');
		}

		// Verificar si la carpeta existe, si no, crearla
		try {
			await fs.access(folderPath);
		} catch {
			await fs.mkdir(folderPath, { recursive: true });
		}

		// Generar un nombre único para el archivo
		const extension = fileType === 'video' ? '.mp4' : '.png';
		const fileName = `${crypto.randomUUID()}${extension}`;
		const filePath = path.join(folderPath, fileName);

		console.log(`Guardando archivo en: ${filePath}`);

		if (fileType === 'image' || fileType === 'avatar') {
			await sharp(fileBuffer)
				.resize(width)
				.toFormat('png')
				.toFile(filePath);
		} else {
			await fs.writeFile(filePath, fileBuffer);
		}

		return fileName;
	} catch (err) {
		console.error('Error al guardar el archivo en disco:', err);
		throw new Error(`Error al guardar el archivo en disco: ${err.message}`);
	}
};

export default saveFileUtil;
