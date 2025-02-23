-- Creación de la base de datos para CasaLink
DROP DATABASE IF EXISTS casalinkdb;
CREATE DATABASE casalinkdb;

-- Seleccionar la base de datos creada
USE casalinkdb;

-- Borrar tablas si existen
DROP TABLE IF EXISTS blocks;
DROP TABLE IF EXISTS notifications;
DROP TABLE IF EXISTS favs;
DROP TABLE IF EXISTS images;
DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS contracts;
DROP TABLE IF EXISTS properties;
DROP TABLE IF EXISTS users;

-- Tabla de Usuarios
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
	-- Indices
	KEY usersIdx (email,legalId,role)
);

-- Tabla de Propiedades
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
	-- Llaves foráneas
	FOREIGN KEY (ownerId) REFERENCES users (id) ON DELETE CASCADE,
	-- Indices
	KEY propertiesIdx (addressLocality,zipCode,price,status)
);

-- Tabla de Contratos
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
	-- Llaves foráneas
	FOREIGN KEY (tenantId) REFERENCES users (id) ON DELETE CASCADE,
	FOREIGN KEY (propertyId) REFERENCES properties (id) ON DELETE CASCADE,
	-- Indices
	KEY contractsIdx2 (tenantId, propertyId, startDate, endDate, status)
);

-- Tabla de Reseñas
CREATE TABLE reviews (
	id                     INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
	reviewerId             INT UNSIGNED,
	reviewedId             INT UNSIGNED,
	contracId              INT UNSIGNED,
	rating                 TINYINT NOT NULL CHECK (rating >= 1 AND rating <= 5),
	comment                TEXT,
	createdAt              TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	removedAt              TIMESTAMP DEFAULT NULL,
	-- Llaves foráneas
	FOREIGN KEY (reviewerId) REFERENCES users (id) ON DELETE CASCADE,
	FOREIGN KEY (reviewedId) REFERENCES users (id) ON DELETE CASCADE,
	FOREIGN KEY (contracId) REFERENCES contracts (id) ON DELETE CASCADE,
	-- Indices
	KEY reviewsIdx (reviewerId, reviewedId, contracId, rating)
);

-- Tabla de Imágenes de Propiedades
CREATE TABLE images (
	id                     INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
	propertyId             INT UNSIGNED,
	imageUrl               VARCHAR(255) NOT NULL,
	sortIndex              TINYINT,
	createdAt              TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updatedAt              TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	removedAt              TIMESTAMP DEFAULT NULL,
	-- Llaves foráneas
	FOREIGN KEY (propertyId) REFERENCES properties (id),
	-- Indices
	KEY imagesIdx (sortIndex)
);

-- Tabla de Favoritos (Opcional)
CREATE TABLE favs (
	id                     INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
	userId                 INT UNSIGNED,
	propertyId             INT UNSIGNED,
	createdAt              TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	removedAt              TIMESTAMP DEFAULT NULL,
	-- Llaves foráneas
	FOREIGN KEY (userId) REFERENCES users (id),
	FOREIGN KEY (propertyId) REFERENCES properties (id),
	-- Indices
	UNIQUE KEY favsIdx (userId, propertyId)
);

-- Tabla de Notificaciones (Opcional)
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
	-- Llaves foráneas
	FOREIGN KEY (userId) REFERENCES users (id),
	FOREIGN KEY (propertyId) REFERENCES properties (id),
	-- Indices
	KEY notificationsIdx (userId, propertyId, type, status)
);

-- Tabla de Bloques (Opcional)
CREATE TABLE blocks (
	id                     INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
	userId                 INT UNSIGNED,
	propertyId             INT UNSIGNED,
	createdAt              TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	removedAt              TIMESTAMP DEFAULT NULL,
	-- Llaves foráneas
	FOREIGN KEY (userId) REFERENCES users (id),
	FOREIGN KEY (propertyId) REFERENCES properties (id),
	-- Indices
	UNIQUE KEY blocksIdx (userId, propertyId)
);


DELIMITER $$

-- Trigger para marcar un usuario como propietario si crea una propiedad
CREATE TRIGGER afterInsertProperty
AFTER INSERT ON properties
FOR EACH ROW
BEGIN
	UPDATE users
	SET isOwner = TRUE
	WHERE id = NEW.ownerId;
END$$

-- Trigger para marcar un usuario como NO propietario si se queda sin propiedades
CREATE TRIGGER afterDeleteProperty
AFTER DELETE ON properties
FOR EACH ROW
BEGIN
	IF (SELECT COUNT(*) FROM properties WHERE ownerId = OLD.ownerId) = 0 THEN
		UPDATE users
		SET isOwner = FALSE
		WHERE id = OLD.ownerId;
	END IF;
END$$

-- Trigger para actualizar la puntuación de un usuario
CREATE TRIGGER updateUserRating AFTER INSERT ON reviews
FOR EACH ROW
BEGIN
	UPDATE users
	SET
		averageRating = (SELECT COALESCE(AVG(rating), 0) FROM reviews WHERE reviewedId = NEW.reviewedId),
		totalReviews = (SELECT COUNT(*) FROM reviews WHERE reviewedId = NEW.reviewedId)
	WHERE id = NEW.reviewedId
END

DELIMITER ;