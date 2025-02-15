# Endpoints de la API - CasaLink

## Endpoints de Usuarios

| Método | Ruta                   | Descripción                   |
| ------ | ---------------------- | ----------------------------- |
| POST   | /api/users/register    | Registro de usuarios          |
| POST   | /api/users/validate    | Validación de usuario (email) |
| POST   | /api/users/login       | Autenticación JWT             |
| PATCH  | /api/users/password    | Cambio de contraseña          |
| GET    | /api/users/:id         | Información de usuario        |
| PUT    | /api/users/:id         | Modificar usuario [EXTRA]     |
| GET    | /api/users/:id/reviews | Histórico de reseñas          |
| POST   | /api/users/reviews     | Enviar valoración             |

## Endpoints de Propiedades

| Método | Ruta                | Descripción                                      |
| ------ | ------------------- | ------------------------------------------------ |
| GET    | /api/properties     | Listado de propiedades                           |
| POST   | /api/properties     | Creación de nueva propiedad                      |
| GET    | /api/properties/:id | Detalle de un alquiler                           |
| PATCH  | /api/properties/:id | Estado de propiedad (disponible / no disponible) |
| PUT    | /api/properties/:id | Modificar una propiedad (dueño o admin) [EXTRA]  |

## Endpoints de Contratos de Alquiler / Visitas

| Método | Ruta               | Descripción                           |
| ------ | ------------------ | ------------------------------------- |
| POST   | /api/contracts     | Solicitud de visita (contrato valido) |
| GET    | /api/contracts     | Lista de solicitudes de alquiler      |
| PATCH  | /api/contracts/:id | Aceptar/Rechazar solicitud (dueño)    |

## Endpoints de Admin

| Método | Ruta                       | Descripción                             |
| ------ | -------------------------- | --------------------------------------- |
| GET    | /api/admin/users           | Lista de usuarios (admin)               |
| PUT    | /api/admin/users/:id       | Gestionar usuarios (superadmin) [EXTRA] |
| PATCH  | /api/admin/properties/:id/ | Aprobar propiedad (admin)               |
