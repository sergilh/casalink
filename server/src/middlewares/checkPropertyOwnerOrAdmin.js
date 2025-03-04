// middlewares/checkPropertyOwnerOrAdmin.js

import generateErrorUtil from '../utils/generateErrorUtil.js';

const checkPropertyOwnerOrAdmin = (req, res, next) => {
	try {
		const currentUserRole = req.user.role;
		const currentUserId = req.user?.id;
		const propertyOwnerId = req.property?.ownerId; // Ahora ya se define correctamente

		console.log('currentUserRole', currentUserRole);
		console.log('currentUserId', currentUserId);
		console.log('propertyOwnerId', propertyOwnerId);

		if (
			currentUserRole === 'admin' ||
			currentUserRole === 'superadmin' ||
			currentUserId === propertyOwnerId // Permite acceso al dueño de la propiedad
		) {
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
