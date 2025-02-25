import updatePropertyStatusModel from '../../models/properties/updatePropertyStatusModel.js';
import getPropertyStatusModel from '../../models/properties/getPropertyStatusModel.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';
import sendPropertyNotificationModel from '../../models/notifications/sendPropertyNotificationModel.js';

const updatePropertyStatusController = async (req, res, next) => {
	try {
		const { propertyId, action } = req.params;

		const validActions = ['approve', 'reject'];
		if (!validActions.includes(action)) {
			throw generateErrorUtil(
				"Acción inválida. Debe ser 'approve' o 'reject'",
				400
			);
		}

		// Verificamos si la propiedad está en estado "pending"
		const propertyStatus = await getPropertyStatusModel(propertyId);

		if (propertyStatus !== 'pending') {
			throw generateErrorUtil(
				'La propiedad no está en estado es pending para poder hacer esta acción',
				400
			);
		}

		let userId;

		if (action === 'approve') {
			userId = await updatePropertyStatusModel(propertyId, 'available');
		} else {
			userId = await updatePropertyStatusModel(propertyId, 'unavailable');
		}

		if (
			await sendPropertyNotificationModel(
				userId,
				propertyId,
				action === 'approve' ? 'approved' : 'rejected'
			)
		) {
			res.status(200).json({
				success: true,
				message: `Propiedad ${action} con éxito`,
			});
		} else {
			res.status(500).json({
				success: false,
				message: 'Error al enviar notificación',
			});
		}
	} catch (err) {
		next(err);
	}
};

export default updatePropertyStatusController;
