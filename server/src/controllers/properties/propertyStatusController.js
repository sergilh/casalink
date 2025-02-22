import propertyStatusModel from '../../models/properties/propertyStatusModel.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const propertyStatusController = async (req, res, next) => {
	try {
		const { propertyId, status } = req.params;

		// Verificar que todos los datos requeridos están presentes
		if (!status || !propertyId) {
			throw generateErrorUtil('Todos los campos son obligatorios', 400);
		}

		// Modificar el status de la propiedad en la base de datos
		await propertyStatusModel({
			status,
			propertyId,
		});

		// Respuesta exitosa
		res.status(201).json({
			success: true,
			message: `Status actualizado`,
			propertyId: propertyId.insertId,
		});
	} catch (error) {
		next(error);
	}
};

export default propertyStatusController;
