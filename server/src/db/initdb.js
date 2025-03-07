import 'dotenv/config';
import getPool from './getPool.js';

const pool = await getPool();

const initDb = async () => {
	try {
		console.log('Conectado al servidor MySQL ✅\n');

		await pool.query(`DROP TABLE IF EXISTS blocks`);
		await pool.query(`DROP TABLE IF EXISTS notifications`);
		await pool.query(`DROP TABLE IF EXISTS favs;`);
		await pool.query(`DROP TABLE IF EXISTS images;`);
		await pool.query(`DROP TABLE IF EXISTS reviews;`);
		await pool.query(`DROP TABLE IF EXISTS contracts;`);
		await pool.query(`DROP TABLE IF EXISTS properties;`);
		await pool.query(`DROP TABLE IF EXISTS users;`);
		console.log('Tablas borradas ✅\n');

		// Definir estructura de las tablas
		await pool.query(
			`
				CREATE TABLE users (
					id                     INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
					name                   VARCHAR(100),
					lastName               VARCHAR(100),
					legalId                VARCHAR(20) UNIQUE,
					email                  VARCHAR(100) UNIQUE NOT NULL,
					password               VARCHAR(255), -- hashed
					phone                  VARCHAR(255), -- hashed
					avatarUrl              VARCHAR(255),
					bio                    TEXT,
					role                   ENUM ('user', 'admin', 'superadmin') DEFAULT 'user',
					recoveryCode           VARCHAR(100) DEFAULT NULL,
					isEmailVerified        BOOLEAN DEFAULT FALSE,
					isDocsVerified         BOOLEAN DEFAULT FALSE,
					isOwner                BOOLEAN DEFAULT FALSE,
					createdAt              TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
					updatedAt              TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
					averageRating          DECIMAL(2,1) DEFAULT 0,
					totalReviews           INT UNSIGNED DEFAULT 0,
					KEY usersIdx (email,legalId,role)
				);
			`
		);
		console.log('Tabla de Usuarios (`users`) creada o ya existente');

		await pool.query(
			`
				CREATE TABLE properties (
					id                     INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
					ownerId                INT UNSIGNED NOT NULL,
					propertyTitle          VARCHAR(255) NOT NULL,
					propertyType           ENUM ('apartamento', 'casa', 'piso', 'duplex', 'otro') NOT NULL DEFAULT 'otro',
					description            TEXT NOT NULL,
					addressLocality        VARCHAR(255),
					addressStreet          VARCHAR(255),
					addressNumber          VARCHAR(10),
					addressFloor           VARCHAR(10),
					hasEnergyCert          BOOLEAN DEFAULT false,
					zipCode                VARCHAR(5) NOT NULL,
					location               POINT,
					squareMeters           SMALLINT,
					bedrooms               TINYINT NOT NULL,
					bathrooms              TINYINT NOT NULL,
					price                  DECIMAL(10,2) NOT NULL,
					status                 ENUM ('available', 'unavailable', 'rented', 'pending', 'rejected') DEFAULT 'pending',
					createdAt              TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
					updatedAt              TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
					FOREIGN KEY (ownerId) REFERENCES users (id) ON DELETE CASCADE,
					KEY propertiesIdx (addressLocality,zipCode,price,status)
				);
			`
		);
		console.log(
			'Tabla de Propiedades (`properties`) creada o ya existente'
		);

		await pool.query(
			`
				CREATE TABLE contracts (
					id                     INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
					tenantId               INT UNSIGNED,
					propertyId             INT UNSIGNED,
					startDate              TIMESTAMP NOT NULL,
					endDate                TIMESTAMP  DEFAULT NULL,
					pdfUrl                 VARCHAR(255)  DEFAULT NULL,
					status                 ENUM ('pending', 'approved', 'rejected', 'ongoing', 'finished', 'canceled') NOT NULL DEFAULT 'pending',
					createdAt              TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
					updatedAt              TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
					FOREIGN KEY (tenantId) REFERENCES users (id) ON DELETE CASCADE,
					FOREIGN KEY (propertyId) REFERENCES properties (id) ON DELETE CASCADE,
					KEY contractsIdx2 (tenantId, propertyId, startDate, endDate, status)
				);
			`
		);
		console.log('Tabla de Contratos (`contracts`) creada o ya existente');

		await pool.query(
			`
				CREATE TABLE reviews (
					id                     INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
					reviewerId             INT UNSIGNED,
					reviewedId             INT UNSIGNED,
					contractId              INT UNSIGNED,
					rating                 TINYINT NOT NULL CHECK (rating >= 1 AND rating <= 5),
					comment                TEXT,
					createdAt              TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
					removedAt              TIMESTAMP DEFAULT NULL,
					FOREIGN KEY (reviewerId) REFERENCES users (id) ON DELETE CASCADE,
					FOREIGN KEY (reviewedId) REFERENCES users (id) ON DELETE CASCADE,
					FOREIGN KEY (contracId) REFERENCES contracts (id) ON DELETE CASCADE,
					KEY reviewsIdx (reviewerId, reviewedId, contracId, rating)
				);
			`
		);
		console.log('Tabla de Reseñas (`reviews`) creada o ya existente');

		await pool.query(
			`
				CREATE TABLE images (
					id                     INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
					propertyId             INT UNSIGNED,
					imageUrl               VARCHAR(255) NOT NULL,
					fileType               ENUM ('image', 'video') NOT NULL,
					sortIndex              TINYINT,
					createdAt              TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
					updatedAt              TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
					removedAt              TIMESTAMP DEFAULT NULL,
					FOREIGN KEY (propertyId) REFERENCES properties (id),
					KEY imagesIdx (sortIndex)
				);
			`
		);
		console.log('Tabla de Imágenes (`images`) creada o ya existente');

		await pool.query(
			`
				CREATE TABLE favs (
					id                     INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
					userId                 INT UNSIGNED,
					propertyId             INT UNSIGNED,
					createdAt              TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
					removedAt              TIMESTAMP DEFAULT NULL,
					FOREIGN KEY (userId) REFERENCES users (id),
					FOREIGN KEY (propertyId) REFERENCES properties (id),
					UNIQUE KEY favsIdx (userId, propertyId)
				);
			`
		);
		console.log('Tabla de Favoritos (`favs`) creada o ya existente');

		await pool.query(
			`
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
				);
			`
		);
		console.log(
			'Tabla de Notificaciones (`notifications`) creada o ya existente'
		);

		await pool.query(
			`
				CREATE TABLE blocks (
					id                     INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
					userId                 INT UNSIGNED,
					propertyId             INT UNSIGNED,
					reason                 TEXT,
					createdAt              TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
					removedAt              TIMESTAMP DEFAULT NULL,
					FOREIGN KEY (userId) REFERENCES users (id),
					FOREIGN KEY (propertyId) REFERENCES properties (id),
					UNIQUE KEY blocksIdx (userId, propertyId)
				);
			`
		);
		console.log('Tabla de Bloqueados (`blocks`) creada o ya existente');

		console.log('\nTablas creadas ✅');
		await pool.query(
			`
				CREATE TRIGGER afterInsertProperty
				AFTER INSERT ON properties
				FOR EACH ROW
					UPDATE users
					SET isOwner = TRUE
					WHERE id = NEW.ownerId;
			`
		);
		console.log('\nTrigger `afterInsertProperty` creado.');

		await pool.query(
			`
				CREATE TRIGGER afterDeleteProperty
				AFTER DELETE ON properties
				FOR EACH ROW
					IF (SELECT COUNT(*) FROM properties WHERE ownerId = OLD.ownerId) = 0 THEN
						UPDATE users
						SET isOwner = FALSE
						WHERE id = OLD.ownerId;
					END IF;
			`
		);
		console.log('Trigger `afterDeleteProperty` creado.');

		await pool.query(
			`
				CREATE TRIGGER updateUserRating AFTER INSERT ON reviews
				FOR EACH ROW
					UPDATE users
					SET
						averageRating = (SELECT COALESCE(AVG(rating), 0) FROM reviews WHERE reviewedId = NEW.reviewedId),
						totalReviews = (SELECT COUNT(*) FROM reviews WHERE reviewedId = NEW.reviewedId)
					WHERE id = NEW.reviewedId
			`
		);
		console.log('Trigger `updateUserRating` creado.');
		console.log('\nTriggers creados ✅');
	} catch (error) {
		console.error('Error al inicializar la base de datos:', error);
		process.exit(1);
	} finally {
		console.log(`\n¡Base de Datos Lista!\n\n¡A trabajar!\n`);
		process.exit(0);
	}
};

initDb();
