import selectUserReviewsModel from '../../models/users/selectUserReviewsModel.js';
import selectContractsByStatusModel from '../../models/contracts/selectContractByStatusModel.js';

const usersPreviousRatingController = async (req, res, next) => {
	try {
		const { id } = req.params;

		const userRatingInfo = await selectUserReviewsModel(id);

		const userContractsInfo = await selectContractsByStatusModel({
			userId: id,
			statusFilter: ['finished', 'approved'],
			page: 1,
			limit: 10,
		});

		res.send({
			status: 'ok',
			message: 'Estas son las valoraciones del usuario seleccionado',
			data: {
				userRatingInfo,
				userContractsInfo,
			},
		});
	} catch (err) {
		next(err);
	}
};

export default usersPreviousRatingController;
