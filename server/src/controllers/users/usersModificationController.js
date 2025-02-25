import getPool from '../../db/getPool.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';
// Evitar que se modifique el legalId a menos que sea NULL

const usersModificationController = async (req, res, next) => {
	const userId = req.user.id;
	const { name, lastName, email, phone, avatarUrl, legalId, bio } = req.body;

	// Si no se envía ningún campo, devolvemos un error
	if (!name && !lastName && !email && !phone) {
		return res.status(400).json({
			message: 'Debes proporcionar al menos un campo para actualizar',
		});
	}

	const pool = await getPool();

	const [[actualUserData]] = await pool.query(
		`
			SELECT name, lastName, legalId, email, phone, avatarUrl, bio, isDocsVerified FROM users WHERE id = ?
		`,
		[userId]
	);

	console.log('Bio: ', actualUserData.bio);

	try {
		// Construcción dinámica del SET en la consulta SQL
		const updates = [];
		const values = [];

		if (name) {
			if (actualUserData.name !== name) {
				updates.push('name = ?');
				values.push(name);
			}
		}
		if (lastName) {
			if (actualUserData.lastName !== lastName) {
				updates.push('lastName = ?');
				values.push(lastName);
			}
		}
		if (email) {
			if (actualUserData.email !== email) {
				updates.push('email = ?');
				values.push(email);
			}
		}
		if (phone) {
			if (actualUserData.phone !== phone) {
				updates.push('phone = ?');
				values.push(phone);
			}
		}
		if (avatarUrl) {
			if (actualUserData.avatarUrl !== avatarUrl) {
				updates.push('avatarUrl = ?');
				values.push(avatarUrl);
			}
		}
		if (legalId) {
			if (actualUserData.isDocsVerified) {
				generateErrorUtil(
					'Una vez verificado el Documento de identidad, no se puede modificar',
					406
				);
			} else {
				updates.push('legalId = ?');
				values.push(legalId);
			}
		}
		if (bio) {
			if (actualUserData.bio !== bio) {
				updates.push('bio = ?');
				values.push(bio);
			} else {
				console.log('Bio es la misma');
			}
		}

		// Si no hay cambios, devolvemos un error
		if (updates.length === 0) {
			generateErrorUtil('No se han enviado datos para actualizar', 400);
		}

		// Agregar userId al final para el WHERE
		values.push(userId);

		// Ejecutar la actualización
		await pool.query(
			`UPDATE users SET ${updates.join(', ')} WHERE id = ?`,
			values
		);

		// Obtener los datos actualizados del usuario
		const [updatedUser] = await pool.query(
			`SELECT id, name, lastName, email, phone, avatarUrl, isDocsVerified FROM users WHERE id = ?`,
			[userId]
		);

		// Enviar la respuesta con los datos actualizados
		res.status(200).json({
			message: 'Perfil actualizado correctamente',
			user: updatedUser[0],
			oldUser: actualUserData,
		});
	} catch (error) {
		next(error);
	}
};

export default usersModificationController;
