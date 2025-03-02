import createPropertyModel from '../../models/properties/createPropertyModel.js';
// import generateErrorUtil from '../../utils/generateErrorUtil.js';

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
			hasEnergyCert, // ahora sí es un boolean real (true o false), gracias a Joi
			zipCode,
			location,
			squareMeters,
			bedrooms,
			bathrooms,
			price,
		} = req.body;

		// Convertimos el boolean a 1 o 0
		const certValue = hasEnergyCert === true ? 1 : 0;

		const propertyId = await createPropertyModel({
			userId,
			title,
			type,
			description,
			locality,
			street,
			number,
			floor,
			hasEnergyCert: certValue, // le pasamos 0 o 1 al modelo
			zipCode,
			location,
			squareMeters,
			bedrooms,
			bathrooms,
			price,
		});

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
