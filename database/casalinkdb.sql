-- Creación de la base de datos para CasaLink
CREATE DATABASE casalinkdb;

-- Seleccionar la base de datos creada
USE casalinkdb;

-- Borrar tablas si existen
DROP TABLE IF EXISTS `notifications`;
DROP TABLE IF EXISTS `favs`;
DROP TABLE IF EXISTS `images`;
DROP TABLE IF EXISTS `reviews`;
DROP TABLE IF EXISTS `contracts`;
DROP TABLE IF EXISTS `properties`;
DROP TABLE IF EXISTS `users`;

-- Tabla de Usuarios
CREATE TABLE `users` (
	`id`                     INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
	`name`                   VARCHAR(100),
	`lastName`               VARCHAR(100),
	`legalId`                VARCHAR(20) UNIQUE,
	`email`                  VARCHAR(100) UNIQUE NOT NULL,
	`password`               VARCHAR(255), -- hashed
	`phone`                  VARCHAR(255), -- hashed
	`avatarUrl`              VARCHAR(255),
	`bio`                    TEXT,
	`role`                   ENUM (`user`, `admin`, `superadmin`, `owner`) DEFAULT `user`,
	`recoveryCode`           VARCHAR(100) DEFAULT NULL,
	`isEmailVerified`        BOOLEAN DEFAULT FALSE,
	`isDocsVerified`         BOOLEAN DEFAULT FALSE,
	`createdAt`              TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	`updatedAt`              TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	-- Indices
	KEY `usersIdx` (`email`,`legalId`,`role`)
);

-- Tabla de Propiedades
CREATE TABLE `properties` (
	`id`                     INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
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
	`status`                 ENUM (`available`,`unavailable`, `rented`, `pending`, `rejected`) DEFAULT `pending`,
	`createdAt`              TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	`updatedAt`              TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	-- Llaves foráneas
	FOREIGN KEY (`ownerId`) REFERENCES `users` (`id`) ON DELETE CASCADE,
	-- Indices
	KEY `propertiesIdx` (`addressLocality`,`zipCode`,`price`,`status`)
);

-- Tabla de Contratos
CREATE TABLE `contracts` (
	`id`                     INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
	`tenantId`               INT UNSIGNED,
	`propertyId`             INT UNSIGNED,
	`startDate`              TIMESTAMP NOT NULL,
	`endDate`                TIMESTAMP  DEFAULT NULL,
	`pdfUrl`                 VARCHAR(255)  DEFAULT NULL,
	`status`                 ENUM (`pending`, `approved`, `rejected`, `ongoing`, `finished`, `canceled`) NOT NULL,
	`createdAt`              TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	`updatedAt`              TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	-- Llaves foráneas
	FOREIGN KEY (`tenantId`) REFERENCES `users` (`id`) ON DELETE CASCADE,
	FOREIGN KEY (`propertyId`) REFERENCES `properties` (`id`) ON DELETE CASCADE,
	-- Indices
	KEY `contractsIdx2` (`tenantId`, `propertyId`, `startDate`, `endDate`, `status`)
);

-- Tabla de Reseñas
CREATE TABLE `reviews` (
	`id`                     INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
	`reviewerId`             INT UNSIGNED,
	`reviewedId`             INT UNSIGNED,
	`contracId`              INT UNSIGNED,
	`rating`                 TINYINT NOT NULL CHECK (rating >= 1 AND rating <= 5),
	`comment`                TEXT,
	`createdAt`              TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	`removedAt`              TIMESTAMP DEFAULT NULL,
	-- Llaves foráneas
	FOREIGN KEY (`reviewerId`) REFERENCES `users` (`id`) ON DELETE CASCADE,
	FOREIGN KEY (`reviewedId`) REFERENCES `users` (`id`) ON DELETE CASCADE,
	FOREIGN KEY (`contracId`) REFERENCES `contracts` (`id`) ON DELETE CASCADE,
	-- Indices
	KEY `reviewsIdx` (`reviewerId`, `reviewedId`, `contracId`, `rating`)
);

-- Tabla de Imágenes de Propiedades
CREATE TABLE `images` (
	`id`                     INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
	`propertyId`             INT UNSIGNED,
	`imageUrl`               VARCHAR(255) NOT NULL,
	`sortIndex`              TINYINT,
	`createdAt`              TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	`updatedAt`              TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	`removedAt`              TIMESTAMP DEFAULT NULL,
	-- Llaves foráneas
	FOREIGN KEY (`propertyId`) REFERENCES `properties` (`id`),
	-- Indices
	KEY `imagesIdx` (`sortIndex`)
);

-- Tabla de Favoritos (Opcional)
CREATE TABLE `favs` (
	`id`                     INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
	`userId`                 INT UNSIGNED,
	`propertyId`             INT UNSIGNED,
	`createdAt`              TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	`removedAt`              TIMESTAMP DEFAULT NULL,
	-- Llaves foráneas
	FOREIGN KEY (`userId`) REFERENCES `users` (`id`),
	FOREIGN KEY (`propertyId`) REFERENCES `properties` (`id`),
	-- Indices
	UNIQUE KEY `favsIdx` (`userId`, `propertyId`)
);

-- Tabla de Notificaciones (Opcional)
CREATE TABLE `notifications` (
	`id`                     INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
	`userId`                 INT UNSIGNED,
	`propertyId`             INT UNSIGNED,
	`message`                TEXT NOT NULL,
	`type`                   ENUM (`visit`, `property`, `review`, `contract`) NOT NULL,
	`status`                 ENUM (`requested`, `approved`,  `rejected`) NOT NULL,
	`isRead`                 BOOLEAN DEFAULT false,
	`createdAt`              TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	`readAt`                 TIMESTAMP DEFAULT NULL,
	-- Llaves foráneas
	FOREIGN KEY (`userId`) REFERENCES `users` (`id`),
	FOREIGN KEY (`propertyId`) REFERENCES `properties` (`id`),
	-- Indices
	KEY `notificationsIdx` (`userId`, `propertyId`, `type`, `status`)
);


-- Insertar un usuario de prueba (John Doe)
INSERT INTO `users` (`name`, `lastName`, `legalId`, `email`, `password`, `phone`, `avatarUrl`, `bio`, `role`, `isEmailVerified`)
VALUES (
    'John', 'Doe', '12345678A', 'johndoe@example.com',
    '$2b$10$X7GFzJ84X1lU3O7DwESL.eK7zFgC3J83/vImTc2uPaE5yJdTAd9kW', -- Contraseña hash "password123"
    '123456789', 'https://example.com/avatar.jpg',
    'Soy un usuario de prueba en Casalink', 'user', FALSE
);
