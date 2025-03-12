import addReviewModel from '../../models/reviews/addReviewModel.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';
import sendReviewNotificationModel from '../../models/notifications/sendReviewNotificationModel.js';
import selectContractsByStatusModel from '../../models/contracts/selectContractByStatusModel.js';
import getReviewModel from '../../models/reviews/getReviewModel.js';

const addReviewController = async (req, res, next) => {
	try {
		const { reviewedId, contractId, rating, comment, reviewerRole } =
			req.body;
		const reviewerId = req.user.id; // Usuario autenticado que deja la reseña

		// Validaciones
		if (!reviewedId || !contractId || rating === undefined) {
			throw generateErrorUtil('Faltan datos requeridos', 400);
		}

		if (typeof rating !== 'number' || rating < 1 || rating > 5) {
			throw generateErrorUtil('La valoración debe ser entre 1 y 5', 400);
		}

		// Validar rol
		if (reviewerRole !== 'tenant' && reviewerRole !== 'owner') {
			throw generateErrorUtil('Rol incorrecto', 400);
		}

		// Verificar que el contrato esté finalizado y pertenece al revisor
		const { contracts } = await selectContractsByStatusModel({
			userId: reviewerId,
			statusFilter: ['finished'],
			page: 1,
			limit: 10,
		});

		// Verificamos que el contrato esta en la lista
		const contract = contracts.find(
			(contract) => contract.id === Number(contractId)
		);

		if (!contract) {
			throw generateErrorUtil(
				'El contrato no está finalizado o no pertenece a este usuario',
				400
			);
		}

		// Verificar que el usuario sea realmente el propietario si elige 'owner'
		if (reviewerRole === 'owner') {
			if (contract.ownerId !== reviewerId) {
				throw generateErrorUtil(
					'Solo el propietario del contrato puede dejar una valoración como propietario',
					403
				);
			}
		}

		if (reviewerRole === 'tenant') {
			if (contract.tenantId !== reviewerId) {
				throw generateErrorUtil(
					'Solo el inquilino del contrato puede dejar una valoración como inquilino',
					403
				);
			}
		}

		// Agregar la valoración en la base de datos
		const reviewId = await addReviewModel(
			reviewerId,
			reviewedId,
			contractId,
			rating,
			comment
		);

		const [[review]] = await getReviewModel(reviewId);

		// Enviar notificación a usuarios
		const results = await sendReviewNotificationModel(
			reviewerId,
			reviewedId,
			review.propertyTitle,
			review.tenantName,
			review.tenantId,
			review.ownerName,
			review.propertyId,
			rating
		);

		res.status(201).json({
			status: 'ok',
			message: 'Valoración enviada con éxito',
			data: { notifications: [results] },
		});
	} catch (error) {
		next(error);
	}
};

export default addReviewController;
