// middlewares/checkPropertyOwnerOrAdmin.js

import generateErrorUtil from '../utils/generateErrorUtil.js';

const checkPropertyOwnerOrAdmin = (req, res, next) => {
	try {
		// propertyExistsMiddleware debe haber adjuntado la propiedad en req.property
		// con al menos la info de ownerId
		const { property } = req;
		const { id: currentUserId, role: currentUserRole } = req.user;

		// Si es admin o superadmin, puede pasar
		if (currentUserRole === 'admin' || currentUserRole === 'superadmin') {
			return next();
		}

		// Si NO es admin, comprobamos si es el dueño
		if (property.ownerId !== currentUserId) {
			throw generateErrorUtil(
				'No tienes permisos para modificar esta propiedad.',
				403
			);
		}

		next();
	} catch (error) {
		next(error);
	}
};

export default checkPropertyOwnerOrAdmin;
