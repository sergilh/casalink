import updatePropertyModel from '../../models/properties/updatePropertyModel.js';

const updatePropertyController = async (req, res, next) => {
	try {
		const { propertyId } = req.params;

		if (!propertyId) {
			throw new Error('ID de propiedad no recibido.');
		}

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

		return res.status(200).json({
			success: true,
			author: req.user.role,
			message: `Propiedad ${propertyId} actualizada correctamente`,
		});
	} catch (error) {
		next(error);
	}
};

export default updatePropertyController;
