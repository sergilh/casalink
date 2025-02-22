import validateUserModel from '../../models/users/validateUserModel.js';

const validateUserController = async (req, res) => {
	try {
		const { email } = req.query; // Tomamos los filtros desde la URL
		await validateUserModel({ email });
		// TODO error al peticionar TypeError: res.status is not a function
		res.status(200).json({
			message: `El usuario {email} ha sido verificado`,
		});
	} catch (error) {
		res.status(500).json({
			error: 'Error al validar usuario',
			details: error.message,
		});
	}
};

export default validateUserController;
