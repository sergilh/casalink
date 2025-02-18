# 🚀 CasaLink - Backend

![API Diagram](./docs/media/api-diagram.jpg)

**Servidor API REST** para CasaLink desarrollado con Node.js y Express.js. Gestiona la lógica de negocio y la conexión con la base de datos MySQL.

## 🔧 Tecnologías Clave

- **Runtime**: Node.js
- **Framework**: Express.js
- **Base de Datos**: MySQL + Sequelize ORM
- **Autenticación**: JWT + Bcrypt
- **Validación**: Express Validator
    <!-- - **Documentación**: 	Swagger UI -->

## 🗄️ # Endpoints de la API

### Endpoints de Usuarios

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

### Endpoints de Propiedades

| Método | Ruta                | Descripción                                      |
| ------ | ------------------- | ------------------------------------------------ |
| GET    | /api/properties     | Listado de propiedades                           |
| POST   | /api/properties     | Creación de nueva propiedad                      |
| GET    | /api/properties/:id | Detalle de un alquiler                           |
| PATCH  | /api/properties/:id | Estado de propiedad (disponible / no disponible) |
| PUT    | /api/properties/:id | Modificar una propiedad (dueño o admin) [EXTRA]  |

### Endpoints de Contratos de Alquiler / Visitas

| Método | Ruta               | Descripción                           |
| ------ | ------------------ | ------------------------------------- |
| POST   | /api/contracts     | Solicitud de visita (contrato valido) |
| GET    | /api/contracts     | Lista de solicitudes de alquiler      |
| PATCH  | /api/contracts/:id | Aceptar/Rechazar solicitud (dueño)    |

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
npm run dev      # Modo desarrollo
npm run seed     # Semillas de datos
```

## ⚙️ Variables de Entorno

Crear archivo `.env`:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=casalink
JWT_SECRET=your_jwt_secret
PORT=5000
```

MYSQL_HOST
MYSQL_USER
MYSQL_PASS
MYSQL_DB
SUPERADMIN_EMAIL
SUPERADMIN_PASSWORD
SUPERADMIN_NAME
SUPERADMIN_LASTNAME
SUPERADMIN_PHONE
ADMIN1_EMAIL
ADMIN1_PASSWORD
ADMIN1_NAME
ADMIN1_LASTNAME
ADMIN1_PHONE
ADMIN2_EMAIL
ADMIN2_PASSWORD
ADMIN2_NAME
ADMIN2_LASTNAME
ADMIN2_PHONE
ADMIN3_EMAIL
ADMIN3_PASSWORD
ADMIN3_NAME
ADMIN3_LASTNAME
ADMIN3_PHONE

## Generar clave segura para JWT-SECRET

Necesario generar clave segura para cualquier funcionalidad que dependa de autenticación con token.
Copiar clave y pegar en .env

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Configurar credenciales SMTP

Configurar con un servicio SMTP con Gmail o Mailtrap(recomendado para pruebas)
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=

```bash
npm install nodemailer
```

## 📊 Modelo de Datos

![Database Schema](./docs/media/db-schema.png)

## 📄 Documentación API

Acceder a la documentación completa en desarrollo:

```bash
http://localhost:5000/api-docs
```

## 🧪 Pruebas

````bash
npm test  # Pruebas unitarias
npm run test:e2e  # Pruebas de integración
```bash
````
