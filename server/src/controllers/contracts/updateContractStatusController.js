import updateContractStatusModel from '../../models/contracts/updateContractStatusModel.js';

const updateContractStatusController = async (req, res, next) => {
	try {
		const { status, contractId } = req.params;

		if ((await updateContractStatusModel(contractId, status)) === 1) {
			return res.status(200).json({
				success: true,
				message: `El contrato ${contractId} ha sido actualizado con éxito a ${status}`,
			});
		}
	} catch (error) {
		next(error);
	}
};

export default updateContractStatusController;
