import getPool from '../../db/getPool.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const updateContractStatusModel = async (contractId, ownerId, status) => {
	const pool = await getPool();

	// Validar si el contrato existe y pertenece a una propiedad del casero
	const [contract] = await pool.query(
		`SELECT c.id, c.status, p.status as propertyStatus
         FROM contracts c
         JOIN properties p ON c.propertyId = p.id
         WHERE c.id = ? AND p.ownerId = ?`,
		[contractId, ownerId]
	);

	if (contract.length === 0) {
		throw generateErrorUtil(
			'No tienes permiso para modificar este contrato',
			403
		);
	}

	// Verificar si la propiedad está aprobada antes de modificar el contrato
	if (contract[0].propertyStatus !== 'available') {
		throw generateErrorUtil('La propiedad aún no ha sido aprobada', 400);
	}

	// Verificar si el estado es válido
	const validStatuses = ['approved', 'rejected'];
	if (!validStatuses.includes(status)) {
		throw generateErrorUtil(
			'Estado inválido. Debe ser "approved" o "rejected".',
			400
		);
	}

	// Actualizar el estado del contrato
	await pool.query('UPDATE contracts SET status = ? WHERE id = ?', [
		status,
		contractId,
	]);

	return { contractId, status };
};

export default updateContractStatusModel;
