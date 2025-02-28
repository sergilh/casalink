import insertUserModel from '../../models/users/insertUserModel.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const usersRegisterController = async (req, res, next) => {
	try {
		// Obtenemos los datos del body.
		const { name, lastName, email, password, phone, legalId } = req.body;

		// Validación de datos obligatorios
		if (!name || !lastName || !email || !password || !phone || !legalId) {
			generateErrorUtil('Faltan campos para registrar un usuario', 400);
		}

		// Insertamos el usuario el la base de datos.
		const newUserId = await insertUserModel(
			name,
			lastName,
			email,
			password,
			phone,
			legalId
		);

		console.log(newUserId);

		res.status(201).json({
			status: 'success',
			message: 'Usuario registrado con éxito.',
			data: {
				newUserId: newUserId,
				name,
				lastName,
				email,
				phone,
				legalId,
			},
		});
	} catch (err) {
		next(err);
	}
};

export default usersRegisterController;
