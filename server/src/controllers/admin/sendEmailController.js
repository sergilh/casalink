const { SUPERADMIN_EMAIL } = process.env;

import sendMailUtil from '../../utils/sendMailUtil.js';

const sendEmailController = async (req, res, next) => {
	const { to: email, message: text, captcha } = req.body;

	if (!email || !text || !captcha) {
		return res
			.status(400)
			.json({
				error: `Faltan datos requeridos ${email} ${text} ${captcha}`,
			});
	}

	const emailSubject = 'Mensaje desde la web de CasaLink';

	try {
		await sendMailUtil(email, emailSubject, text, SUPERADMIN_EMAIL, text);
		res.json({ message: 'Correo enviado exitosamente' });
	} catch (error) {
		next(error);
	}
};

export default sendEmailController;
