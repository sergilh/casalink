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

		const validated = await validateUserModel({ email, validationCode });

		if (!validated) {
			generateErrorUtil('El usuario no ha sido verificado', 400);
		}

		res.status(200).json({
			message: `El usuario ${email} ha sido verificado`,
		});
	} catch (error) {
		console.error('Error al validar usuario:', error);
	}
};

export default validateUserController;
