import getPool from '../../db/getPool.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const createPropertyModel = async (propertyData) => {
	const pool = await getPool();

	const {
		userId,
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
	} = propertyData;

	/*
	`ownerId`                INT UNSIGNED NOT NULL,
	`propertyTitle`          VARCHAR(255) NOT NULL,
	`propertyType`           ENUM (`apartamento`, `casa`, `piso`, `duplex`, `otro`) NOT NULL,
	`description`            TEXT NOT NULL,
	`addressLocality`        VARCHAR(255),
	`addressStreet`          VARCHAR(255),
	`addressNumber`          VARCHAR(10),
	`addressFloor`           VARCHAR(10),
	`hasEnergyCert`          BOOLEAN DEFAULT false,
	`zipCode`                VARCHAR(5) NOT NULL,
	`location`               POINT,
	`squareMeters`           SMALLINT,
	`bedrooms`               TINYINT NOT NULL,
	`bathrooms`              TINYINT NOT NULL,
	`price`                  DECIMAL(10,2) NOT NULL,
	`status`                 ENUM (`available`,`unavailable`, `rented`, `pending`) DEFAULT `pending`,
	`createdAt`              TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	`updatedAt`              TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	*/

	// Convertir location a formato geométrico POINT
	const [lat, lng] = location.split(',').map(Number);

	const [result] = await pool.query(
		`
			INSERT INTO properties (
				ownerId, propertyTitle, propertyType, description, addressLocality, addressStreet, addressNumber, addressFloor,
				hasEnergyCert, zipCode, location, squareMeters, bedrooms, bathrooms,
				price, status
			)
			VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, POINT(?, ?), ?, ?, ?, ?, 'pending')
		`,
		[
			userId,
			title,
			type,
			description,
			locality,
			street,
			number,
			floor,
			hasEnergyCert,
			zipCode,
			lat,
			lng,
			squareMeters,
			bedrooms,
			bathrooms,
			price,
		]
	);

	if (result.length > 0) {
		generateErrorUtil(
			'No se puede crear una propiedad con ese nombre',
			409
		);
	}

	return result; // Devuelve el ID de la propiedad creada
};

export default createPropertyModel;
