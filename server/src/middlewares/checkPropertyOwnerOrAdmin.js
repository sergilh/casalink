// middlewares/checkPropertyOwnerOrAdmin.js

import generateErrorUtil from '../utils/generateErrorUtil.js';

const checkPropertyOwnerOrAdmin = (req, res, next) => {
	try {
		// propertyExistsMiddleware debe haber adjuntado la propiedad en req.property
		// con al menos la info de ownerId
		const currentUserRole = req.user.role;

		console.log('currentUserRole', currentUserRole);

		if (currentUserRole === 'admin' || currentUserRole === 'superadmin') {
			// Si es superadmin, también puede pasar
			return next();
		} else {
			throw generateErrorUtil(
				'No tienes permisos para modificar esta propiedad.',
				403
			);
		}
	} catch (error) {
		next(error);
	}
};

export default checkPropertyOwnerOrAdmin;
