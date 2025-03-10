import bcrypt from 'bcrypt';
import crypto from 'crypto';

import getPool from '../../db/getPool.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';
import sendMailUtil from '../../utils/sendMailUtil.js';

const insertUserModel = async (
	name,
	lastName,
	email,
	password,
	phone,
	legalId
) => {
	// Obtenemos el pool.
	const pool = await getPool();

	// Obtenemos la lista de usuarios con el email de usuario recibido.
	const [usersByEmail] = await pool.query(
		`SELECT id FROM users WHERE email = ?`,
		[email]
	);

	// Si existe algún usuario con ese email lanzamos un error.
	if (usersByEmail.length > 0) {
		generateErrorUtil('Ya hay un usuario registrado con ese email', 409);
	}

	// Obtenemos la lista de usuarios con el documento de identidad recibido.
	const [usersByLegalId] = await pool.query(
		`SELECT id FROM users WHERE legalId = ? AND legalId IS NOT NULL`,
		[legalId]
	);

	// Si existe algún usuario con ese email lanzamos un error.
	if (usersByLegalId.length > 0) {
		generateErrorUtil(
			'Ya hay un usuario registrado con ese documento de identidad',
			409
		);
	}

	// Hash del password
	const hashedPassword = await bcrypt.hash(password, 10);

	// Generar un código de validación de 4 caracteres
	const validationCode = crypto.randomBytes(2).toString('hex');
	const validationLink = `${process.env.CLIENT_URL}validate-email?email=${email}&validationCode=${validationCode}`;
	//console.log('validationLink', validationLink);

	// Crear datos de correo para el correo de validación
	const bccMail = process.env.SUPERADMIN_EMAIL;
	const emailSubject = 'Valida tu email - CasaLink';
	const textContent = `Hola ${name} ${lastName},\n\nGracias por registrarte en CasaLink. Para completar la verificación de tu cuenta, introduce el siguiente código en la plataforma: ${validationCode}\n\nSi no solicitaste este código, puedes ignorar este mensaje.\n\n¡Nos vemos en **CasaLink**!\n\nEl equipo de CasaLink.`;
	const htmlContent = `
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<title>${emailSubject}</title>
		<style type="text/css">
			html,
			body {
				margin: 0 !important;
				padding: 0 !important;
				height: 100% !important;
				width: 100% !important;
			}
			* {
				-ms-text-size-adjust: 100%;
				-webkit-text-size-adjust: 100%;
			}
			.ExternalClass {
				width: 100%;
			}
			div[style*="margin: 16px 0"] {
				margin: 0 !important;
			}
			table,
			td {
				mso-table-lspace: 0pt !important;
				mso-table-rspace: 0pt !important;
			}
			table {
				border-spacing: 0 !important;
				border-collapse: collapse !important;
				table-layout: fixed !important;
				margin: 0 auto !important;
			}
			table table table {
				table-layout: auto;
			}
			img {
				-ms-interpolation-mode: bicubic;
			}
			.yshortcuts a {
				border-bottom: none !important;
			}
			a[x-apple-data-detectors] {
				color: inherit !important;
			}
		</style>
		<style type="text/css">
			@media screen and (max-width: 600px) {
				.email-container {
					width: 100% !important;
				}
				.fluid,
				.fluid-centered {
					max-width: 100% !important;
					height: auto !important;
					margin-left: auto !important;
					margin-right: auto !important;
				}
				.fluid-centered {
					margin-left: auto !important;
					margin-right: auto !important;
				}
				.stack-column,
				.stack-column-center {
					display: block !important;
					width: 100% !important;
					max-width: 100% !important;
					direction: ltr !important;
				}
				.stack-column-center {
					text-align: center !important;
				}
				.center-on-narrow {
					text-align: center !important;
					display: block !important;
					margin-left: auto !important;
					margin-right: auto !important;
					float: none !important;
				}
				table.center-on-narrow {
					display: inline-block !important;
				}
			}
		</style>
	</head>
	<body bgcolor="#e6dada" width="100%" style="margin: 0" yahoo="yahoo">
		<table
			bgcolor="#e6dada"
			cellpadding="0"
			cellspacing="0"
			border="0"
			height="100%"
			width="100%"
			style="border-collapse: collapse"
		>
			<tr>
				<td>
					<center style="width: 100%">
						<div
							style="
								display: none;
								font-size: 1px;
								line-height: 1px;
								max-height: 0px;
								max-width: 0px;
								opacity: 0;
								overflow: hidden;
								mso-hide: all;
								font-family: sans-serif;
							"
						>
							${emailSubject}
						</div>

						<!-- Email Header : BEGIN -->
						<table
							align="center"
							width="600"
							class="email-container"
						>
							<tr>
								<td style="padding: 20px 0; text-align: center">
									<img
										src="https://ichikstudio.com/wp-content/uploads/casalink_logotipo_main_1080x400.png"
										width="135"
										height="50"
										alt="alt_text"
										border="0"
									/>
								</td>
							</tr>
						</table>
						<!-- Email Header : END -->

						<!-- Email Body : BEGIN -->
						<table
							cellspacing="0"
							cellpadding="0"
							border="0"
							align="center"
							bgcolor="#ff6666"
							width="600"
							class="email-container"
						>
							<!-- 1 Column Text : BEGIN -->
							<tr>
								<td
									style="
										padding: 40px;
										text-align: center;
										font-family: 'Open Sans', sans-serif;
										font-size: 18px;
										mso-height-rule: exactly;
										line-height: 20px;
										color: #000033;
									"
								>
									<h2
										style="color: white; text-align: center"
									>
										Valida tu email
									</h2>
								</td>
							</tr>

							<tr>
								<td>
									<div
										style="
											background-color: white;
											padding: 30px;
											margin: auto;
											font-family: 'Open Sans', sans-serif;
											font-size: 18px;
											mso-height-rule: exactly;
											line-height: 20px;
											color: #000033;
											text-align: justify;
										"
									>
										<p>Hola ${name} ${lastName},</p>
										<p>
											Gracias por registrarte en
											<strong>CasaLink</strong>. Para
											completar la verificación de tu
											cuenta, introduce el siguiente
											código en la plataforma:
										</p>
										<br /><br />

										<!-- Button : Begin -->
										<table
											cellspacing="0"
											cellpadding="0"
											border="0"
											align="center"
											style="margin: auto"
										>
											<tr>
												<td
													style="
														border-radius: 100px;
														background: #ff6666;
														text-align: center;
													"
													class="button-td"
												>
													<a
														href="${validationLink}"
														style="
															background: #e6dada;
															border-width: 50px;
															border-style: solid;
															border-color: #e6dada;
															padding: 0;
															color: #000033;
															font-family: monospace;
															font-size: 24px;
															line-height: 1.1;
															text-align: center;
															text-decoration: none;
															display: block;
															border-radius: 10px;
															font-weight: bold;
														"
														class="button-a"
													>
														<!--[if mso
															]>&nbsp;&nbsp;&nbsp;&nbsp;<!
														[endif]-->
														${validationCode}<!--[if mso
															]>&nbsp;&nbsp;&nbsp;&nbsp;<!
														[endif]-->
													</a>
												</td>
											</tr>
										</table>
										<!-- Button : END -->
										<br /><br />
										<p style="text-align: center">
											¡Nos vemos en
											<strong>CasaLink</strong>!
										</p>
										<p style="text-align: center">
											<strong
												>El equipo de CasaLink</strong
											>
										</p>
										<br /><br />
										<p style="text-align: center">
											Si no funciona el enlace, puedes copiar y pegar el siguiente enlace en tu navegador: ${validationLink}
										</p>
										<p style="text-align: center">
											<small>
												Si no solicitaste este código,
												puedes ignorar este mensaje.
											</small>
										</p>
									</div>
								</td>
							</tr>

							<!-- Hero Image, Flush : BEGIN -->
							<tr>
								<td class="full-width-image">
									<img
										src="https://ichikstudio.com/wp-content/uploads/casalink_conexion_600x200.jpg"
										width="600"
										alt="alt_text"
										border="0"
										align="center"
										style="
											width: 100%;
											max-width: 600px;
											height: auto;
										"
									/>
								</td>
							</tr>
							<!-- Hero Image, Flush : END -->
						</table>
						<!-- Email Body : END -->

						<!-- Email Footer : BEGIN -->
						<table
							align="center"
							width="600"
							class="email-container"
						>
							<tr>
								<td
									style="
										padding: 40px 10px;
										width: 100%;
										font-size: 12px;
										font-family: sans-serif;
										mso-height-rule: exactly;
										line-height: 18px;
										text-align: center;
										color: #888888;
									"
								>
									Si tienes problemas o necesitas más ayuda,
									contáctanos en
									<a
										href="mailto:soporte@casalink.app"
										style="
											color: #000033;
											text-decoration: none;
										"
										>soporte@casalink.app</a
									>. <br /><br />
									<span class="mobile-link--footer"
										>CasaLink Copyright © 2025</span
									>
									<br />
									<br />
								</td>
							</tr>
						</table>
						<!-- Email Footer : END -->
					</center>
				</td>
			</tr>
		</table>
	</body>
</html>
	`;
	await sendMailUtil(email, emailSubject, htmlContent, bccMail, textContent);

	const [result] = await pool.query(
		`INSERT INTO users (name, lastName, email, password, phone, legalId, recoveryCode, isEmailVerified)
				VALUES (?, ?, ?, ?, ?, ?, ?, false)`,
		[name, lastName, email, hashedPassword, phone, legalId, validationCode]
	);

	return result.insertId;
};

export default insertUserModel;
