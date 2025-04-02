import getPool from '../../db/getPool.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

// Controlador para obtener la información del usuario verificado
const usersByIdController = async (req, res, next) => {
	try {
		// Extraer el ID del usuario autenticado desde el token
		const { userId } = req.params;

		// Obtener la conexión al pool de la base de datos
		const pool = await getPool();

		const [userData] = await pool.query(
			`
				SELECT
					u.id AS userId, u.name, u.lastName, u.bio, u.avatarUrl, u.role,
					u.isDocsVerified, u.isOwner, u.averageRating, u.totalReviews, u.createdAt,
					p.id AS propertyId, p.propertyTitle, p.price, p.bedrooms, p.bathrooms, p.hasEnergyCert,
					i.imageUrl AS mainImage
				FROM users u
				LEFT JOIN (
					SELECT * FROM properties
					WHERE ownerId = ?
					ORDER BY createdAt DESC
					LIMIT 5
				) p ON u.id = p.ownerId
				LEFT JOIN images i ON p.id = i.propertyId AND i.sortIndex = 1
				WHERE u.id = ?
			`,
			[userId, userId]
		);

		if (userData.length === 0) {
			generateErrorUtil('Usuario no encontrado', 404);
		}

		const user = {
			id: userData[0].userId,
			name: userData[0].name,
			lastName: userData[0].lastName,
			bio: userData[0].bio,
			avatarUrl: userData[0].avatarUrl,
			role: userData[0].role,
			isDocsVerified: userData[0].isDocsVerified,
			isOwner: userData[0].isOwner,
			averageRating: userData[0].averageRating,
			totalReviews: userData[0].totalReviews,
			createdAt: userData[0].createdAt,
			properties: userData
				.filter((p) => p.propertyId) // Filtrar filas con propiedad
				.map((p) => ({
					id: p.propertyId,
					title: p.propertyTitle,
					price: p.price,
					rooms: p.rooms,
					bathrooms: p.bathrooms,
					energyCertificate: p.hasEnergyCert,
					mainImage: p.mainImage || null,
				})),
		};

		// Responder con los datos del usuario
		res.json({ user });
	} catch (error) {
		next(error);
	}
};

export default usersByIdController;
