import path from 'path';
import fs from 'fs/promises';
import sharp from 'sharp';
import crypto from 'crypto';

// Función para guardar archivos en el servidor
const saveFileUtil = async (fileBuffer, fileType, width = 500) => {
	try {
		// Determinar la carpeta de destino
		const folderPath =
			fileType === 'video'
				? path.join(process.cwd(), 'public/videos')
				: path.join(process.cwd(), 'public/images');

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

		if (fileType === 'image') {
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
		console.error('Error al guardar el archivo en disco:', err);
		throw new Error(`Error al guardar el archivo en disco: ${err.message}`);
	}
};

export default saveFileUtil;
