const validateRequest = (schema) => {
	return (req, res, next) => {
		const { error } = schema.validate(req.body, { abortEarly: false });

		if (error) {
			//console.log(error);
			return res.status(400).json({
				status: 'error',
				message: 'Datos de entrada no válidos',
				errors: error.details.map((detail) => detail.message),
			});
		}
		next();
	};
};

export default validateRequest;
