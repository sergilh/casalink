import getPool from '../../db/getPool.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const blockUserController = async (req, res, next) => {
	try {
		const { id: contractId } = req.params;
		const { blockedUserId, reason } = req.body;
		const { propertyId } = req.propertyId;

		if (!blockedUserId) {
			generateErrorUtil('Se requiere el ID del usuario a bloquear', 400);
		}

		if (!reason) {
			generateErrorUtil('Se requiere la razón del bloqueo', 400);
			0;
		}

		const pool = await getPool();

		// Verificar si ya está bloqueado
		const [existingBlock] = await pool.query(
			`
				SELECT
					b.id AS blockId
				FROM blocks b
				JOIN contracts c ON b.propertyId = c.propertyId
				WHERE b.userId = ? AND c.id = ?;
			`,
			[blockedUserId, contractId]
		);

		if (existingBlock.length > 0) {
			generateErrorUtil(
				'El usuario ya está bloqueado en este contrato',
				409
			);
		}

		// Insertar en la tabla de bloqueos
		await pool.query(
			`
			INSERT INTO blocks (userId, propertyId, reason)
			VALUES (?, ?, ?)
			`,
			[blockedUserId, propertyId, reason]
		);

		res.status(201).json({ message: 'Usuario bloqueado exitosamente' });
	} catch (error) {
		next(error);
	}
};

export default blockUserController;
