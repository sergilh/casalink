import generateErrorUtil from './generateErrorUtil.js';

const validNotificationTypeAndStatus = (type, status) => {
	let validStatus;

	// Validar que el `status` sea válido
	switch (type) {
		case 'property':
			validStatus = ['approved', 'rejected'];
			break;
		case 'review':
			validStatus = ['requested', 'rejected'];
			break;
		case ('visit', 'contract'):
			validStatus = ['requested', 'approved', 'rejected'];
			break;
		default:
			throw generateErrorUtil(
				`Tipo de notificación ${type} inválido.`,
				400
			);
	}

	if (!validStatus.includes(status)) {
		throw generateErrorUtil(
			`Estado de notificación inválido para el tipo ${type}. Debe ser uno de: ${validStatus.join(', ')}`,
			400
		);
	}
	return true;
};

export default validNotificationTypeAndStatus;
