import createPropertyModel from '../../models/properties/createPropertyModel.js';
//import generateErrorUtil from '../../utils/generateErrorUtil.js';

const propertyController = async (req, res, next) => {
	try {
		const { id: userId } = req.user; // ID del usuario autenticado
		const {
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

		/* Con JOI ya no hace falta validar los datos, ya que se hace en el
		// Verificar que todos los datos requeridos están presentes
		if (
			!title ||
			!description ||
			!zipCode ||
			!squareMeters ||
			!bedrooms ||
			!bathrooms ||
			!price
		) {
			throw generateErrorUtil('Todos los campos son obligatorios', 400);
		}
		*/

		// Crear la propiedad en la base de datos
		const propertyId = await createPropertyModel({
			userId,
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
		});

		// Respuesta exitosa
		res.status(201).json({
			success: true,
			message: `Propiedad '${title}' creada exitosamente`,
			propertyId: propertyId.insertId,
		});
	} catch (error) {
		next(error);
	}
};

export default propertyController;
