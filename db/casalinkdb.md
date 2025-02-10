# Base de datos para Casalink

## Tabla `users`
| Campo     | Referencia    | Tipo                             | Descripción            |
|-----------|---------------|----------------------------------|------------------------|
| id        | [primary key] | UUID                             | Identificador único    |
| name      |               | VARCHAR(100)                     | Nombre                 |
| email     |               | VARCHAR(150)                     | Correo electrónico     |
| password  |               | VARCHAR(255)                     | Contraseña             |
| phone     |               | VARCHAR(20)                      | Teléfono               |
| role      |               | ENUM('tenant', 'owner', 'admin') | Rol del usuario        |
| createdAt |               | TIMESTAMP                        | Fecha de creación      |
| updatedAt |               | TIMESTAMP                        | Fecha de actualización |

## Tabla `properties`
| Campo     | Referencia        | Tipo                                   | Descripción                   |
|-----------|-------------------|----------------------------------------|-------------------------------|
| id        | [primary key]     | UUID                                   | Identificador único           |
| ownerId   | [ref: > users.id] | UUID                                   | Identificador del propietario |
| title     |                   | VARCHAR(255)                           | Título                        |
| desc      |                   | TEXT                                   | Descripción                   |
| address   |                   | VARCHAR(255)                           | Dirección                     |
| city      |                   | VARCHAR(100)                           | Ciudad                        |
| price     |                   | DECIMAL(10,2)                          | Precio                        |
| status    |                   | ENUM('available', 'rented', 'pending') | Estado del propiedad          |
| createdAt |                   | [default: `CURRENT_TIMESTAMP`]         | Fecha de creación             |
| updatedAt |                   | [default: `CURRENT_TIMESTAMP`]         | Fecha de actualización        |

## Tabla `rentals`
| Campo      | Referencia             | Tipo                                     | Descripción                   |
|------------|------------------------|------------------------------------------|-------------------------------|
| id         | [primary key]          | UUID                                     | Identificador único           |
| tenantId   | [ref: > users.id]      | UUID                                     | Identificador del inquilino   |
| propertyId | [ref: > properties.id] | UUID                                     | Identificador de la propiedad |
| startDate  |                        | TIMESTAMP                                | Fecha de inicio               |
| endDate    |                        | TIMESTAMP                                | Fecha de finalización         |
| status     |                        | ENUM('pending', 'rented', 'returned')    | Estado del alquiler           |
| createdAt  |                        | TIMESTAMP [default: `CURRENT_TIMESTAMP`] | Fecha de creación             |
| updatedAt  |                        | TIMESTAMP [default: `CURRENT_TIMESTAMP`] | Fecha de actualización        |

## Tabla `reviews`
| Campo      | Referencia             | Tipo                                     | Descripción                   |
|------------|------------------------|------------------------------------------|-------------------------------|
| id         | [primary key]          | UUID                                     | Identificador único           |
| userId     | [ref: > users.id]      | UUID                                     | Identificador del usuario     |
| propertyId | [ref: > properties.id] | UUID                                     | Identificador de la propiedad |
| rating     | [note: '1 -> 5']       | INT                                      | Valoración del usuario        |
| comment    |                        | TEXT                                     | Comentario del usuario        |
| createdAt  |                        | TIMESTAMP [default: `CURRENT_TIMESTAMP`] | Fecha de creación             |
| updatedAt  |                        | TIMESTAMP [default: `CURRENT_TIMESTAMP`] | Fecha de actualización        |

## Tabla `messages`
| Campo      | Referencia        | Tipo                                     | Descripción                        |
|------------|-------------------|------------------------------------------|------------------------------------|
| id         | [primary key]     | UUID                                     | Identificador único                |
| senderId   | [ref: > users.id] | UUID                                     | Identificador del remitente        |
| receiverId | [ref: > users.id] | UUID                                     | Identificador del destinatario     |
| content    |                   | TEXT                                     | Contenido del mensaje              |
| isRead     |                   | BOOLEAN [default: false]                 | Indica si el mensaje ha sido leído |
| createdAt  |                   | TIMESTAMP [default: `CURRENT_TIMESTAMP`] | Fecha de creación                  |
| updatedAt  |                   | TIMESTAMP [default: `CURRENT_TIMESTAMP`] | Fecha de actualización             |

## Tabla `images`
| Campo      | Referencia             | Tipo                                     | Descripción                   |
|------------|------------------------|------------------------------------------|-------------------------------|
| id         | [primary key]          | UUID                                     | Identificador único           |
| propertyId | [ref: > properties.id] | UUID                                     | Identificador de la propiedad |
| imageUrl   |                        | VARCHAR(255)                             | URL de la imagen              |
| createdAt  |                        | TIMESTAMP [default: `CURRENT_TIMESTAMP`] | Fecha de creación             |
| updatedAt  |                        | TIMESTAMP [default: `CURRENT_TIMESTAMP`] | Fecha de actualización        |