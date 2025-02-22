import updateContractStatusModel from '../../models/contracts/updateContractStatusModel.js';

const updateContractStatusController = async (req, res, next) => {
	try {
		const { contractId } = req.params; // ID del contrato desde la URL
		const { status } = req.body; // Estado que se quiere asignar
		const ownerId = req.user.id; // ID del casero autenticado desde el token

		// Actualizar el estado del contrato
		const updatedContract = await updateContractStatusModel(
			contractId,
			ownerId,
			status
		);

		res.status(200).json({
			status: 'ok',
			message: `Contrato actualizado a ${status}`,
			data: updatedContract,
		});
	} catch (error) {
		next(error);
	}
};

export default updateContractStatusController;
