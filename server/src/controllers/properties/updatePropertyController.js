import updatePropertyModel from '../../models/properties/updatePropertyModel.js';

const updatePropertyController = async (req, res, next) => {
	try {
		// Obtenemos el ID de la propiedad desde los parámetros de la ruta
		const { propertyId } = req.params;

		// Datos a actualizar
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

		// Llamamos al modelo que actualiza la propiedad en la base de datos
		await updatePropertyModel(propertyId, {
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
		return res.status(200).json({
			success: true,
			message: `Propiedad ${propertyId} actualizada correctamente`,
		});
	} catch (error) {
		next(error);
	}
};

export default updatePropertyController;
