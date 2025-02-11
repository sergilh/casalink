# Base de datos para `casalinkdb`

## Tabla `users`

| Campo           | Referencia      | Tipo                                           | Default           | Descripción                                                |
|-----------------|-----------------|------------------------------------------------|-------------------|------------------------------------------------------------|
| id              | [PK]            | BINARY(16)                                     | UUID              | Identificador único de usuario.                            |
| name            |                 | VARCHAR(100)                                   |                   | Nombre del usuario                                         |
| lastName        |                 | VARCHAR(100)                                   |                   | Apellido del usuario                                       |
| legalId         |                 | VARCHAR(20)                                    |                   | Número de identificación legal (DNI, NIE, pasaporte, etc.) |
| email           | [UNIQUE, INDEX] | VARCHAR(150)                                   |                   | Correo electrónico                                         |
| password        |                 | VARCHAR(255)                                   |                   | Contraseña almacenada como hash                            |
| phone           | [INDEX]         | VARCHAR(20)                                    |                   | Teléfono                                                   |
| role            |                 | ENUM('tenant', 'owner', 'admin', 'superadmin') | 'tenant'          | Rol del usuario                                            |
| isEmailVerified |                 | BOOLEAN                                        | 'false'           | Indica si el correo está verificado.                       |
| isDocsVerified  |                 | BOOLEAN                                        | 'false'           | Indica si los documentos están verificados.                |
| createdAt       |                 | TIMESTAMP                                      | CURRENT_TIMESTAMP | Fecha de creación                                          |
| updatedAt       |                 | TIMESTAMP                                      | CURRENT_TIMESTAMP | Fecha de actualización                                     |

---

## Tabla `properties`

| Campo                | Referencia        | Tipo                                   | Default           | Descripción                                |
|----------------------|-------------------|----------------------------------------|-------------------|--------------------------------------------|
| id                   | [PK]              | BINARY(16)                             | UUID              | Identificador único del anuncio            |
| ownerId              | [ref: > users.id] | BINARY(16)                             | UUID              | Identificador del propietario              |
| adTitle              |                   | VARCHAR(255)                           | NOT NULL          | Título del anuncio                         |
| desc                 |                   | TEXT                                   | NOT NULL          | Descripción                                |
| formattedAddress     |                   | VARCHAR(255)                           | NOT NULL          | Dirección formateada por el usuario        |
| addressLocality      | [INDEX]           | VARCHAR(255)                           |                   | Localidad (Ciudad)                         |
| addressStreetName    |                   | VARCHAR(255)                           |                   | Nombre de la calle o vía                   |
| addressNumber        |                   | VARCHAR(10)                            |                   | Número de casa                             |
| addressFloorNumber   |                   | VARCHAR(10)                            |                   | Planta                                     |
| hasEnergyCertificate |                   | BOOLEAN                                | 'false'           | Certificado Energético                     |
| zipCode              | [INDEX]           | VARCHAR(5)                             | NOT NULL          | Código postal                              |
| location             |                   | POINT                                  | NOT NULL          | Coordenadas geográficas (latitud/longitud) |
| squareMeters         |                   | SMALLINT                               |                   | Metros cuadrados de la propiedad           |
| bedrooms             |                   | TINYINT                                | NOT NULL          | Cantidad de habitaciones                   |
| bathrooms            |                   | TINYINT                                | NOT NULL          | Cantidad de baños                          |
| price                | [INDEX]           | DECIMAL(10,2)                          | NOT NULL          | Precio                                     |
| status               | [INDEX]           | ENUM('available', 'rented', 'pending') | 'pending'         | Estado de la propiedad                     |
| createdAt            |                   | TIMESTAMP                              | CURRENT_TIMESTAMP | Fecha de creación                          |
| updatedAt            |                   | TIMESTAMP                              | CURRENT_TIMESTAMP | Fecha de actualización                     |

---

## Tabla `rentals`

| Campo      | Referencia             | Tipo                                             | Default           | Descripción                                  |
|------------|------------------------|--------------------------------------------------|-------------------|----------------------------------------------|
| id         | [PK]                   | BINARY(16)                                       | UUID              | Identificador único                          |
| tenantId   | [ref: > users.id]      | BINARY(16)                                       | UUID              | Identificador del inquilino                  |
| propertyId | [ref: > properties.id] | BINARY(16)                                       | UUID              | Identificador de la propiedad                |
| startDate  | [INDEX]                | TIMESTAMP                                        |                   | Fecha de inicio                              |
| endDate    |                        | TIMESTAMP NULL                                   | NULL              | Fecha de finalización (puede ser indefinida) |
| status     | [INDEX]                | ENUM('pending', 'rented', 'rejected','canceled') |                   | Estado del alquiler                          |
| createdAt  |                        | TIMESTAMP                                        | CURRENT_TIMESTAMP | Fecha de creación                            |
| updatedAt  |                        | TIMESTAMP                                        | CURRENT_TIMESTAMP | Fecha de actualización                       |

---

## Tabla `reviews`

| Campo      | Referencia          | Tipo       | Default           | Descripción                        |
|------------|---------------------|------------|-------------------|------------------------------------|
| id         | [PK]                | BINARY(16) | UUID              | Identificador único                |
| reviewerId | [ref: > users.id]   | BINARY(16) | UUID              | Usuario que escribe la reseña      |
| reviewedId | [ref: > users.id]   | BINARY(16) | UUID              | Usuario que recibe la reseña       |
| rentalId   | [ref: > rentals.id] | BINARY(16) | UUID              | Alquiler relacionado con la reseña |
| rating     | [INDEX]             | TINYINT    | [note: '1 -> 5']  | Valoración del usuario             |
| comment    |                     | TEXT       |                   | Comentario del usuario             |
| createdAt  | [INDEX]             | TIMESTAMP  | CURRENT_TIMESTAMP | Fecha de creación                  |

---

## Tabla `images`

| Campo      | Referencia             | Tipo         | Default           | Descripción                   |
|------------|------------------------|--------------|-------------------|-------------------------------|
| id         | [PK]                   | BINARY(16)   | UUID              | Identificador único           |
| propertyId | [ref: > properties.id] | BINARY(16)   | UUID              | Identificador de la propiedad |
| imageUrl   |                        | VARCHAR(255) |                   | URL de la imagen              |
| createdAt  |                        | TIMESTAMP    | CURRENT_TIMESTAMP | Fecha de creación             |
| updatedAt  |                        | TIMESTAMP    | CURRENT_TIMESTAMP | Fecha de actualización        |
| sortIndex  |                        | TINYINT      | 1                 | Orden de imagen en el anuncio |

---

## Tabla `favs`

| Campo      | Referencia             | Tipo       | Default           | Descripción                   |
|------------|------------------------|------------|-------------------|-------------------------------|
| id         | [PK]                   | BINARY(16) | UUID              | Identificador único           |
| userId     | [ref: > users.id]      | BINARY(16) | UUID              | Identificador del usuario     |
| propertyId | [ref: > properties.id] | BINARY(16) | UUID              | Identificador de la propiedad |
| createdAt  |                        | TIMESTAMP  | CURRENT_TIMESTAMP | Fecha de creación             |