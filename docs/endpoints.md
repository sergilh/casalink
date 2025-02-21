# Endpoints de la API - CasaLink

## Endpoints de Usuarios

| Id  | Método | Ruta                   | Descripción                   |
| --- | ------ | ---------------------- | ----------------------------- |
| 01  | POST   | /api/users/register    | Registro de usuarios          |
| 02  | POST   | /api/users/validate    | Validación de usuario (email) |
| 03  | POST   | /api/users/login       | Autenticación JWT             |
| 04  | PATCH  | /api/users/password    | Cambio de contraseña          |
| 05  | GET    | /api/users/:id         | Información de usuario        |
| 06  | PUT    | /api/users/:id         | Modificar usuario [EXTRA]     |
| 07  | GET    | /api/users/:id/reviews | Histórico de reseñas          |
| 08  | POST   | /api/users/reviews     | Enviar valoración             |

## Endpoints de Propiedades

| Id  | Método | Ruta                       | Descripción                             |
| --- | ------ | -------------------------- | --------------------------------------- |
| 09  | GET    | /api/properties            | Listado de propiedades                  |
| 10  | POST   | /api/properties            | Creación de nueva propiedad             |
| 11  | GET    | /api/properties/:id        | Detalle de una propiedad                |
| 12  | PATCH  | /api/properties/:id        | Disponibilidad de una propiedad (dueño) |
| 13  | PUT    | /api/properties/:id        | Modificar una propiedad (dueño) [EXTRA] |
| 14  | POST   | /api/properties/:id/upload | Cargar multimedia a una propiedad       |

## Endpoints de Contratos de Alquiler / Visitas

| Id  | Método | Ruta                       | Descripción                            |
| --- | ------ | -------------------------- | -------------------------------------- |
| 15  | GET    | /api/contracts             | Lista de solicitudes de alquiler       |
| 16  | POST   | /api/contracts             | Solicitud de visita (crea un contrato) |
| 17  | PATCH  | /api/contracts/:id         | Aceptar/Rechazar solicitud (owner)     |
| 18  | POST   | /api/contracts/:id/blocks/ | Bloquear usuario de propiedad [EXTRA]  |

## Endpoints de Admin

| Id  | Método | Ruta                       | Descripción                             |
| --- | ------ | -------------------------- | --------------------------------------- |
| 19  | GET    | /api/admin/users           | Lista de usuarios (admin)               |
| 20  | PUT    | /api/admin/users/:id       | Gestionar usuarios (superadmin) [EXTRA] |
| 21  | PATCH  | /api/admin/properties/:id/ | Aprobar propiedad (admin)               |
| 22  | PUT    | /api/admin/properties/:id  | Modificar una propiedad (admin) [EXTRA] |
| 23  | PATCH  | /api/admin/review/:id/     | Gestionar reseñas (admin)               |
