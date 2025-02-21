# 🚀 CasaLink - Backend

![API Diagram](./docs/media/api-diagram.jpg)

**Servidor API REST** para CasaLink desarrollado con Node.js y Express.js. Gestiona la lógica de negocio y la conexión con la base de datos MySQL.

## 🔧 Tecnologías Clave

- **Runtime**: Node.js
- **Framework**: Express.js
- **Base de Datos**: MySQL
- **Autenticación**: JWT + Bcrypt

## 🗄️ Endpoints de la API

### Endpoints de Usuarios

| Método | Ruta                   | Descripción                          |
| ------ | ---------------------- | ------------------------------------ |
| POST   | /api/users/register    | Registro de usuarios                 |
| POST   | /api/users/validate    | Validación de usuario (email)        |
| POST   | /api/users/login       | Autenticación JWT                    |
| PATCH  | /api/users/password    | Cambio de contraseña                 |
| GET    | /api/users/:id         | Información de usuario               |
| PUT    | /api/users/:id         | Modificar usuario [EXTRA]            |
| GET    | /api/users/:id/reviews | Histórico de reseñas                 |
| POST   | /api/users/reviews     | Enviar valoración                    |
| POST   | /api/users/blocks/:id  | Bloquear propiedad [EXTRA]           |
| GET    | /api/users/blocks/     | Lista de usuarios bloqueados [EXTRA] |

### Endpoints de Propiedades

| Método | Ruta                | Descripción                                      |
| ------ | ------------------- | ------------------------------------------------ |
| GET    | /api/properties     | Listado de propiedades                           |
| POST   | /api/properties     | Creación de nueva propiedad                      |
| GET    | /api/properties/:id | Detalle de un alquiler                           |
| PATCH  | /api/properties/:id | Estado de propiedad (disponible / no disponible) |
| PUT    | /api/properties/:id | Modificar una propiedad (dueño o admin) [EXTRA]  |

### Endpoints de Contratos de Alquiler / Visitas

| Método | Ruta               | Descripción                            |
| ------ | ------------------ | -------------------------------------- |
| POST   | /api/contracts     | Solicitud de visita (crea un contrato) |
| GET    | /api/contracts     | Lista de solicitudes de alquiler       |
| PATCH  | /api/contracts/:id | Aceptar/Rechazar solicitud (owner)     |

### Endpoints de Admin

| Método | Ruta                       | Descripción                             |
| ------ | -------------------------- | --------------------------------------- |
| GET    | /api/admin/users           | Lista de usuarios (admin)               |
| PUT    | /api/admin/users/:id       | Gestionar usuarios (superadmin) [EXTRA] |
| PATCH  | /api/admin/properties/:id/ | Aprobar propiedad (admin)               |

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
