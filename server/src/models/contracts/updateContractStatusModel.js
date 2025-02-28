import getPool from '../../db/getPool.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const updateContractStatusModel = async (contractId, status) => {
	const pool = await getPool();

	const [contract] = await pool.query(
		`
			SELECT
				status
			FROM contracts
			WHERE id = ?
		`,
		[contractId]
	);

	if (contract[0].status === status) {
		throw generateErrorUtil(`El estado del contrato ya es ${status}`, 400);
	}

	// Actualizar el estado del contrato
	const update = await pool.query(
		`
			UPDATE contracts SET status = ? WHERE id = ?
		`,
		[status, contractId]
	);

	if (update.rowCount < 1) {
		throw generateErrorUtil('Error al actualizar el contrato', 500);
	}

	return update.rowCount;
};

export default updateContractStatusModel;
