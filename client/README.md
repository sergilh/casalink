<header style="text-align: center; background-color: #111; color: #eee; padding: 2rem;">

![](https://cdn.prod.website-files.com/5f3108520188e7588ef687b1/620e82ff8680cd26532fff29_Logotipo%20HACK%20A%20BOSS_white%20100%20px.svg)

</header>

# 🏠 CasaLink - Frontend

![CasaLink Interface](./docs/media/frontend-preview.jpg)

**Interfaz de usuario** de la plataforma CasaLink desarrollada con React.js. Proporciona una experiencia moderna y responsive para la gestión de alquileres seguros.

## 🌟 Características Principales
- **Búsqueda Inteligente**: Filtrado avanzado por ubicación, precio y características
- **Gestión de Perfil**: Edición de datos de usuario y verificación de identidad
- **Sistema de Valoraciones**: Interfaz interactiva para dejar reseñas
- **Notificaciones en Tiempo Real**: Alertas de solicitudes y actualizaciones
- **Gestión de Favoritos**: Listado personalizado de propiedades guardadas

## 🛠 Tecnologías Utilizadas
- **Framework**: React.js
- **Gestión de Estado**: Context API
- **Estilos**: CSS3 + Flexbox/Grid
- **Enrutamiento**: React Router DOM
- **Iconos**: React Icons
- **Mapas**: React-Leaflet

## 🚀 Instalación
```bash
cd client
npm install
npm start
```

## ⚙️ Variables de Entorno
Crear archivo `.env`:
```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_MAPBOX_TOKEN=your_mapbox_token
```

## 📂 Estructura de Carpetas
```
client/
├── public/
├── src/
│   ├── components/   # Componentes reutilizables
│   ├── contexts/     # Gestión de estado global
│   ├── pages/        # Vistas principales
│   ├── services/     # Conexión con la API
│   ├── styles/       # Hojas de estilo
│   └── utils/        # Funciones auxiliares
```

## 🧪 Pruebas
```bash
npm test
```