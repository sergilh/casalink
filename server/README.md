# 🚀 CasaLink - Backend

![API Diagram](./docs/media/api-diagram.jpg)

**Servidor API REST** para CasaLink desarrollado con Node.js y Express.js. Gestiona la lógica de negocio y la conexión con la base de datos MySQL.

## 🔧 Tecnologías Clave

- **Runtime**: Node.js
- **Framework**: Express.js
- **Base de Datos**: MySQL
- **Autenticación**: JWT + Bcrypt

## 🗄️ Endpoints de la API

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
