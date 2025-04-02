import createPropertyModel from '../../models/properties/createPropertyModel.js';
import insertFileModel from '../../models/properties/insertFileModel.js';
import saveFileUtil from '../../utils/saveFileUtil.js';

const propertyController = async (req, res, next) => {
	try {
		const { id: userId } = req.user;
		let {
			title,
			type,
			description,
			locality,
			street,
			number,
			floor,
			hasEnergyCert,
			zipCode,
			location,
			squareMeters,
			bedrooms,
			bathrooms,
			price,
		} = req.body;

		console.log(
			'📸 Imágenes recibidas en la creación de propiedad:',
			req.files
		);

		// 🛑 Validar que los campos obligatorios no estén vacíos o sean nulos
		if (
			!title ||
			!type ||
			!description ||
			!locality ||
			!street ||
			!number ||
			!zipCode ||
			!squareMeters ||
			!bedrooms ||
			!bathrooms ||
			!price
		) {
			return res.status(400).json({
				error: 'Todos los campos son obligatorios.',
			});
		}

		// Convertir hasEnergyCert a 0 o 1 comparando con la cadena "true"
		const certValue = hasEnergyCert === 'true' ? 1 : 0;

		// 1️⃣ Crear la propiedad en la base de datos y obtener su ID
		const propertyId = await createPropertyModel({
			userId,
			title,
			type,
			description,
			locality,
			street,
			number,
			floor,
			hasEnergyCert: certValue, // se pasa 1 o 0
			zipCode,
			location,
			squareMeters,
			bedrooms,
			bathrooms,
			price,
		});

		console.log(`🏠 Propiedad creada con ID: ${propertyId.insertId}`);

		// 2️⃣ Guardar las imágenes en disco y asociarlas a la propiedad
		const savedFiles = [];
		if (req.files && req.files.length > 0) {
			for (let i = 0; i < req.files.length; i++) {
				const file = req.files[i];
				const isImage = /jpeg|jpg|png|gif/.test(file.mimetype);
				const isVideo = /mp4|mov|avi|mkv/.test(file.mimetype);

				if (!isImage && !isVideo) {
					return res
						.status(400)
						.json({ error: 'Formato de archivo no permitido.' });
				}

				const fileType = isImage ? 'image' : 'video';
				const fileName = await saveFileUtil(file.buffer, fileType);
				await insertFileModel(
					propertyId.insertId,
					fileName,
					fileType,
					i + 1
				);
				savedFiles.push({ name: fileName, type: fileType });
			}
		}

		res.status(201).json({
			success: true,
			message: `Propiedad '${title}' creada exitosamente con imágenes`,
			propertyId: propertyId.insertId,
			files: savedFiles,
		});
	} catch (error) {
		next(error);
	}
};

export default propertyController;
