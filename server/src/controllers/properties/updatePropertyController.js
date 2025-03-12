import updatePropertyModel from '../../models/properties/updatePropertyModel.js';
import getPool from '../../db/getPool.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const updatePropertyController = async (req, res, next) => {
	try {
		const { propertyId } = req.params;
		//const userId = req.user.id; // Usuario autenticado
		const userRole = req.user.role; // Rol del usuario

		if (!propertyId) {
			throw generateErrorUtil('ID de propiedad no recibido.', 400);
		}

		// OBTENER EL DUEÑO DE LA PROPIEDAD
		const pool = await getPool();
		const [[property]] = await pool.query(
			'SELECT ownerId FROM properties WHERE id = ?',
			[propertyId]
		);

		if (!property) {
			return res.status(404).json({
				success: false,
				message: 'Propiedad no encontrada.',
			});
		}

		// Filtrar solo los campos enviados en req.body
		const allowedFields = [
			'title',
			'type',
			'description',
			'locality',
			'street',
			'number',
			'floor',
			'hasEnergyCert',
			'zipCode',
			'location',
			'squareMeters',
			'bedrooms',
			'bathrooms',
			'price',
		];

		const updateData = {};
		Object.keys(req.body).forEach((key) => {
			if (allowedFields.includes(key) && req.body[key] !== undefined) {
				updateData[key] = req.body[key];
			}
		});

		if (Object.keys(updateData).length === 0) {
			return res.status(400).json({
				success: false,
				message: 'No se enviaron cambios para actualizar.',
			});
		}

		await updatePropertyModel(propertyId, {
			...updateData,
			status: userRole === 'user' ? 'pending' : 'available',
		});

		/*
		YA EXISTEN LOS MIDDLEWARES PARA ESTO
		const ownerId = property.ownerId;
		const esAdmin = userRole === 'admin' || userRole === 'superadmin';
		const esOwner = userId === ownerId;

		// VALIDAR PERMISOS (SOLO ADMIN O DUEÑO)
		if (!esAdmin && !esOwner) {
			return res.status(403).json({
				success: false,
				message: 'No tienes permisos para modificar esta propiedad.',
			});
		}
		

		// ACTUALIZAR LA PROPIEDAD
		const {
			title,
			type,
			description,
			locality,
			street,
			number,
			floor,
			hasEnergyCert,
			zipCode,
			location,
			squareMeters,
			bedrooms,
			bathrooms,
			price,
		} = req.body;

		console.log('Datos recibidos en backend:', req.body);

		await updatePropertyModel(propertyId, {
			title,
			type,
			description,
			locality,
			street,
			number,
			floor,
			hasEnergyCert,
			zipCode,
			location,
			squareMeters,
			bedrooms,
			bathrooms,
			price,
			status: userRole === 'user' ? 'pending' : 'available',
		});
*/
		return res.status(200).json({
			success: true,
			message: `Propiedad ${propertyId} actualizada correctamente.`,
		});
	} catch (error) {
		next(error);
	}
};

export default updatePropertyController;
