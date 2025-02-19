import addReviewModel from '../../models/reviews/addReviewModel.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const addReviewController = async (req, res, next) => {
	try {
		const { reviewedId, contractId, rating, comment } = req.body;
		const reviewerId = req.user?.id; // Usuario autenticado que deja la reseña

		// Validaciones
		if (!reviewedId || !contractId || rating === undefined) {
			throw generateErrorUtil('Faltan datos requeridos', 400);
		}

		if (typeof rating !== 'number' || rating < 1 || rating > 5) {
			throw generateErrorUtil('La valoración debe ser entre 1 y 5', 400);
		}

		// Agregar la valoración en la base de datos
		await addReviewModel(
			reviewerId,
			reviewedId,
			contractId,
			rating,
			comment
		);

		res.status(201).json({
			status: 'ok',
			message: 'Valoración enviada con éxito',
		});
	} catch (error) {
		next(error);
	}
};

export default addReviewController;
