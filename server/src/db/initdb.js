import 'dotenv/config';
import getPool from './getPool.js';

const pool = await getPool();

const initDb = async () => {
	try {
		console.log('Conectado al servidor MySQL ✅\n');

		// Borrar tablas si existen
		await pool.query(`DROP TABLE IF EXISTS notifications`);
		await pool.query(`DROP TABLE IF EXISTS favs;`);
		await pool.query(`DROP TABLE IF EXISTS images;`);
		await pool.query(`DROP TABLE IF EXISTS reviews;`);
		await pool.query(`DROP TABLE IF EXISTS contracts;`);
		await pool.query(`DROP TABLE IF EXISTS properties;`);
		await pool.query(`DROP TABLE IF EXISTS users;`);
		console.log('Tablas borradas ✅\n');

		// Definir estructura de las tablas
		await pool.query(`
			CREATE TABLE users (
				id                     INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
				name                   VARCHAR(100),
				lastName               VARCHAR(100),
				legalId                VARCHAR(20) UNIQUE,
				email                  VARCHAR(100) UNIQUE NOT NULL,
				password               VARCHAR(255),
				phone                  VARCHAR(255),
				avatarUrl              VARCHAR(255),
				bio                    TEXT,
				role                   ENUM ('user', 'admin', 'superadmin') DEFAULT 'user',
				recoveryCode           VARCHAR(100) DEFAULT NULL,
				isEmailVerified        BOOLEAN DEFAULT FALSE,
				isDocsVerified         BOOLEAN DEFAULT FALSE,
				createdAt              TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
				updatedAt              TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
				KEY usersIdx (email, legalId, role)
			);`);
		console.log('Tabla de Usuarios (`users`) creada o ya existente');
		await pool.query(`
			CREATE TABLE properties (
				id                     INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
				ownerId                INT UNSIGNED NOT NULL,
				propertyTitle          VARCHAR(255) NOT NULL,
				propertyType           ENUM ('apartamento', 'casa', 'piso', 'duplex', 'otro') NOT NULL,
				description            TEXT NOT NULL,
				addressLocality        VARCHAR(255),
				addressStreet          VARCHAR(255),
				addressNumber          VARCHAR(10),
				addressFloor           VARCHAR(10),
				hasEnergyCert          BOOLEAN DEFAULT false,
				zipCode                VARCHAR(5) NOT NULL,
				location               POINT NOT NULL,
				squareMeters           SMALLINT,
				bedrooms               TINYINT NOT NULL,
				bathrooms              TINYINT NOT NULL,
				price                  DECIMAL(10,2) NOT NULL,
				status                 ENUM ('available','unavailable', 'rented', 'pending') DEFAULT 'pending',
				createdAt              TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
				updatedAt              TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
				FOREIGN KEY (ownerId) REFERENCES users (id) ON DELETE CASCADE,
				KEY propertiesIdx (addressLocality, zipCode, price, status)
			);`);
		console.log(
			'Tabla de Propiedades (`properties`) creada o ya existente'
		);
		await pool.query(`
			CREATE TABLE contracts (
				id                     INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
				tenantId               INT UNSIGNED,
				propertyId             INT UNSIGNED,
				startDate              TIMESTAMP NOT NULL,
				endDate                TIMESTAMP  DEFAULT NULL,
				pdfUrl                 VARCHAR(255)  DEFAULT NULL,
				status                 ENUM ('pending', 'approved', 'rejected', 'ongoing', 'finished', 'canceled') NOT NULL,
				createdAt              TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
				updatedAt              TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
				FOREIGN KEY (tenantId) REFERENCES users (id) ON DELETE CASCADE,
				FOREIGN KEY (propertyId) REFERENCES properties (id) ON DELETE CASCADE,
				KEY contractsIdx2 (tenantId, propertyId, startDate, endDate, status)
			);`);
		console.log('Tabla de Contratos (`contracts`) creada o ya existente');
		await pool.query(`
			CREATE TABLE reviews (
				id                     INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
				reviewerId             INT UNSIGNED,
				reviewedId             INT UNSIGNED,
				contracId              INT UNSIGNED,
				rating                 TINYINT NOT NULL,
				comment                TEXT,
				createdAt              TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
				removedAt              TIMESTAMP DEFAULT NULL,
				FOREIGN KEY (reviewerId) REFERENCES users (id) ON DELETE CASCADE,
				FOREIGN KEY (reviewedId) REFERENCES users (id) ON DELETE CASCADE,
				FOREIGN KEY (contracId) REFERENCES contracts (id) ON DELETE CASCADE,
				KEY reviewsIdx (reviewerId, reviewedId, contracId, rating)
			);`);
		console.log('Tabla de Reseñas (`reviews`) creada o ya existente');
		await pool.query(`
			CREATE TABLE images (
				id                     INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
				propertyId             INT UNSIGNED,
				imageUrl               VARCHAR(255) NOT NULL,
				sortIndex              TINYINT,
				createdAt              TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
				updatedAt              TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
				removedAt              TIMESTAMP DEFAULT NULL,
				FOREIGN KEY (propertyId) REFERENCES properties (id),
				KEY imagesIdx (sortIndex)
			);`);
		console.log('Tabla de Imágenes (`images`) creada o ya existente');
		await pool.query(`
			CREATE TABLE favs (
				id                     INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
				userId                 INT UNSIGNED,
				propertyId             INT UNSIGNED,
				createdAt              TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
				removedAt              TIMESTAMP DEFAULT NULL,
				FOREIGN KEY (userId) REFERENCES users (id),
				FOREIGN KEY (propertyId) REFERENCES properties (id),
				UNIQUE KEY favsIdx (userId, propertyId)
			);`);
		console.log('Tabla de Favoritos (`favs`) creada o ya existente//n');
		await pool.query(`
			CREATE TABLE notifications (
				id                     INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
				userId                 INT UNSIGNED,
				propertyId             INT UNSIGNED,
				message                TEXT NOT NULL,
				type                   ENUM ('visit', 'property', 'review', 'contract') NOT NULL,
				status                 ENUM ('requested', 'approved',  'rejected') NOT NULL,
				isRead                 BOOLEAN DEFAULT false,
				createdAt              TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
				readAt                 TIMESTAMP DEFAULT NULL,
				FOREIGN KEY (userId) REFERENCES users (id),
				FOREIGN KEY (propertyId) REFERENCES properties (id),
				KEY notificationsIdx (userId, propertyId, type, status)
			);`);
		console.log(
			'Tabla de Notificaciones (`notifications`) creada o ya existente\n'
		);
	} catch (error) {
		console.error('Error al inicializar la base de datos:\n', error);
		process.exit(1);
	} finally {
		console.log(
			`**********************************
*                                *
*      ¡Base de Datos Lista!     *
*          ¡A trabajar!          *
*                                *
**********************************\n`
		);
		process.exit(0);
	}
};

initDb();
