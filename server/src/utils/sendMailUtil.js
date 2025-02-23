import nodemailer from 'nodemailer';
import generateErrorUtil from './generateErrorUtil.js';
const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

const transport = nodemailer.createTransport({
	host: SMTP_HOST,
	port: SMTP_PORT,
	auth: {
		user: SMTP_USER,
		pass: SMTP_PASS,
	},
});

const sendMailUtil = async (
	email,
	subject,
	htmlContent,
	bccMail,
	textContent
) => {
	try {
		await transport.sendMail({
			from: SMTP_USER,
			to: email,
			subject: subject,
			html: htmlContent,
			bcc: bccMail,
			text: textContent,
		});
	} catch (err) {
		console.error(err);
		generateErrorUtil('Error al enviar el mail', 400);
	}
};

export default sendMailUtil;
