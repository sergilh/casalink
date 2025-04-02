import userModel from '../../models/users/userModel.js';

const usersController = async (req, res) => {
	try {
		const { email } = req.query; // Captura el email si se envía en la URL

		//  Obtenemos los usuarios desde el modelo
		const users = await userModel({ email });

		//  Si no se encuentran usuarios, enviamos un error 404
		if (!users || users.length === 0) {
			return res.status(404).json({
				message: 'No se encontraron usuarios con el criterio dado',
				users: [],
			});
		}

		//  Si todo está bien, devolvemos la lista de usuarios
		res.status(200).json({
			message: 'Lista de usuarios obtenida correctamente',
			users,
		});
	} catch (error) {
		res.status(500).json({
			error: 'Error al obtener la lista de usuarios',
			details: error.message,
		});
	}
};

export default usersController;
