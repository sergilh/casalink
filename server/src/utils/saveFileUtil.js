import path from 'path';
import fs from 'fs/promises';
import sharp from 'sharp';
import crypto from 'crypto';
import generateErrorUtil from './generateErrorUtil.js';

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
				throw generateErrorUtil('Tipo de archivo no reconocido.', 400);
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
			// Procesar y guardar imagen con Sharp
			await sharp(fileBuffer)
				.resize(width)
				.toFormat('png')
				.toFile(filePath);
		} else {
			// Guardar video sin modificar
			await fs.writeFile(filePath, fileBuffer);
		}

		return fileName; // Retornar el nombre del archivo guardado
	} catch (err) {
		throw generateErrorUtil(
			`Error al guardar el archivo en disco: ${err.message}`,
			400
		);
	}
};

export default saveFileUtil;
