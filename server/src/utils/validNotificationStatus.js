import generateErrorUtil from './generateErrorUtil.js';

const validNotificationTypeAndStatus = (type, status) => {
	let validStatus;

	console.log('TYPE', type);
	console.log('STATUS', status);

	// Validar que el `status` sea válido
	switch (type) {
		case 'review':
			validStatus = ['requested', 'rejected'];
			break;
		case 'visit':
		case 'contract':
		case 'property':
			validStatus = ['requested', 'approved', 'rejected'];
			break;
		default:
			throw generateErrorUtil(
				`Tipo de notificación ${type} inválido.`,
				400
			);
	}

	console.log(status);
	console.log(!validStatus.includes(status));

	if (!validStatus.includes(status)) {
		throw generateErrorUtil(
			`Estado de notificación inválido para el tipo ${type}. Debe ser uno de: ${validStatus.join(', ')}`,
			400
		);
	}
	return true;
};

export default validNotificationTypeAndStatus;
