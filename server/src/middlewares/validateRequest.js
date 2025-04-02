import generateErrorUtil from '../utils/generateErrorUtil.js';
const validateRequest = (schema) => {
	return (req, res, next) => {
		const { error } = schema.validate(req.body, { abortEarly: false });

		if (error) {
			//console.log(error);
			return next(
				generateErrorUtil(
					400,
					'Datos de entrada no válidos',
					error.details.map((detail) => detail.message) // Pasar los detalles del error
				)
			);
		}
		next();
	};
};

export default validateRequest;
