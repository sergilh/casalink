# 🚀 CasaLink - Backend

![API Diagram](./docs/media/api-diagram.jpg)

**Servidor API REST** para CasaLink desarrollado con Node.js y Express.js. Gestiona la lógica de negocio y la conexión con la base de datos MySQL.

## 🔧 Tecnologías Clave

- **Runtime**: Node.js
- **Framework**: Express.js
- **Base de Datos**: MySQL
- **Autenticación**: JWT + Bcrypt

## 🗄️ Endpoints de la API

Para más información sobre el uso de la API, consulta el [manual de endpoints (rutas)](../docs/endpoints.md).

| Id   | Método | Ruta                       | Descripción                    |
| ---- | ------ | -------------------------- | ------------------------------ |
| 1.01 | POST   | /api/users/register        | Registro de usuarios           |
| 1.02 | PATCH  | /api/users/validate        | Validación de usuario (email)  |
| 1.03 | POST   | /api/users/login           | Autenticación JWT              |
| 1.04 | GET    | /api/users/password        | Solicitar cambio de contraseña |
| 1.05 | GET    | /api/users/profile         | Perfil del usuario             |
| 1.06 | GET    | /api/users/:userId         | Información de un usuario      |
| 1.07 | PUT    | /api/users/                | Modificar usuario [EXTRA]      |
| 1.08 | PUT    | /api/users/change-password | Modificar contraseña           |
| 1.09 | GET    | /api/users/:userId/reviews | Histórico de reseñas           |
| 1.10 | POST   | /api/users/reviews         | Enviar valoración              |
| 1.11 | PATCH  | /api/users/avatar          | Avatar del usuario             |

## Endpoints de Propiedades

| Id   | Método | Ruta                               | Descripción                             |
| ---- | ------ | ---------------------------------- | --------------------------------------- |
| 2.12 | GET    | /api/properties                    | Listado de propiedades                  |
| 2.13 | POST   | /api/properties                    | Creación de nueva propiedad             |
| 2.14 | GET    | /api/properties/:propertyId        | Detalle de una propiedad                |
| 2.15 | PATCH  | /api/properties/:propertyId        | Disponibilidad de una propiedad (dueño) |
| 2.16 | PUT    | /api/properties/:propertyId        | Modificar una propiedad (dueño) [EXTRA] |
| 2.17 | POST   | /api/properties/:propertyId/upload | Cargar multimedia a una propiedad       |

## Endpoints de Contratos de Alquiler / Visitas

| Id   | Método | Ruta                               | Descripción                            |
| ---- | ------ | ---------------------------------- | -------------------------------------- |
| 3.18 | GET    | /api/contracts                     | Lista de solicitudes de alquiler       |
| 3.19 | POST   | /api/contracts/:propertyId         | Solicitud de visita (crea un contrato) |
| 3.20 | PATCH  | /api/contracts/:contractId/:status | Aceptar/Rechazar solicitud (owner)     |
| 3.21 | POST   | /api/contracts/:contractId/blocks/ | Bloquear usuario de propiedad [EXTRA]  |

## Endpoints de Admin

| Id   | Método | Ruta                                      | Descripción                             |
| ---- | ------ | ----------------------------------------- | --------------------------------------- |
| 4.22 | GET    | /api/admin/users                          | Lista de usuarios (admin)               |
| 4.23 | PATCH  | /api/admin/users/:userId/:newRole         | Gestionar usuarios (superadmin) [EXTRA] |
| 4.24 | PATCH  | /api/admin/properties/:propertyId/:action | Aprobar/Rechazar propiedad (admin)      |
| 4.25 | PUT    | /api/admin/properties/:propertyId         | Modificar una propiedad (admin) [EXTRA] |
| 4.26 | PATCH  | /api/admin/review/:reviewId               | Gestionar reseñas (admin)               |

---

## 🛠 Instalación

```bash
cd server
npm install
npm run initdb   # Inicializar base de datos
npm run seed     # Semillas de datos
npm run dev      # Modo desarrollo
```

## ⚙️ Variables de Entorno

Crear archivo `.env`:

```env
# Database
MYSQL_HOST=
MYSQL_USER=
MYSQL_PASS=
MYSQL_DB=casalinkdb

# Express
PORT=3000
SECRET=UnSecretDePruebaParaApp

#Nodemailer
CLIENT_URL=
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=

# JWT
JWT_SECRET=UnSecretDePruebaParaJWT

# Superadmin Data
SUPERADMIN_NAME=
SUPERADMIN_LASTNAME=
SUPERADMIN_LEGAL_ID=
SUPERADMIN_EMAIL=
SUPERADMIN_PASSWORD=
SUPERADMIN_PHONE=
SUPERADMIN_BIO=

# Admin Data
ADMIN_NAME=Admin
ADMIN_LASTNAME=Istrator
ADMIN_LEGAL_ID=28265618K
ADMIN_EMAIL=admin@casalink.app
ADMIN_PASSWORD=adminPassword123,
ADMIN_PHONE=+34123456789
ADMIN_BIO='Soy un administrador de CasaLink.'

# Default User Data
USER_NAME=John
USER_LASTNAME=Doe
USER_LEGAL_ID=56152591T
USER_EMAIL=johndoe@example.com
USER_PASSWORD=123456789A
USER_PHONE=+34456789123
USER_BIO='Soy un usuario de prueba para CasaLink.'
```

### Generar clave segura para JWT-SECRET

Necesario generar clave segura para cualquier funcionalidad que dependa de autenticación con token.
Copiar clave y pegar en .env

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Configurar credenciales SMTP

```plaintext
Configurar con un servicio SMTP
con Gmail o Mailtrap(recomendado para pruebas)

SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
```

## 📊 Modelo de Datos

[![Base de Datos](/docs/media/casalinkdb.svg)](/docs/database.md)

<!--
## 📄 Documentación API

Acceder a la documentación completa en desarrollo:

```bash
http://localhost:5000/api-docs
```
## 🧪 Pruebas

````bash
npm test  # Pruebas unitarias
npm run test:e2e  # Pruebas de integración
````
-->
