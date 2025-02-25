import updatePropertyStatusModel from '../../models/properties/updatePropertyStatusModel.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const propertyStatusController = async (req, res, next) => {
	try {
		const { propertyId } = req.params;
		const { status } = req.body;

		// Modificar el status de la propiedad en la base de datos
		if (!(await updatePropertyStatusModel(propertyId, status))) {
			throw generateErrorUtil('Error al actualizar el status', 400);
		}

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
