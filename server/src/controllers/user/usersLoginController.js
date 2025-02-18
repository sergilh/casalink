import generateErrorUtil from '../../utils/generateErrorUtil.js';
import selectUserByEmailModel from '../../models/users/selectUserByEmailModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const usersLoginController = async (req, res, next) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			generateErrorUtil('Faltan campos', 404);
		}

		//const user = await selectUserByEmailModel(email);
    
		let isPassValid;

		if (user) {
			isPassValid = await bcrypt.compare(password, user.password);
		}

		if (!isPassValid) {
			generateErrorUtil('Credenciales inválidas', 400);
		}

		//Aquí ya tenemos claro que existe y está logueado, generamos el token
		if (!user.isEmailVerified) {
			generateErrorUtil('Usuario pendiente de verificación');
		}

		const tokenInfo = {
			id: user.id,
			role: user.role,
		};

		const token = jwt.sign(tokenInfo, process.env.JWT_SECRET, {
			expiresIn: '7d',
		});

		res.send({
			status: 'ok',
			message: 'Usuario logueado',
		});
	} catch (err) {
		next(err);
	}
};

export default usersLoginController;
