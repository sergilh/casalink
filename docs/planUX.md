# Plan UX para CasaLink

## 1. User Personas y User Stories
### Personas:
- **Inquilino**:
  - Busca propiedades filtradas por ubicación, precio y reseñas de propietarios.
  - Necesita verificar la reputación del propietario antes de contactar.
- **Propietario**:
  - Quiere publicar propiedades con detalles claros y gestionar solicitudes.
  - Requiere un sistema de valoración de inquilinos para reducir riesgos.

### User Stories:
- **Como inquilino, quiero**:
  - Buscar propiedades con filtros avanzados (precio, ubicación, tamaño).
  - Ver reseñas y calificaciones de propietarios.
  - Guardar propiedades en una lista de favoritos.
  - Contactar al propietario de forma segura desde la plataforma.
- **Como propietario, quiero**:
  - Publicar propiedades con fotos, descripción y requisitos.
  - Gestionar solicitudes de inquilinos (aceptar/rechazar).
  - Ver el historial de alquileres y valoraciones de los inquilinos.
  - Recibir notificaciones de mensajes y actualizaciones.

---

## 2. Wireframes y Flujos de Navegación
### Wireframes básicos (páginas clave):
1. **Homepage**:
   - Barra de búsqueda destacada.
   - Propiedades destacadas con imágenes y precios.
   - Sección de "Cómo funciona" con pasos simples.
   - Llamado a la acción (CTA): "Regístrate" / "Publicar propiedad".

2. **Página de Búsqueda/Resultados**:
   - Filtros laterales (precio, ubicación, tamaño, tipo de propiedad).
   - Lista de propiedades con miniaturas, precios y valoraciones.
   - Mapa interactivo integrado (opcional).

3. **Detalle de Propiedad**:
   - Carrusel de imágenes.
   - Descripción detallada, características y requisitos.
   - Perfil del propietario con valoraciones.
   - Botón de "Contactar" o "Solicitar visita".

4. **Perfil de Usuario**:
   - Información personal (nombre, foto, verificación).
   - Historial de alquileres y reseñas recibidas.
   - Sección de mensajes.

5. **Dashboard (Propietario)**:
   - Propiedades publicadas con estado (disponible/alquilada).
   - Solicitudes de inquilinos pendientes.
   - Estadísticas simples (visitas, contactos).

6. **Autenticación**:
   - Formularios de login/registro con opción de redes sociales.
   - Recordatorio de verificación de correo electrónico.

---

## 3. Componentes UI/UX Clave
### Componentes Re-Utilizables:
- **Navbar**:
  - Logo + enlaces a "Inicio", "Buscar", "Publicar" (si es propietario).
  - Iconos de perfil y notificaciones.

- **Card de Propiedad**:
  - Imagen, precio, ubicación, botón de favoritos.
  - Badge de "Verificado" si el propietario está autenticado.

- **Sistema de Valoraciones**:
  - Estrellas (1-5) + comentarios.
  - Filtro para ordenar propiedades por mejor valoradas.

- **Formularios**:
  - Validación en tiempo real (ej: correo válido, contraseña segura).
  - Mensajes de error claros y asistencia visual.

### **Estados de UI**:
- **Loading States**: Spinners o skeletons para cargas asíncronas.
- **Empty States**: Mensajes amigables cuando no hay resultados/propiedades.
- **Error States**: Diseños que guíen al usuario a solucionar problemas.

---

## 4. Requisitos Técnicos del Frontend
### Tecnologías Sugeridas:
- **Framework**: React.js (con Vite).
- **Estilos**: CSS Modules + Bootstrap para responsividad.
- **Gestión de Estado**: Context API.
- **Enrutamiento**: React Router DOM.
- **Formularios**: React Hook Form + Yup para validación.
- **Mapas**: React-Leaflet o Google Maps API.
- **Iconos**: React Icons.

### Integración con Backend:
- **Endpoints API**:
  - `GET /api/properties` (listar propiedades con filtros).
  - `POST /api/properties` (publicar propiedad).
  - `GET /api/users/:id/reviews` (obtener reseñas de usuarios).
  - `POST /api/messages` (enviar mensajes).
- **Autenticación**: JWT almacenado en cookies seguras.

---

## 5. Diseño Responsivo
- **Mobile-First**: Priorizar experiencia en móviles (60-70% del tráfico).
- **Breakpoints**:
  - Móvil: < 576px.
  - Tablet: 576px - 992px.
  - Desktop: > 992px.
- **Pruebas**: Usar DevTools de Chrome y dispositivos reales.

---

## 6. Accesibilidad
- **Semántica HTML**: Uso correcto de etiquetas (`<header>`, `<nav>`, `<article>`).
- **ARIA Labels**: Para elementos interactivos (ej: botones de favoritos).
- **Contraste de Colores**: Cumplir con WCAG 2.1 (ratio 4.5:1) [Link](https://webaim.org/resources/linkcontrastchecker/?fcolor=3D3D40&bcolor=EEEEEE&lcolor=000033 "Link Contrast Checker").
- **Teclado**: Navegación 100% funcional con `Tab` y `Enter`.

---

## 7. Pruebas de Usuario
- **Casos de Prueba**:
  1. Registro de nuevo usuario.
  2. Búsqueda de propiedades con filtros.
  3. Publicación de una propiedad (como propietario).
  4. Envío de mensajes entre usuarios.

---

## 8. Documentación para el Equipo
- **README.md**:
  - Instrucciones de instalación.
  - Estructura de carpetas del proyecto.
  - Variables de entorno requeridas.
- **Guía de Estilos para Devs**:
  - Convenciones de código (ej: nombres de componentes, estructura de carpetas).
  - Paleta de colores y tipografía en código (CSS variables).

---

## 9. Roadmap Priorizado (MVP)
1. **Fase 1**:
   - Autenticación de usuarios.
   - Búsqueda y publicación básica de propiedades.
2. **Fase 2**:
   - Perfiles de usuario con reseñas.
   - Panel de control para propietarios.
3. **Fase 3**:
   - Integración con mapas.
   - Sistema de mensajería interno.
4. **Fase 4**:
   - Contratos digitales (PDF con firma electrónica).

---

## **Ejemplo de Estructura de Carpetas**
```plaintext
/client
|-- /assets             # Imágenes, fuentes, etc.
|-- /components         # Componentes reutilizables
|   |-- PropertyCard
|   |-- SearchBar
|   |-- RatingSystem
|-- /pages              # Vistas principales
|   |-- Home
|   |-- PropertyDetails
|   |-- Dashboard
|-- /context            # Estado global (Context API)
|-- /hooks              # Custom Hooks
|-- /utils              # Funciones helpers
|-- App.jsx             # Configuración de rutas
|-- main.jsx            # Punto de entrada
```