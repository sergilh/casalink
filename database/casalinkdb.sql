-- Creación de la base de datos para CasaLink

CREATE DATABASE casalinkdb;
USE casalinkdb;

-- Tabla de roles
CREATE TABLE roles (
	id   BINARY(16) PRIMARY KEY,
	name ENUM('tenant', 'owner', 'admin', 'superadmin') UNIQUE NOT NULL
);

-- Tabla de Usuarios
CREATE TABLE users (
	id              BINARY(16) PRIMARY KEY,
	name            VARCHAR(100),
	lastName        VARCHAR(100),
	legalId         VARCHAR(20),
	email           VARCHAR(150) UNIQUE NOT NULL,
	password        VARCHAR(255), -- hashed
	phone           VARCHAR(255), -- hashed
	avatarUrl       VARCHAR(255),
	isEmailVerified BOOLEAN DEFAULT FALSE,
	isDocsVerified  BOOLEAN DEFAULT FALSE,
	createdAt       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updatedAt       TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Rol de Usuario
CREATE TABLE userRoles (
	id       BINARY(16) PRIMARY KEY,
	userId   BINARY(16) NOT NULL,
	roleId   BINARY(16) NOT NULL,
	createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (userId) REFERENCES users(id),
	FOREIGN KEY (roleId) REFERENCES roles(id),
	UNIQUE(userId, roleId)
);

-- Tabla de Propiedades
CREATE TABLE properties (
	id                   BINARY(16) PRIMARY KEY,
	ownerId              BINARY(16) NOT NULL,
	adTitle              VARCHAR(255) NOT NULL,
	description          TEXT NOT NULL,
	formattedAddress     VARCHAR(255) NOT NULL,
	addressLocality      VARCHAR(255),
	addressStreetName    VARCHAR(255),
	addressNumber        VARCHAR(10),
	addressFloorNumber   VARCHAR(10),
	hasEnergyCertificate BOOLEAN DEFAULT FALSE,
	zipCode              VARCHAR(5) NOT NULL,
	location             POINT NOT NULL,
	squareMeters         SMALLINT,
	bedrooms             TINYINT NOT NULL,
	bathrooms            TINYINT NOT NULL,
	price                DECIMAL(10,2) NOT NULL,
	status               ENUM('available', 'rented', 'pending') DEFAULT 'pending',
	createdAt            TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updatedAt            TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (ownerId) REFERENCES users(id)
);

-- Tabla de Alquileres
CREATE TABLE rentalContracts (
	id         BINARY(16) PRIMARY KEY,
	tenantId   BINARY(16) NOT NULL,
	propertyId BINARY(16) NOT NULL,
	startDate  TIMESTAMP NOT NULL,
	endDate    TIMESTAMP NULL,
	status     ENUM('pending', 'approved', 'rejected', 'ongoing', 'canceled') NOT NULL,
	createdAt  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updatedAt  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	pdfUrl     VARCHAR(255),
	FOREIGN KEY (tenantId) REFERENCES users(id),
	FOREIGN KEY (propertyId) REFERENCES properties(id)
);

-- Tabla de Reseñas
CREATE TABLE reviews (
	id         BINARY(16) PRIMARY KEY,
	reviewerId BINARY(16) NOT NULL,
	reviewedId BINARY(16) NOT NULL,
	rentalId   BINARY(16) NOT NULL,
	rating     TINYINT NOT NULL,
	comment    TEXT,
	createdAt  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (reviewerId) REFERENCES users(id),
	FOREIGN KEY (reviewedId) REFERENCES users(id),
	FOREIGN KEY (rentalId) REFERENCES rentalContracts(id)
	
);

-- Tabla de Imágenes de Propiedades
CREATE TABLE images (
	id         BINARY(16) PRIMARY KEY,
	propertyId BINARY(16) NOT NULL,
	imageUrl   VARCHAR(255) NOT NULL,
	sortIndex  TINYINT DEFAULT 1,
	createdAt  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updatedAt  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (propertyId) REFERENCES properties(id)
);

-- Tabla de Favoritos (Opcional)
CREATE TABLE favs (
	id         BINARY(16) PRIMARY KEY,
	userId     BINARY(16) NOT NULL,
	propertyId BINARY(16) NOT NULL,
	createdAt  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	UNIQUE(userId, propertyId),
	FOREIGN KEY (userId) REFERENCES users(id),
	FOREIGN KEY (propertyId) REFERENCES properties(id)
);

-- Tabla de Notificaciones (Opcional)
CREATE TABLE notifications (
	id         BINARY(16) PRIMARY KEY,
	userId     BINARY(16) NOT NULL,
	propertyId BINARY(16) NOT NULL,
	message    TEXT NOT NULL,
	type       ENUM('visit_request', 'visit_accepted', 'visit_rejected', 'property_approved', 'property_rejected', 'review_received') NOT NULL,
	isRead     BOOLEAN DEFAULT FALSE,
	createdAt  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	readAt     TIMESTAMP NULL,
	FOREIGN KEY (userId) REFERENCES users(id),
	FOREIGN KEY (propertyId) REFERENCES properties(id)
);
