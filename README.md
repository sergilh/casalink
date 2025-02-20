<header style="text-align: center; background-color: #111; color: #eee; padding: 2rem;">

![](https://cdn.prod.website-files.com/5f3108520188e7588ef687b1/620e82ff8680cd26532fff29_Logotipo%20HACK%20A%20BOSS_white%20100%20px.svg)

</header>

# 🏠 CasaLink

![Logo CasaLink](./docs/media/casalink_notion_cover.jpg)

**CasaLink** es una plataforma web de busqueda de **Alquiler Seguro** desarrollada como proyecto final del bootcamp de Hack A Boss 2025, diseñada para facilitar la búsqueda y gestión de alquileres. La aplicación conecta a inquilinos y propietarios, proporcionando un sistema de valoraciones basado en experiencias anteriores para garantizar transparencia y confianza en el proceso de alquiler.

## 🎯 Objetivos del Proyecto

-   Crear e implementar una **base de datos MySQL**.
-   Construir una **API** con Express.js y conectar la API a la base de datos.
-   Creación de un **Front End** moderno que se adapte a cualquier dispositivo que incluye conceptos claves de usabilidad.
-   Respetar buenas prácticas de desarrollo y utilizar un sistema de control de versiones.
-   Calidad durante el desarrollo y ejecutar un plan de pruebas.

## 🚀 Tecnologías Utilizadas

**CasaLink** está desarrollado con las siguientes tecnologías:

-   **Frontend**: React.js
-   **Backend**: Node.js, Express.js
-   **Base de Datos**: MySQL
-   **Autenticación**: JWT (JSON Web Tokens)
-   **Estilos**: CSS3
-   **Otras Herramientas**: Git, GitHub, Postman

## 📌 Funcionalidades Clave

### ✅ Registro y Autenticación

-   Registro de usuarios (inquilinos y propietarios)
-   Inicio de sesión con JWT
-   Verificación de identidad mediante documentación

### 🏠 Gestión de Propiedades

-   Publicación de anuncios de alquiler
-   Modificación y eliminación de propiedades
-   Gestión del estado de las propiedades (disponible, alquilado, pendiente)

### 📜 Contratos y Seguridad

-   Creación y almacenamiento de contratos de alquiler
-   Descarga de contratos en formato PDF
-   Historial de contratos anteriores

### ⭐ Reseñas y Valoraciones

-   Evaluaciones de inquilinos y propietarios
-   Sistema de calificación basado en experiencias reales

### 🔔 Notificaciones

-   Alertas sobre solicitudes de visita
-   Confirmaciones y rechazos de alquiler
-   Recordatorios de contratos

## 📂 Estructura del Proyecto

```
CasaLink/
├── client/        # Código del cliente (React.js)
├── database/      # Scripts de la base de datos
├── docs/          # Documentación
├── server/        # Código del servidor (Node.js, Express)
├── LICENSE        # Licencia
├── README.md      # Este archivo
```

## 🛠 Instalación y Configuración

### 1️⃣ Clonar el repositorio

```sh
git clone https://github.com/johnatanmoran/CasaLink.git
cd CasaLink
```

### 2️⃣ Configurar el backend

```sh
cd server
cp .env.example .env  # Configurar variables de entorno
npm install
npm run dbinit
npm run dev
```

### 3️⃣ Configurar el frontend

```sh
cd client
npm install
npm start
```

## 👾Equipo de Desarrollo (Grupo B - JSB41RT)

| Nombre   | GitHub                                             |
| -------- | -------------------------------------------------- |
| David    | [@Dav993](https://github.com/Dav993)               |
| Javi     | [@JaviScavuzzo](https://github.com/JaviScavuzzo)   |
| Johnatan | [@johnatanmoran](https://github.com/johnatanmoran) |
| Russel   | [@Ken-Russel](https://github.com/Ken-Russel)       |
| Sergi    | [@sergilh](https://github.com/sergilh)             |

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Puedes ver más detalles en el archivo LICENSE.

_"Donde inquilinos y propietarios se encuentran."_
