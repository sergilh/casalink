# Endpoints de la API - CasaLink

## Endpoints de Usuarios

| Id  | Método | Ruta                       | Descripción                   |
| --- | ------ | -------------------------- | ----------------------------- |
| 01  | POST   | /api/users/register        | Registro de usuarios          |
| 02  | POST   | /api/users/validate        | Validación de usuario (email) |
| 03  | POST   | /api/users/login           | Autenticación JWT             |
| 04  | PATCH  | /api/users/password        | Cambio de contraseña          |
| 05  | GET    | /api/users/profile         | Perfil del usuario            |
| 06  | GET    | /api/users/:id             | Información de un usuario     |
| 07  | PUT    | /api/users/:id             | Modificar usuario [EXTRA]     |
| 08  | PUT    | /api/users/change-password | Modificar contraseña          |
| 09  | GET    | /api/users/:id/reviews     | Histórico de reseñas          |
| 10  | POST   | /api/users/reviews         | Enviar valoración             |
| 11  | PATCH  | /api/users/avatar          | Avatar del usuario            |

## Endpoints de Propiedades

| Id  | Método | Ruta                       | Descripción                             |
| --- | ------ | -------------------------- | --------------------------------------- |
| 12  | GET    | /api/properties            | Listado de propiedades                  |
| 13  | POST   | /api/properties            | Creación de nueva propiedad             |
| 14  | GET    | /api/properties/:id        | Detalle de una propiedad                |
| 15  | PATCH  | /api/properties/:id        | Disponibilidad de una propiedad (dueño) |
| 16  | PUT    | /api/properties/           | Modificar una propiedad (dueño) [EXTRA] |
| 17  | POST   | /api/properties/:id/upload | Cargar multimedia a una propiedad       |

## Endpoints de Contratos de Alquiler / Visitas

| Id  | Método | Ruta                       | Descripción                            |
| --- | ------ | -------------------------- | -------------------------------------- |
| 18  | GET    | /api/contracts             | Lista de solicitudes de alquiler       |
| 19  | POST   | /api/contracts             | Solicitud de visita (crea un contrato) |
| 20  | PATCH  | /api/contracts/:id         | Aceptar/Rechazar solicitud (owner)     |
| 21  | POST   | /api/contracts/:id/blocks/ | Bloquear usuario de propiedad [EXTRA]  |

## Endpoints de Admin

| Id  | Método | Ruta                       | Descripción                             |
| --- | ------ | -------------------------- | --------------------------------------- |
| 22  | GET    | /api/admin/users           | Lista de usuarios (admin)               |
| 23  | PUT    | /api/admin/users/:id       | Gestionar usuarios (superadmin) [EXTRA] |
| 24  | PATCH  | /api/admin/properties/:id/ | Aprobar propiedad (admin)               |
| 25  | PUT    | /api/admin/properties/:id  | Modificar una propiedad (admin) [EXTRA] |
| 26  | PATCH  | /api/admin/review/:id/     | Gestionar reseñas (admin)               |
