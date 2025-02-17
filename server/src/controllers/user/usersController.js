import userModel from '../../models/users/userModel.js';

const usersController = async (req, res) => {
	try {
		const { email } = req.query; // Tomamos los filtros desde la URL

		const users = await userModel({ email });
		// TODO error al peticionar TypeError: res.status is not a function
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
