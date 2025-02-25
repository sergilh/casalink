import Joi from 'joi';

// ✅ Esquema para crear una propiedad
export const propertySchema = Joi.object({
	title: Joi.string().max(255).required(),
	type: Joi.string()
		.valid('apartamento', 'casa', 'piso', 'duplex', 'otro')
		.required(),
	description: Joi.string().required(),
	locality: Joi.string().max(255).required(),
	street: Joi.string().max(255).required(),
	number: Joi.number().integer().positive().required(),
	floor: Joi.string().max(10).required(),
	hasEnergyCert: Joi.boolean(),
	zipCode: Joi.string()
		.pattern(/^\d{5}$/)
		.required()
		.messages({
			'string.pattern.base': 'El código postal debe tener 5 dígitos.',
		}),
	location: Joi.string()
		.pattern(/^(-?\d{1,2}(\.\d+)?),\s*(-?\d{1,3}(\.\d+)?)$/)
		.custom((value, helpers) => {
			const [lat, lon] = value.split(',').map(Number);
			if (lat < -90 || lat > 90 || lon < -180 || lon > 180) {
				return helpers.error('any.invalid');
			}
			return value;
		}, 'Latitude and Longitude validation'),
	squareMeters: Joi.number().integer().positive().required(),
	bedrooms: Joi.number().integer().positive().required(),
	bathrooms: Joi.number().integer().positive().required(),
	price: Joi.number().positive().required(),
});

// ✅ Esquema para actualizar una propiedad (pueden enviarse campos opcionales)
export const updatePropertySchema = Joi.object({
	title: Joi.string().max(255),
	type: Joi.string().valid('apartamento', 'casa', 'piso', 'duplex', 'otro'),
	description: Joi.string(),
	locality: Joi.string().max(255),
	street: Joi.string().max(255),
	number: Joi.string().max(10),
	floor: Joi.string().max(10),
	hasEnergyCert: Joi.boolean(),
	zipCode: Joi.string()
		.pattern(/^\d{5}$/)
		.messages({
			'string.pattern.base': 'El código postal debe tener 5 dígitos.',
		}),
	location: Joi.string()
		.pattern(/^(-?\d{1,2}(\.\d+)?),\s*(-?\d{1,3}(\.\d+)?)$/)
		.custom((value, helpers) => {
			const [lat, lon] = value.split(',').map(Number);
			if (lat < -90 || lat > 90 || lon < -180 || lon > 180) {
				return helpers.error('any.invalid');
			}
			return value;
		}, 'Latitude and Longitude validation'),
	squareMeters: Joi.number().integer().positive(),
	bedrooms: Joi.number().integer().positive(),
	bathrooms: Joi.number().integer().positive(),
	price: Joi.number().positive(),
});

// Esquema para buscar una propiedad con mensajes personalizados
export const searchPropertySchema = Joi.object({
	minPrice: Joi.number().positive().messages({
		'number.base': 'El precio mínimo debe ser un número.',
		'number.positive': 'El precio mínimo debe ser mayor que 0.',
	}),
	maxPrice: Joi.number().positive().messages({
		'number.base': 'El precio máximo debe ser un número.',
		'number.positive': 'El precio máximo debe ser mayor que 0.',
	}),
	bedrooms: Joi.number().integer().positive().messages({
		'number.base': 'El número de habitaciones debe ser un número.',
		'number.integer': 'El número de habitaciones debe ser un entero.',
		'number.positive': 'El número de habitaciones debe ser mayor que 0.',
	}),
	bathrooms: Joi.number().integer().positive().messages({
		'number.base': 'El número de baños debe ser un número.',
		'number.integer': 'El número de baños debe ser un entero.',
		'number.positive': 'El número de baños debe ser mayor que 0.',
	}),
	energyCertificate: Joi.boolean().valid(true).messages({
		'any.only':
			'El certificado de energía solo puede ser verdadero (true).',
	}),
	minOwnerRating: Joi.number().positive().messages({
		'number.base':
			'La calificación mínima del propietario debe ser un número.',
		'number.positive': 'La calificación mínima debe ser mayor que 0.',
	}),
	sortBy: Joi.string()
		.valid('price', 'bedrooms', 'bathrooms', 'ownerRating', 'createdAt')
		.messages({
			'any.only':
				'El campo sortBy solo puede tener los valores: price, bedrooms, bathrooms, ownerRating o createdAt.',
		}),
	order: Joi.string().valid('ASC', 'DESC').messages({
		'any.only': 'El orden solo puede ser ASC o DESC.',
	}),
	limit: Joi.number().valid(10, 20, 50).messages({
		'any.only': 'El límite solo puede ser 10, 20 o 50.',
	}),
	page: Joi.number().integer().positive().messages({
		'number.base': 'El número de página debe ser un número.',
		'number.integer': 'El número de página debe ser un entero.',
		'number.positive': 'El número de página debe ser mayor que 0.',
	}),
});

export const propertyApprovalSchema = Joi.object({
	sortBy: Joi.string()
		.valid('approve', 'reject')
		.messages({
			'any.only':
				"El campo action solo puede tener los valores:'approve', 'reject'.",
		})
		.required(),
});

export const propertyStatusSchema = Joi.object({
	status: Joi.string()
		.valid('available', 'unavailable')
		.messages({
			'any.only':
				"El campo status solo puede tener los valores:'available', 'unavailable'.",
		})
		.required(),
});
