import getPool from '../../db/getPool.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';
import sendMailUtil from '../../utils/sendMailUtil.js';
import selectUserByEmailModel from './selectUserByEmailModel.js';

const validateUserModel = async ({ email, validationCode }) => {
	const pool = await getPool();

	const [[{ isEmailVerified, recoveryCode }]] = await pool.query(
		`SELECT isEmailVerified, recoveryCode FROM users WHERE email= ?;`,
		[email]
	);

	if (isEmailVerified) {
		generateErrorUtil('El usuario ya ha sido verificado', 400);
	}

	if (recoveryCode !== validationCode) {
		generateErrorUtil(
			`El código de validación ${validationCode} no es correcto deber ser ${recoveryCode}`,
			400
		);
	}

	const { name, lastName } = await selectUserByEmailModel(email);

	const bccMail = process.env.SUPERADMIN_EMAIL;
	const emailSubject = '¡Tu cuenta ha sido verificada con éxito!';
	const textContent = `Hola ${name} ${lastName},\n\n¡Enhorabuena! Tu cuenta en CasaLink ha sido verificada con éxito. Ahora puedes acceder a todas las funcionalidades sin restricciones.\n\n🌟 ¿Qué puedes hacer ahora?\n\n✅ Explorar y gestionar tus propiedades\n\n✅ Publicar anuncios y recibir solicitudes\n\n✅ Conectarte con inquilinos o propietarios de manera segura\n\n¡Gracias por confiar en CasaLink\n\nEl equipo de CasaLink.`;
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
										${emailSubject}
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
											¡Enhorabuena! Tu cuenta en
											<strong>CasaLink</strong> ha sido
											verificada con éxito. Ahora puedes
											acceder a todas las funcionalidades
											sin restricciones.
										</p>
										<p>
											<ul>
												<li>🌟 ¿Qué puedes hacer ahora?</li>
												<li>
													✅ Explorar y gestionar tus
													propiedades
												</li>
												<li>
													✅ Publicar anuncios y recibir
													solicitudes
												</li>
												<li>
													✅ Conectarte con inquilinos o
													propietarios de manera segura
												</li>
											</ul>
										</p>
										<p>
											¡Gracias por confiar en
											<strong>CasaLink</strong>
										</p>
										El equipo de <strong>CasaLink</strong>
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

	const [results] = await pool.query(
		`UPDATE users SET isEmailVerified = TRUE, recoveryCode = NULL WHERE email = ?;`,
		[email]
	);

	return results.changedRows;
};

export default validateUserModel;
