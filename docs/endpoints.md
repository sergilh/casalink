# Endpoints de la API - CasaLink

## Endpoints de Usuarios

| Id  | Método | Ruta                       | Descripción                   |
| --- | ------ | -------------------------- | ----------------------------- |
| 01  | POST   | /api/users/register        | Registro de usuarios          |
| 02  | POST   | /api/users/validate        | Validación de usuario (email) |
| 03  | POST   | /api/users/login           | Autenticación JWT             |
| 04  | PATCH  | /api/users/password        | Cambio de contraseña          |
| 05  | GET    | /api/users/profile         | Perfil del usuario            |
| 06  | GET    | /api/users/:id             | Informacion de un usuario     |
| 07  | PUT    | /api/users/:id             | Modificar usuario [EXTRA]     |
| 08  | PUT    | /api/users/change-password | Modificar contraseña          |
| 09  | GET    | /api/users/:id/reviews     | Histórico de reseñas          |
| 10  | POST   | /api/users/reviews         | Enviar valoración             |

## Endpoints de Propiedades

| Id  | Método | Ruta                       | Descripción                             |
| --- | ------ | -------------------------- | --------------------------------------- |
| 11  | GET    | /api/properties            | Listado de propiedades                  |
| 12  | POST   | /api/properties            | Creación de nueva propiedad             |
| 13  | GET    | /api/properties/:id        | Detalle de una propiedad                |
| 14  | PATCH  | /api/properties/:id        | Disponibilidad de una propiedad (dueño) |
| 15  | PUT    | /api/properties/           | Modificar una propiedad (dueño) [EXTRA] |
| 16  | POST   | /api/properties/:id/upload | Cargar multimedia a una propiedad       |

## Endpoints de Contratos de Alquiler / Visitas

| Id  | Método | Ruta                       | Descripción                            |
| --- | ------ | -------------------------- | -------------------------------------- |
| 17  | GET    | /api/contracts             | Lista de solicitudes de alquiler       |
| 18  | POST   | /api/contracts             | Solicitud de visita (crea un contrato) |
| 19  | PATCH  | /api/contracts/:id         | Aceptar/Rechazar solicitud (owner)     |
| 20  | POST   | /api/contracts/:id/blocks/ | Bloquear usuario de propiedad [EXTRA]  |

## Endpoints de Admin

| Id  | Método | Ruta                       | Descripción                             |
| --- | ------ | -------------------------- | --------------------------------------- |
| 21  | GET    | /api/admin/users           | Lista de usuarios (admin)               |
| 22  | PUT    | /api/admin/users/:id       | Gestionar usuarios (superadmin) [EXTRA] |
| 23  | PATCH  | /api/admin/properties/:id/ | Aprobar propiedad (admin)               |
| 24  | PUT    | /api/admin/properties/:id  | Modificar una propiedad (admin) [EXTRA] |
| 25  | PATCH  | /api/admin/review/:id/     | Gestionar reseñas (admin)               |
