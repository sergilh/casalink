CREATE SCHEMA IF NOT EXISTS `casalinkdb`;

CREATE TABLE IF NOT EXISTS `casalinkdb`.`users` (
	`id` BINARY(16) PRIMARY KEY,
	`name` VARCHAR(500),
	`email` VARCHAR(500) UNIQUE,
	`password` VARCHAR(500),
	`phone` VARCHAR(500),
	`role` ENUM('admin', 'user') DEFAULT 'user',
	`createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS `casalinkdb`.`properties` (
	`id` BINARY(16) PRIMARY KEY,
	`ownerId` BINARY(16),
	`title` VARCHAR(500),
	`desc` TEXT,
	`address` VARCHAR(500),
	`city` VARCHAR(500),
	`price` DECIMAL(10, 2),
	`status` ENUM('available', 'rented') DEFAULT 'available',
	`createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS `casalinkdb`.`rentals` (
	`id` BINARY(16) PRIMARY KEY,
	`tenantId` BINARY(16),
	`propertyId` BINARY(16),
	`startDate` DATE,
	`endDate` DATE,
	`status` ENUM('active', 'completed') DEFAULT 'active',
	`createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS `casalinkdb`.`reviews` (
	`id` BINARY(16) PRIMARY KEY,
	`tenantId` BINARY(16),
	`propertyId` BINARY(16),
	`rating` INT,
	`comment` TEXT,
	`createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS `casalinkdb`.`messages` (
	`id` BINARY(16) PRIMARY KEY,
	`senderId` BINARY(16),
	`receiverId` BINARY(16),
	`content` TEXT,
	`isRead` TINYINT(1),
	`createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS `casalinkdb`.`images` (
	`id` BINARY(16) PRIMARY KEY,
	`propertyId` BINARY(16),
	`imageUrl` VARCHAR(500),
	`desc` TEXT,
	`createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE `casalinkdb`.`users` ADD CONSTRAINT `users_id_properties_ownerId` FOREIGN KEY (`id`) REFERENCES `casalinkdb`.`properties` (`ownerId`);
ALTER TABLE `casalinkdb`.`users` ADD CONSTRAINT `users_id_rentals_tenantId` FOREIGN KEY (`id`) REFERENCES `casalinkdb`.`rentals` (`tenantId`);
ALTER TABLE `casalinkdb`.`properties` ADD CONSTRAINT `properties_id_rentals_propertyId` FOREIGN KEY (`id`) REFERENCES `casalinkdb`.`rentals` (`propertyId`);
ALTER TABLE `casalinkdb`.`users` ADD CONSTRAINT `users_id_reviews_tenantId` FOREIGN KEY (`id`) REFERENCES `casalinkdb`.`reviews` (`tenantId`);
ALTER TABLE `casalinkdb`.`properties` ADD CONSTRAINT `properties_id_reviews_propertyId` FOREIGN KEY (`id`) REFERENCES `casalinkdb`.`reviews` (`propertyId`);
ALTER TABLE `casalinkdb`.`users` ADD CONSTRAINT `users_id_messages_senderId` FOREIGN KEY (`id`) REFERENCES `casalinkdbc`.`messages` (`senderId`);
ALTER TABLE `casalinkdb`.`users` ADD CONSTRAINT `users_id_messages_receiverId` FOREIGN KEY (`id`) REFERENCES `casalinkdb`.`messages` (`receiverId`);
ALTER TABLE `casalinkdb`.`properties` ADD CONSTRAINT `properties_id_images_propertyId` FOREIGN KEY (`id`) REFERENCES `casalinkdb`.`images` (`propertyId`);



-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS casalinkdb;
USE casalinkdb;

-- Tabla de usuarios (inquilinos y propietarios)
CREATE TABLE IF NOT EXISTS `casalinkdb`.`users` (
	`id`			INT PRIMARY KEY AUTO_INCREMENT,										-- Identificador único
	`name`			VARCHAR(100) NOT NULL,												-- Nombre
	`email`			VARCHAR(100) UNIQUE NOT NULL,										-- Correo electrónico
	`password`		VARCHAR(255) NOT NULL,												-- Contraseña
	`phone` 		VARCHAR(20) NOT NULL,												-- Teléfono
	`role`			ENUM('tenant', 'owner', 'admin') NOT NULL DEFAULT 'user', 			-- Rol del usuario
	`isVerified`	BOOLEAN DEFAULT FALSE, 												-- Verificación de correo
	`createdAt`		TIMESTAMP DEFAULT CURRENT_TIMESTAMP,								-- Fecha de creación
	`updatedAt` 	TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP		-- Fecha de actualización
);

-- Tabla de propiedades
CREATE TABLE IF NOT EXISTS `casalinkdb`.`properties` (
	`id`			INT PRIMARY KEY AUTO_INCREMENT,										-- Identificador único
	`title`			VARCHAR(255) NOT NULL,												-- Título
	`description`	TEXT NOT NULL,														-- Descripción
	`price` DECIMAL(10, 2) NOT NULL,													-- Precio
	`address` VARCHAR(255) NOT NULL,													-- Dirección
	`city` VARCHAR(100) NOT NULL,														-- Ciudad
	`bedrooms` INT NOT NULL,															-- Habitaciones
	`bathrooms` INT NOT NULL,															-- Baños
	`status` ENUM('available', 'rented') DEFAULT 'available',							-- Estado del propiedad
	`ownerId` INT NOT NULL,																-- Propietario
	`createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,									-- Fecha de creación
	`updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP			-- Fecha de actualización
	FOREIGN KEY (`ownerId`) REFERENCES ``.users(id) ON DELETE CASCADE					-- Id Propietario	
);


-- Tabla de reseñas (entre usuarios)
CREATE TABLE reviews (
    id INT PRIMARY KEY AUTO_INCREMENT,
    reviewer_id INT NOT NULL, -- Usuario que escribe la reseña
    reviewed_id INT NOT NULL, -- Usuario/propiedad reseñada
    rating TINYINT NOT NULL CHECK (rating BETWEEN 1 AND 5), -- Puntuación 1-5
    comment TEXT,
    type ENUM('user_to_user', 'user_to_property') NOT NULL, -- Ej: inquilino→propietario
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (reviewer_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (reviewed_id) REFERENCES users(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS `casalinkdb`.`reviews` (
	`id` BINARY(16) PRIMARY KEY,
	`tenantId` BINARY(16),
	`propertyId` BINARY(16),
	`rating` INT,
	`comment` TEXT,
	`createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de mensajes entre usuarios
CREATE TABLE messages (
    id INT PRIMARY KEY AUTO_INCREMENT,
    sender_id INT NOT NULL,
    receiver_id INT NOT NULL,
    property_id INT, -- Opcional: relacionar mensaje con una propiedad
    content TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (receiver_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE SET NULL
);
CREATE TABLE IF NOT EXISTS `casalinkdb`.`messages` (
	`id` BINARY(16) PRIMARY KEY,
	`senderId` BINARY(16),
	`receiverId` BINARY(16),
	`content` TEXT,
	`isRead` TINYINT(1),
	`createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de contratos
CREATE TABLE contracts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    property_id INT NOT NULL,
    tenant_id INT NOT NULL, -- Inquilino
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status ENUM('active', 'completed', 'canceled') DEFAULT 'active',
    pdf_url VARCHAR(255), -- Enlace al contrato firmado
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE,
    FOREIGN KEY (tenant_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `casalinkdb`.`rentals` (
	`id` BINARY(16) PRIMARY KEY,
	`tenantId` BINARY(16),
	`propertyId` BINARY(16),
	`startDate` DATE,
	`endDate` DATE,
	`status` ENUM('active', 'completed') DEFAULT 'active',
	`createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de favoritos (propiedades guardadas por usuarios)
CREATE TABLE favorites (
    user_id INT NOT NULL,
    property_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, property_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
);

-- Índices para optimizar consultas comunes
CREATE INDEX idx_properties_city ON properties(city);
CREATE INDEX idx_properties_price ON properties(price);
CREATE INDEX idx_users_email ON users(email);




CREATE TABLE IF NOT EXISTS `casalinkdb`.`images` (
	`id` BINARY(16) PRIMARY KEY,
	`propertyId` BINARY(16),
	`imageUrl` VARCHAR(500),
	`desc` TEXT,
	`createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE `casalinkdb`.`users` ADD CONSTRAINT `users_id_rentals_tenantId` FOREIGN KEY (`id`) REFERENCES `casalinkdb`.`rentals` (`tenantId`);
ALTER TABLE `casalinkdb`.`properties` ADD CONSTRAINT `properties_id_rentals_propertyId` FOREIGN KEY (`id`) REFERENCES `casalinkdb`.`rentals` (`propertyId`);
ALTER TABLE `casalinkdb`.`users` ADD CONSTRAINT `users_id_reviews_tenantId` FOREIGN KEY (`id`) REFERENCES `casalinkdb`.`reviews` (`tenantId`);
ALTER TABLE `casalinkdb`.`properties` ADD CONSTRAINT `properties_id_reviews_propertyId` FOREIGN KEY (`id`) REFERENCES `casalinkdb`.`reviews` (`propertyId`);
ALTER TABLE `casalinkdb`.`users` ADD CONSTRAINT `users_id_messages_senderId` FOREIGN KEY (`id`) REFERENCES `casalinkdbc`.`messages` (`senderId`);
ALTER TABLE `casalinkdb`.`users` ADD CONSTRAINT `users_id_messages_receiverId` FOREIGN KEY (`id`) REFERENCES `casalinkdb`.`messages` (`receiverId`);
ALTER TABLE `casalinkdb`.`properties` ADD CONSTRAINT `properties_id_images_propertyId` FOREIGN KEY (`id`) REFERENCES `casalinkdb`.`images` (`propertyId`);