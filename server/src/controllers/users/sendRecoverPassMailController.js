import generateErrorUtil from '../../utils/generateErrorUtil.js';
import selectUserByEmailModel from '../../models/users/selectUserByEmailModel.js';
import insertRecoveryCodePassModel from '../../models/users/insertRecoveryCodePassModel.js';
import sendMailUtil from '../../utils/sendMailUtil.js';
import 'dotenv/config';
import crypto from 'crypto';

const sendRecoverPassMailController = async (req, res, next) => {
	try {
		const { email, resend = false } = req.query;

		if (!email) {
			generateErrorUtil('Faltan campos', 400);
		}

		const user = await selectUserByEmailModel(email);

		if (!user) {
			generateErrorUtil(
				'El email proporcionado no está asociado a ninguna cuenta'
			);
		}

		console.log('user:', user);

		if (!resend && user.recoveryCode !== null) {
			console.log('user.recoveryCode:', user.recoveryCode);
			res.send({
				status: 'error',
				message:
					'El usuario ya ha solicitado una nueva contraseña. Por favor, solicita un nuevo correo si necesitas cambiar tu contraseña.',
			});
			generateErrorUtil(
				'El usuario ya ha solicitado una nueva contraseña. Por favor, solicita un nuevo correo si necesitas cambiar tu contraseña.',
				403
			);
		}

		//A partir de aquí la función ya ha comprobado que existe el usuario con ese mail.
		const recoveryCode = crypto.randomBytes(15).toString('hex');

		await insertRecoveryCodePassModel(recoveryCode, email);
		//Aquí el código ya está metido en la BBDD del usuario.

		const emailSubject = 'Recuperación de contraseña - Casalink';
		const textContent = `¡Hola!\n\nHemos recibido una solicitud para recuperar tu contraseña.
Si no realizaste esta solicitud, por favor ignora este mensaje.

Para restablecer tu contraseña, por favor, haz click en el siguiente enlace:

${process.env.CLIENT_URL}users/password/${recoveryCode}

Si necesitas más ayuda o tienes problemas, no dudes en ponerte en contacto con nosotros.

¡Gracias por ser parte de nuestra comunidad!\n\nSaludos,\n\nEl equipo de Casalink\n`;
		const bccMail = process.env.SUPERADMIN_EMAIL;

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
						.button-td,
						.button-a {
							transition: all 100ms ease-in;
						}
						.button-td:hover,
						.button-a:hover {
							background: #000033 !important;
							border-color: #000033 !important;
						}
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
													Recuperación de contraseña
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
													<p>Hola,</p>
													<p>
														Hemos recibido una solicitud para
														restablecer tu contraseña en
														<strong>CasaLink</strong>. Si no
														realizaste esta solicitud, puedes
														ignorar este mensaje con seguridad.
													</p>
													<p>
														Para restablecer tu contraseña, haz
														clic en el siguiente botón:
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
																	href="${process.env.CLIENT_URL}change-password?recoveryCode=${recoveryCode}&email=${email}"
																	style="
																		background: #ff6666;
																		border: 30px solid #ff6666;
																		padding: 0 20px;
																		color: #ffffff;
																		font-family: sans-serif;
																		font-size: 18px;
																		line-height: 1.1;
																		text-align: center;
																		text-decoration: none;
																		display: block;
																		border-radius: 100px;
																		font-weight: bold;
																	"
																	class="button-a"
																>
																	<!--[if mso
																		]>&nbsp;&nbsp;&nbsp;&nbsp;<!
																	[endif]-->Restablecer
																	contraseña<!--[if mso
																		]>&nbsp;&nbsp;&nbsp;&nbsp;<!
																	[endif]-->
																</a>
															</td>
														</tr>
													</table>
													<!-- Button : END -->
													<br /><br />
													<p>
														Si el botón no funciona, puedes copiar y pegar el siguiente código en el formulario de cambio de contraseña:</p>
													<p style="
															background: #e6dada;
															border-width: 10px;
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
															font-weight: bold;">${recoveryCode}</p>
													</p>

													<p>
														Gracias por ser parte de nuestra
														comunidad.
													</p>

													<p>
														<strong
															>El equipo de CasaLink</strong
														>
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

		await sendMailUtil(
			email,
			emailSubject,
			htmlContent,
			bccMail,
			textContent
		);

		res.send({
			status: 'ok',
			message: 'Email de recuperación de contraseña enviado',
		});
	} catch (err) {
		next(err);
	}
};

export default sendRecoverPassMailController;
