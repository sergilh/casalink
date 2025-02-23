import validateUserModel from '../../models/users/validateUserModel.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const validateUserController = async (req, res) => {
	try {
		const { email, validationCode } = req.query; // Tomamos los filtros desde la URL

		if (!email) {
			generateErrorUtil('Faltan el campo email', 400);
		}

		if (!validationCode) {
			generateErrorUtil('Faltan el campo validationCode', 400);
		}

		await validateUserModel({ email, validationCode });

		// TODO error al peticionar TypeError: res.status is not a function
		res.status(200).json({
			message: `El usuario ${email} ha sido verificado`,
		});
	} catch (error) {
		res.status(500).json({
			error: 'Error al validar usuario',
			details: error.message,
		});
	}
};

export default validateUserController;
