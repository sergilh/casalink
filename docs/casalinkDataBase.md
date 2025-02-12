# Base de Datos - CasaLink

Estructura de la base de datos de CasaLink, una plataforma para la búsqueda y gestión de alquileres.

![Diagrama de la Base de Datos](./media/casalinkdb.jpg)

## Esquema de la Base de Datos

### Tabla `roles`
Define los roles que pueden tener los usuarios dentro de la plataforma.

| Campo  | Tipo | Restricciones |
|--------|------|--------------|
| id     | BINARY(16) | PRIMARY KEY |
| name   | ENUM('tenant', 'owner', 'admin', 'superadmin') | UNIQUE, NOT NULL |

---

### Tabla `users`
Almacena la información de los usuarios registrados en la plataforma.

| Campo           | Tipo          | Restricciones |
|----------------|--------------|--------------|
| id            | BINARY(16)    | PRIMARY KEY  |
| name          | VARCHAR(100)  |  |
| lastName      | VARCHAR(100)  |  |
| legalId       | VARCHAR(20)   |  |
| email         | VARCHAR(150)  | UNIQUE, NOT NULL |
| password      | VARCHAR(255)  |  |
| phone         | VARCHAR(255)  |  |
| avatarUrl     | VARCHAR(255)  |  |
| isEmailVerified | BOOLEAN | DEFAULT FALSE |
| isDocsVerified | BOOLEAN | DEFAULT FALSE |
| createdAt     | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |
| updatedAt     | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |

---

### Tabla `userRoles`
Relaciona a los usuarios con sus roles.

| Campo    | Tipo       | Restricciones |
|----------|-----------|--------------|
| id       | BINARY(16) | PRIMARY KEY  |
| userId   | BINARY(16) | FOREIGN KEY -> users(id) |
| roleId   | BINARY(16) | FOREIGN KEY -> roles(id) |
| createdAt | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |

---

### Tabla `properties`
Almacena la información de las propiedades en alquiler.

| Campo               | Tipo       | Restricciones |
|---------------------|-----------|--------------|
| id                 | BINARY(16) | PRIMARY KEY  |
| ownerId            | BINARY(16) | FOREIGN KEY -> users(id) |
| adTitle            | VARCHAR(255) | NOT NULL |
| description        | TEXT       | NOT NULL |
| formattedAddress   | VARCHAR(255) | NOT NULL |
| zipCode            | VARCHAR(5) | NOT NULL |
| location           | POINT      | NOT NULL |
| squareMeters       | SMALLINT   |  |
| bedrooms           | TINYINT    | NOT NULL |
| bathrooms          | TINYINT    | NOT NULL |
| price              | DECIMAL(10,2) | NOT NULL |
| status             | ENUM('available', 'rented', 'pending') | DEFAULT 'pending' |
| createdAt          | TIMESTAMP  | DEFAULT CURRENT_TIMESTAMP |
| updatedAt          | TIMESTAMP  | DEFAULT CURRENT_TIMESTAMP |

---

### Tabla `rentalContracts`
Registra los contratos de alquiler entre inquilinos y propietarios.

| Campo      | Tipo       | Restricciones |
|-----------|-----------|--------------|
| id        | BINARY(16) | PRIMARY KEY  |
| tenantId  | BINARY(16) | FOREIGN KEY -> users(id) |
| propertyId | BINARY(16) | FOREIGN KEY -> properties(id) |
| startDate | TIMESTAMP  | NOT NULL |
| endDate   | TIMESTAMP  |  |
| status    | ENUM('pending', 'approved', 'rejected', 'ongoing', 'canceled') | NOT NULL |
| pdfUrl    | VARCHAR(255) |  |
| createdAt | TIMESTAMP  | DEFAULT CURRENT_TIMESTAMP |
| updatedAt | TIMESTAMP  | DEFAULT CURRENT_TIMESTAMP |

---

### Tabla `reviews`
Almacena las reseñas realizadas por los usuarios.

| Campo      | Tipo       | Restricciones |
|-----------|-----------|--------------|
| id        | BINARY(16) | PRIMARY KEY  |
| reviewerId | BINARY(16) | FOREIGN KEY -> users(id) |
| reviewedId | BINARY(16) | FOREIGN KEY -> users(id) |
| rentalId  | BINARY(16) | FOREIGN KEY -> rentalContracts(id) |
| rating    | TINYINT    | NOT NULL |
| comment   | TEXT      |  |
| createdAt | TIMESTAMP  | DEFAULT CURRENT_TIMESTAMP |

---

### Tabla `images`
Guarda las imágenes de las propiedades.

| Campo      | Tipo       | Restricciones |
|-----------|-----------|--------------|
| id        | BINARY(16) | PRIMARY KEY  |
| propertyId | BINARY(16) | FOREIGN KEY -> properties(id) |
| imageUrl  | VARCHAR(255) | NOT NULL |
| sortIndex | TINYINT   | DEFAULT 1 |
| createdAt | TIMESTAMP  | DEFAULT CURRENT_TIMESTAMP |
| updatedAt | TIMESTAMP  | DEFAULT CURRENT_TIMESTAMP |

---

### Tabla `favs`
Permite a los usuarios marcar propiedades como favoritas.

| Campo      | Tipo       | Restricciones |
|-----------|-----------|--------------|
| id        | BINARY(16) | PRIMARY KEY  |
| userId    | BINARY(16) | FOREIGN KEY -> users(id) |
| propertyId | BINARY(16) | FOREIGN KEY -> properties(id) |
| createdAt | TIMESTAMP  | DEFAULT CURRENT_TIMESTAMP |
| UNIQUE(userId, propertyId) |

---

### Tabla `notifications`
Almacena las notificaciones enviadas a los usuarios.

| Campo      | Tipo       | Restricciones |
|-----------|-----------|--------------|
| id        | BINARY(16) | PRIMARY KEY  |
| userId    | BINARY(16) | FOREIGN KEY -> users(id) |
| propertyId | BINARY(16) | FOREIGN KEY -> properties(id) |
| message   | TEXT      | NOT NULL |
| type      | ENUM('visit_request', 'visit_accepted', 'visit_rejected', 'property_approved', 'property_rejected', 'review_received') | NOT NULL |
| isRead    | BOOLEAN   | DEFAULT FALSE |
| createdAt | TIMESTAMP  | DEFAULT CURRENT_TIMESTAMP |
| readAt    | TIMESTAMP  |  |

---