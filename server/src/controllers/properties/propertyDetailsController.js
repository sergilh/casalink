import selectPropertyByIdModel from '../../models/properties/selectPropertyByIdModel.js';
//FALTA PROBAR CON DATOS DE PRUEBA
const propertyDetailsController = async (req, res, next) => {
	try {
		const { propertyId } = req.params;

		const property = await selectPropertyByIdModel(propertyId);

		if (!property) {
			return res.status(404).json({
				status: 'error',
				message: 'Propiedad no encontrada',
			});
		}

		res.send({
			status: 'ok',
			message: 'Detalles de la propiedad',
			data: property, // 💡 SE ENVÍA DIRECTAMENTE, NO DENTRO DE OTRO OBJETO
		});
	} catch (err) {
		next(err);
	}
};

export default propertyDetailsController;
