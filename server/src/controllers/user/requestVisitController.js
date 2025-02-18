import sendMailUtil from '../../utils/sendMailUtil';

import generateErrorUtil from '../../utils/generateErrorUtil.js';

const requestVisitController = async (req, res, next) => {
	try {
		const { emailCasero, mensaje, usuarioSolicitante } = req.body;

		if (!emailCasero || !mensaje || !usuarioSolicitante) {
			throw generateErrorUtil('Faltan datos requeridos', 400);
		}

		// Contenido del email que se enviará al casero

		const contenidoEmail = `

      <h2>Solicitud de Visita</h2>

      <p>El usuario <strong>${usuarioSolicitante}</strong> ha solicitado una visita.</p>

      <p><strong>Mensaje:</strong> ${mensaje}</p>

     `;

		// Enviar el email

		await sendMailUtil(
			emailCasero,

			'Nueva Solicitud de Visita',

			contenidoEmail
		);

		// Respuesta exitosa

		res.status(200).json({ message: 'Solicitud enviada con éxito' });
	} catch (error) {
		next(error);
	}
};

export default requestVisitController;
