# Base de datos para `casalinkdb`

## Tabla `users`
| Campo      | Referencia | Tipo                             | Default           | Descripción                                       |
|------------|------------|----------------------------------|-------------------|---------------------------------------------------|
| id         | [PK]       | BINARY(16)                       | UUID              | Identificador único                               |
| name       |            | VARCHAR(100)                     |                   | Nombre                                            |
| legalId    |            | VARCHAR(20)                      |                   | Número de identificación legal (DNI, NIE, etc.)   |
| email      |            | VARCHAR(150)                     |                   | Correo electrónico                                |
| password   |            | VARCHAR(255)                     |                   | Contraseña                                        |
| phone      |            | VARCHAR(20)                      |                   | Teléfono                                          |
| role       |            | ENUM('tenant', 'owner', 'admin') | 'tenant'          | Rol del usuario                                   |
| isVerified |            | BOOLEAN                          | 'false'           | Verificación del correo y documentos del usuario. |
| createdAt  |            | TIMESTAMP                        | CURRENT_TIMESTAMP | Fecha de creación                                 |
| updatedAt  |            | TIMESTAMP                        | CURRENT_TIMESTAMP | Fecha de actualización                            |

## Tabla `properties`
| Campo     | Referencia            | Tipo                                   | Default           | Descripción                   |
|-----------|-----------------------|----------------------------------------|-------------------|-------------------------------|
| id        | [PK]                  | BINARY(16)                             | UUID              | Identificador único           |
| ownerId   | [ref: > users.id]     | BINARY(16)                             | UUID              | Identificador del propietario |
| title     |                       | VARCHAR(255)                           | NOT NULL          | Título                        |
| desc      |                       | TEXT                                   | NOT NULL          | Descripción                   |
| address   | - VER COMO ES MEJOR - | VARCHAR(255)                           | NOT NULL          | Dirección                     |
| latitud   |                       | DECIMAL(11,8)                          | NOT NULL          | Latitud de la propiedad       |
| longitud  |                       | DECIMAL(11,8)                          | NOT NULL          | Longitud de la propiedad      |
| bedrooms  |                       | TINYINT                                | NOT NULL          | Cantidad de habitaciones      |
| bathrooms |                       | TINYINT                                | NOT NULL          | Cantidad de baños             |
| city      |                       | VARCHAR(100)                           | NOT NULL          | Ciudad                        |
| price     |                       | DECIMAL(10,2)                          | NOT NULL          | Precio                        |
| status    |                       | ENUM('available', 'rented', 'pending') | 'pending'         | Estado del propiedad          |
| createdAt |                       | TIMESTAMP                              | CURRENT_TIMESTAMP | Fecha de creación             |
| updatedAt |                       | TIMESTAMP                              | CURRENT_TIMESTAMP | Fecha de actualización        |

## Tabla `rentals`
| Campo      | Referencia             | Tipo                                  | Default           | Descripción                   |
|------------|------------------------|---------------------------------------|-------------------|-------------------------------|
| id         | [PK]                   | BINARY(16)                            | UUID              | Identificador único           |
| tenantId   | [ref: > users.id]      | BINARY(16)                            | UUID              | Identificador del inquilino   |
| propertyId | [ref: > properties.id] | BINARY(16)                            | UUID              | Identificador de la propiedad |
| startDate  |                        | TIMESTAMP                             |                   | Fecha de inicio               |
| endDate    |                        | TIMESTAMP                             |                   | Fecha de finalización         |
| status     |                        | ENUM('pending', 'rented', 'returned') |                   | Estado del alquiler           |
| createdAt  |                        | TIMESTAMP                             | CURRENT_TIMESTAMP | Fecha de creación             |
| updatedAt  |                        | TIMESTAMP                             | CURRENT_TIMESTAMP | Fecha de actualización        |

## Tabla `reviews`
| Campo      | Referencia             | Tipo       | Default           | Descripción                   |
|------------|------------------------|------------|-------------------|-------------------------------|
| id         | [PK]                   | BINARY(16) | UUID              | Identificador único           |
| reviewerId | [ref: > users.id]      | BINARY(16) | UUID              | Usuario que escribe la reseña |
| reviewedId | [ref: > users.id]      | BINARY(16) | UUID              | Usuario/propiedad reseñada    |
| propertyId | [ref: > properties.id] | BINARY(16) | UUID              | Identificador de la propiedad |
| rating     |                        | TINYINT    | [note: '1 -> 5']  | Valoración del usuario        |
| comment    |                        | TEXT       |                   | Comentario del usuario        |
| createdAt  |                        | TIMESTAMP  | CURRENT_TIMESTAMP | Fecha de creación             |
| updatedAt  |                        | TIMESTAMP  | CURRENT_TIMESTAMP | Fecha de actualización        |


## Tabla `images`
| Campo      | Referencia             | Tipo         | Default           | Descripción                   |
|------------|------------------------|--------------|-------------------|-------------------------------|
| id         | [PK]                   | BINARY(16)   | UUID              | Identificador único           |
| propertyId | [ref: > properties.id] | BINARY(16)   | UUID              | Identificador de la propiedad |
| imageUrl   |                        | VARCHAR(255) |                   | URL de la imagen              |
| createdAt  |                        | TIMESTAMP    | CURRENT_TIMESTAMP | Fecha de creación             |
| updatedAt  |                        | TIMESTAMP    | CURRENT_TIMESTAMP | Fecha de actualización        |
| sortIndex  |                        | TINYINT      | 1                 | Orden de imagen en el anuncio |

## Tabla `messages` (Opcional)
| Campo      | Referencia        | Tipo       | Default           | Descripción                        |
|------------|-------------------|------------|-------------------|------------------------------------|
| id         | [PK]              | BINARY(16) | UUID              | Identificador único                |
| senderId   | [ref: > users.id] | BINARY(16) | UUID              | Identificador del remitente        |
| receiverId | [ref: > users.id] | BINARY(16) | UUID              | Identificador del destinatario     |
| content    |                   | TEXT       |                   | Contenido del mensaje              |
| isRead     |                   | BOOLEAN    | 'false'           | Indica si el mensaje ha sido leído |
| sendAt     |                   | TIMESTAMP  | CURRENT_TIMESTAMP | Fecha de envío                     |

## Tabla `favs` (Opcional)
| Campo      | Referencia             | Tipo       | Default           | Descripción                   |
|------------|------------------------|------------|-------------------|-------------------------------|
| id         | [PK]                   | BINARY(16) | UUID              | Identificador único           |
| userId     | [ref: > users.id]      | BINARY(16) | UUID              | Identificador del usuario     |
| propertyId | [ref: > properties.id] | BINARY(16) | UUID              | Identificador de la propiedad |
| createdAt  |                        | TIMESTAMP  | CURRENT_TIMESTAMP | Fecha de creación             |