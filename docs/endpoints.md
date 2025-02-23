# Endpoints de la API - CasaLink

## Endpoints de Usuarios

| Id  | Método | Ruta                       | Descripción                   |
| --- | ------ | -------------------------- | ----------------------------- |
| 01  | POST   | /api/users/register        | Registro de usuarios          |
| 02  | POST   | /api/users/validate        | Validación de usuario (email) |
| 03  | POST   | /api/users/login           | Autenticación JWT             |
| 04  | PATCH  | /api/users/password        | Cambio de contraseña          |
| 05  | GET    | /api/users/profile         | Perfil del usuario            |
| 05b | GET    | /api/users/:id             | Informacion de un usuario     |
| 06  | PUT    | /api/users/:id             | Modificar usuario [EXTRA]     |
| 07  | PUT    | /api/users/change-password | Modificar contraseña          |
| 08  | GET    | /api/users/:id/reviews     | Histórico de reseñas          |
| 09  | POST   | /api/users/reviews         | Enviar valoración             |

## Endpoints de Propiedades

| Id  | Método | Ruta                       | Descripción                             |
| --- | ------ | -------------------------- | --------------------------------------- |
| 10  | GET    | /api/properties            | Listado de propiedades                  |
| 11  | POST   | /api/properties            | Creación de nueva propiedad             |
| 12  | GET    | /api/properties/:id        | Detalle de una propiedad                |
| 13  | PATCH  | /api/properties/:id        | Disponibilidad de una propiedad (dueño) |
| 14  | PUT    | /api/properties/:id        | Modificar una propiedad (dueño) [EXTRA] |
| 15  | POST   | /api/properties/:id/upload | Cargar multimedia a una propiedad       |

## Endpoints de Contratos de Alquiler / Visitas

| Id  | Método | Ruta                       | Descripción                            |
| --- | ------ | -------------------------- | -------------------------------------- |
| 16  | GET    | /api/contracts             | Lista de solicitudes de alquiler       |
| 17  | POST   | /api/contracts             | Solicitud de visita (crea un contrato) |
| 18  | PATCH  | /api/contracts/:id         | Aceptar/Rechazar solicitud (owner)     |
| 19  | POST   | /api/contracts/:id/blocks/ | Bloquear usuario de propiedad [EXTRA]  |

## Endpoints de Admin

| Id  | Método | Ruta                       | Descripción                             |
| --- | ------ | -------------------------- | --------------------------------------- |
| 20  | GET    | /api/admin/users           | Lista de usuarios (admin)               |
| 21  | PUT    | /api/admin/users/:id       | Gestionar usuarios (superadmin) [EXTRA] |
| 22  | PATCH  | /api/admin/properties/:id/ | Aprobar propiedad (admin)               |
| 23  | PUT    | /api/admin/properties/:id  | Modificar una propiedad (admin) [EXTRA] |
| 24  | PATCH  | /api/admin/review/:id/     | Gestionar reseñas (admin)               |
