import selectUserReviewsModel from '../../models/users/selectUserReviewsModel.js';

const usersPreviousRatingController = async (req, res, next) => {
	try {
		const { userId } = req.params;

		const review = await selectUserReviewsModel(userId);

		res.send({
			status: 'ok',
			message: 'Estas son las valoraciones del usuario seleccionado',
			data: {
				review,
			},
		});
	} catch (err) {
		next(err);
	}
};

export default usersPreviousRatingController;
