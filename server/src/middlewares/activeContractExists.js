import getPool from '../db/getPool.js';
import generateErrorUtil from '../utils/generateErrorUtil.js';

const validStatuses = [
	'approved',
	'rejected',
	'ongoing',
	'finished',
	'canceled',
];

const contractStatusMiddleware = async (req, res, next) => {
	try {
		const { id: otherUserId } = req.params; // ID del usuario en la URL
		const userId = req.user.id; // ID del usuario autenticado (JWT)
		const pool = await getPool();

		// Obtener el contrato con la propiedad asociada
		const [contracts] = await pool.query(
			`
				SELECT c.id, c.tenantId, p.ownerId
				FROM contracts c
				JOIN properties p ON c.propertyId = p.id
				WHERE c.status IN (?)
				AND (c.tenantId = ? OR p.ownerId = ?)
				AND (c.tenantId = ? OR p.ownerId = ?)
			`,
			[validStatuses, userId, userId, otherUserId, otherUserId]
		);

		// Si no hay un contrato válido, lanzar error
		if (contracts.length === 0) {
			generateErrorUtil(
				'No tienes un contrato válido con este usuario.',
				403
			);
		}

		// Extraer el contrato válido encontrado
		const contract = contracts[0];

		// Determinar el `otherUserId` correctamente
		let verifiedOtherUserId;
		if (userId === contract.ownerId) {
			verifiedOtherUserId = contract.tenantId;
		} else {
			verifiedOtherUserId = contract.ownerId;
		}

		// Agregar `contractId` y `otherUserId` verificado a la request
		req.contractId = contract.id;
		req.otherUserId = verifiedOtherUserId;

		next(); // Permite continuar con la petición si el contrato es válido
	} catch (error) {
		next(error);
	}
};

export default contractStatusMiddleware;
