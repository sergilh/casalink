import selectUserReviewsModel from '../../models/users/selectUserReviewsModel.js';

const usersPreviousRatingController = async (req, res, next) => {
	try {
		const { id } = req.params;

		const userRatingInfo = await selectUserReviewsModel(id);

		res.send({
			status: 'ok',
			message: 'Estas son las valoraciones del usuario seleccionado',
			data: {
				userRatingInfo,
			},
		});
	} catch (err) {
		next(err);
	}
};

export default usersPreviousRatingController;
