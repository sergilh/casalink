# 🚀 CasaLink - Backend

![API Diagram](./docs/media/api-diagram.jpg)

**Servidor API REST** para CasaLink desarrollado con Node.js y Express.js. Gestiona la lógica de negocio y la conexión con la base de datos MySQL.

## 🔧 Tecnologías Clave
- **Runtime**:	 		Node.js
- **Framework**: 		Express.js
- **Base de Datos**: 	MySQL + Sequelize ORM
- **Autenticación**: 	JWT + Bcrypt
- **Validación**: 		Express Validator
<!-- - **Documentación**: 	Swagger UI -->

## 🗄️ Endpoints Principales
| Método | Ruta               | Descripción                    |
|--------|--------------------|--------------------------------|
| POST   | /api/auth/register | Registro de usuarios           |
| POST   | /api/auth/login    | Autenticación JWT              |
| GET    | /api/properties    | Búsqueda de propiedades        |
| POST   | /api/properties    | Creación de nuevas propiedades |
| PUT    | /api/contracts/:id | Gestión de contratos           |



## 🛠 Instalación
```bash
cd server
npm install
npm run db:init  # Inicializar base de datos
npm run dev      # Modo desarrollo
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

## 📊 Modelo de Datos
![Database Schema](./docs/media/db-schema.png)

## 📄 Documentación API
Acceder a la documentación completa en desarrollo:
```bash
http://localhost:5000/api-docs
```

## 🧪 Pruebas
```bash
npm test  # Pruebas unitarias
npm run test:e2e  # Pruebas de integración
```