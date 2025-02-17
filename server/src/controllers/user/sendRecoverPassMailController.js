import generateErrorUtil from '../../utils/generateErrorUtil.js';
import selectUserByEmailModel from '../../models/users/selectUserByEmailModel.js';
import insertRecoveryCodePassModel from '../../models/users/insertRecoveryCodePassModel.js';
import sendMailUtil from '../../utils/sendMailUtil.js';
import 'dotenv/config';
import crypto from 'crypto';

const sendRecoverPassMailController = async (req, res, next) => {
	try {
		const { email } = req.body;

		if (!email) {
			generateErrorUtil('Faltan campos', 400);
		}
		const user = await selectUserByEmailModel(email);

		if (!user) {
			generateErrorUtil(
				'El email proporcionado no está asociado a ninguna cuenta'
			);
		}

		//A partir de aquí la función ya ha comprobado que existe el usuario con ese mail.
		const recoveryCode = crypto.randomBytes(15).toString('hex');

		await insertRecoveryCodePassModel(recoveryCode, email);
		//Aquí el código ya está metido en la BBDD del usuario.

		const emailSubject = 'Recuperación de contraseña - Casalink';
		const emailText = `¡Hola [Nombre del usuario]!

            Hemos recibido una solicitud para recuperar tu contraseña. Si no realizaste esta solicitud, por favor ignora este mensaje.

            Para restablecer tu contraseña, por favor, haz click en el siguiente enlace:

            <a href="${process.env.CLIENT_URL}/users/password/${recoveryCode}">Restablece tu contraseña aquí</a>

            Si necesitas más ayuda o tienes problemas, no dudes en ponerte en contacto con nosotros.

            ¡Gracias por ser parte de nuestra comunidad!

            Saludos,

            El equipo de [Nombre de tu empresa o sitio web]`;

		await sendMailUtil(email, emailSubject, emailText);

		res.send({
			status: 'ok',
			message: 'Email de recuperación de contraseña enviado',
		});
	} catch (err) {
		next(err);
	}
};

export default sendRecoverPassMailController;
