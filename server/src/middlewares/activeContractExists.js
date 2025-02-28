import getPool from '../db/getPool.js';
import generateErrorUtil from '../utils/generateErrorUtil.js';

const validStatuses = [
	'approved',
	'rejected',
	'ongoing',
	'finished',
	'canceled',
];

const activeContractExists = async (req, res, next) => {
	try {
		const { reviewedId: otherUserId } = req.body; // ID del usuario en la URL
		const userId = req.user.id; // ID del usuario autenticado (JWT)
		const pool = await getPool();

		const query = `
				SELECT c.id, c.tenantId, p.ownerId
				FROM contracts c
				JOIN properties p ON c.propertyId = p.id
				WHERE c.status IN (?)
				AND (c.tenantId = ? OR p.ownerId = ?)
				AND (c.tenantId = ? OR p.ownerId = ?)
			`;

		const values = [
			validStatuses,
			userId,
			userId,
			otherUserId,
			otherUserId,
		];

		// Obtener el contrato con la propiedad asociada
		const [contracts] = await pool.query(query, values);

		// Si no hay un contrato válido, lanzar error
		if (contracts.length === 0) {
			console.log('contacts', contracts);

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

export default activeContractExists;
