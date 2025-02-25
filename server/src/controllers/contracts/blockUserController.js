import getPool from '../../db/getPool.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const blockUserController = async (req, res, next) => {
	try {
		const { id: contractId } = req.params;
		const { blockedUserId, reason } = req.body;
		const userId = req.user.id;

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
			SELECT id FROM contract_blocks 
			WHERE contractId = ? AND blockedUserId = ?
			`,
			[contractId, blockedUserId]
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
			INSERT INTO contract_blocks (contractId, ownerId, blockedUserId, reason)
			VALUES (?, ?, ?, ?)
			`,
			[contractId, userId, blockedUserId, reason]
		);

		res.status(201).json({ message: 'Usuario bloqueado exitosamente' });
	} catch (error) {
		next(error);
	}
};

export default blockUserController;
