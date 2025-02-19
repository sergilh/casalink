import selectContractByStatusModel from '../../models/contracts/selectContractByStatusModel.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const contractsController = async (req, res, next) => {
	try {
		const { status } = req.params; // Estado opcional desde la URL
		const userId = req.user.id; // ID del usuario autenticado desde el token
		const { page = 1, limit = 10 } = req.query; // Parámetros de paginación

		// Si status está presente, filtra por ese estado; si no, busca todos
		const statusFilter = status
			? [status]
			: ['pending', 'approved', 'ongoing'];

		// Consultamos la base de datos
		const { contracts, total } = await selectContractByStatusModel({
			userId,
			statusFilter,
			page,
			limit,
		});

		// Si no hay registros, generar un error antes de devolver la respuesta
		if (total < 1) {
			throw generateErrorUtil(
				`No hay contratos ${status === undefined ? 'de ningun tipo' : status} para el usuario ${userId}`,
				404
			);
		}

		res.status(200).json({
			success: true,
			data: contracts,
			pagination: {
				total,
				page: Number(page),
				limit: Number(limit),
				totalPages: Math.ceil(total / limit),
			},
		});
	} catch (err) {
		next(err);
	}
};

export default contractsController;
