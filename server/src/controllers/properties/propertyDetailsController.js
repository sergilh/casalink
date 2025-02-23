import selectPropertyByIdModel from '../../models/properties/selectPropertyByIdModel.js';
//FALTA PROBAR CON DATOS DE PRUEBA
const propertyDetailsController = async (req, res, next) => {
	try {
		const { id } = req.params;

		const property = await selectPropertyByIdModel(id);

		res.send({
			status: 'ok',
			message: 'Detalles de la propiedad',
			data: {
				property,
			},
		});
	} catch (err) {
		next(err);
	}
};

export default propertyDetailsController;
