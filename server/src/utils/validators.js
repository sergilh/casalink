import Joi from 'joi';

// ✅ Esquema para crear una propiedad
export const propertySchema = Joi.object({
	propertyTitle: Joi.string().max(255).required(),
	propertyType: Joi.string()
		.valid('apartamento', 'casa', 'piso', 'duplex', 'otro')
		.required(),
	description: Joi.string().required(),
	addressLocality: Joi.string().max(255).required(),
	addressStreet: Joi.string().max(255).required(),
	addressNumber: Joi.string().max(10).required(),
	zipCode: Joi.string()
		.pattern(/^\d{5}$/)
		.required()
		.messages({
			'string.pattern.base': 'El código postal debe tener 5 dígitos.',
		}),
	squareMeters: Joi.number().integer().positive().required(),
	bedrooms: Joi.number().integer().positive().required(),
	bathrooms: Joi.number().integer().positive().required(),
	price: Joi.number().positive().required(),
});

// ✅ Esquema para actualizar una propiedad (pueden enviarse campos opcionales)
export const updatePropertySchema = Joi.object({
	propertyTitle: Joi.string().max(255),
	propertyType: Joi.string().valid(
		'apartamento',
		'casa',
		'piso',
		'duplex',
		'otro'
	),
	description: Joi.string(),
	addressLocality: Joi.string().max(255),
	addressStreet: Joi.string().max(255),
	addressNumber: Joi.string().max(10),
	zipCode: Joi.string()
		.pattern(/^\d{5}$/)
		.messages({
			'string.pattern.base': 'El código postal debe tener 5 dígitos.',
		}),
	squareMeters: Joi.number().integer().positive(),
	bedrooms: Joi.number().integer().positive(),
	bathrooms: Joi.number().integer().positive(),
	price: Joi.number().positive(),
});
