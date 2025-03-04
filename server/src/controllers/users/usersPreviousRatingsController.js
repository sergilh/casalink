import selectUserReviewsModel from '../../models/users/selectUserReviewsModel.js';

const usersPreviousRatingController = async (req, res, next) => {
	try {
		const { id } = req.params;

		const { reviews, averageRating } = await selectUserReviewsModel(id);

		res.send({
			status: 'ok',
			message: 'Estas son las valoraciones del usuario seleccionado',
			data: {
				reviews,
				averageRating,
			},
		});
	} catch (err) {
		next(err);
	}
};

export default usersPreviousRatingController;
