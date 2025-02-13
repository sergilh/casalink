# Wireframes de CasaLink

## 1. Páginas Públicas (Usuario Anónimo)

###  1.01 Landing Page

- **Hero Section**:
  - Logo + eslogan
  - Call-to-Action (Registro/Login)
  - Barra de búsqueda rápida (ubicación, precio, habitaciones)
- **Propiedades Destacadas**:
  - Grid con miniaturas (imagen, precio, ubicación, rating)
- **Cómo Funciona**:
  - 3 pasos ilustrados (buscar, contactar, alquilar)
- **Testimonios**:
  - Reseñas de usuarios verificados
- **Footer**:
  - Enlaces legales (Términos, Privacidad)
  - Redes sociales

### 1.02 Resultados de Búsqueda

- **Filtros Avanzados** (sidebar):
  - Rango de precios
  - Número de habitaciones/baños
  - Fecha disponibilidad
  - Certificado energético
- **Listado de Propiedades**:
  - Mapa interactivo (opcional)
  - Cards con: imágenes, precio, ubicación, rating
  - Botones "Ver Detalle" / "Añadir a Favoritos" (solo logged)

### 1.03 Detalle de Propiedad

- **Galería de Imágenes** (carrusel + thumbnails)
- **Información Básica**:
  - Título, precio, ubicación exacta
  - Características (m², habitaciones, ascensor, etc.)
- **Descripción Larga**
- **Perfil del Propietario**:
  - Avatar, nombre, rating, botón "Contactar"
- **Formulario de Solicitud de Visita** (solo logged)

### 1.04 Login / Registro

- **Formulario de Login**:
  - Campos: Email, Contraseña
  - Enlace "¿Olvidaste tu contraseña?"
- **Formulario de Registro**:
  - Campos: Nombre, Email, Teléfono, Contraseña
  - Checkbox "Acepto términos y condiciones"

---

## 2. Páginas de Usuario Registrado

### 2.05Dashboard General

- **Resumen**:
  - Notificaciones pendientes
  - Últimas propiedades visitadas
  - Contratos activos
- **Acciones Rápidas**:
  - "Publicar Propiedad" (owner)
  - "Ver Favoritos"
  - "Editar Perfil"

### 2.06Perfil de Usuario

- **Sección de Edición**:
  - Avatar uploader
  - Campos: Nombre, teléfono, biografía
  - Switch "Verificación de Identidad" (subir documentos)
- **Historial**:
  - Tabs: "Reseñas Recibidas" / "Reseñas Escritas"
  - Gráfico de rating promedio

### 2.07 Mis Propiedades (Owner)

- **Listado de Propiedades**:
  - Estado (pendiente/aprobado/alquilado)
  - Acciones: Editar, Ocultar, Ver Solicitudes
- **Formulario de Nueva Propiedad**:
  - Paso 1: Detalles (título, descripción, precio)
  - Paso 2: Características (habitaciones, m², extras)
  - Paso 3: Subir imágenes + certificados

### 2.08 Contratos y Visitas

- **Calendario de Visitas**:
  - Eventos por propiedad (pendientes/confirmadas)
  - Modal de confirmación/rechazo
- **Detalle de Contrato**:
  - Fechas (inicio/fin)
  - PDF descargable
  - Botón "Dejar Reseña" (post-alquiler)

### 2.09 Notificaciones

- **Lista Priorizada**:
  - Solicitudes de visita
  - Aprobaciones/rechazos de propiedades
  - Recordatorios de pago
- **Acciones**:
  - Marcar como leído
  - Eliminar

---

## 3. Páginas de Administrador

### 3.10 Panel de Control Admin

- **Métricas**:
  - Usuarios registrados (last 30 días)
  - Propiedades pendientes de aprobación
- **Acciones Rápidas**:
  - "Revisar Propiedades"
  - "Ver Usuarios Reportados"

### 3.2 Aprobación de Propiedades

- **Listado de Propiedades Pendientes**:
  - Preview de imágenes + detalles
  - Botones "Aprobar" / "Rechazar" con motivo
- **Historial de Decisiones**

---

## 4. Componentes Reutilizables

- **Navbar**:
  - Logo + Menú contextual (Inicio, Buscar, Dashboard)
  - Iconos: Notificaciones, Perfil
- **Footer**:
  - Sección de confianza (sellos de seguridad)
  - Enlaces rápidos (FAQ, Soporte)
- **Modales Comunes**:
  - Confirmación de acciones ("¿Eliminar de favoritos?")
  - Sistema de rating (1-5 estrellas + comentario)
- **Mapa Interactivo**:
  - Mapa de las propiedades
  - Botón "Ver en mapa"
- **Lista de Propiedades**:
  - Lista de propiedades
  - Botón "Ver detalle"

---

## 5. Flujos Críticos a Representar

1. **Publicación de Propiedad**:
   Propietario → Nueva Propiedad → Admin aprueba → Visible en buscador

2. **Solicitud de Alquiler**:
   Inquilino → Contactar → Propietario acepta → Firma digital → Reseña post-contrato

3. **Gestión de Incidencias**:
   Usuario → Reportar Reseña → Admin revisa → Sanción/ Eliminación

---

## 6. Tips para el Wireframe

1. **Prioriza Mobile-First**: Diseña primero la versión móvil (60%+ tráfico).
2. **Usa Placeholders Realistas**:
   - Imágenes: 800x600px
   - Textos: Lorem ipsum con longitud similar al real
3. **Incluye Estados Especiales**:
   - Búsqueda sin resultados
   - Perfil sin reseñas
   - Propiedad pendiente de aprobación
4. **Herramientas Recomendadas**:
   - **Figma**: Para diseño colaborativo + prototipado
   - **Adobe XD**: Para interacciones avanzadas

---

## **Ejemplo de Estructura en Figma**
```plaintext
├─ 🎨 Landing Page
├─ 🔍 Search Results
├─ 🏠 Property Detail
├─ 👤 User Profile
├─ 📋 Dashboard
├─ 📝 Property Form
└─ ⚙️ Admin Panel
```

## Diagrama de Flujo de CasaLink

```mermaid
---
title: CasaLink App Flow Chart
---

%%{
  init: {
    "fontFamily": "Montserrat"
  }
}%%

graph TD;

home(["🏠 Inicio"])

subgraph Navegación
    login[👤 Log In]
    signUp[📝 Registro]
    search[🔎 Búsqueda]
    createProperty[🏡 Publicar
    una Propiedad]
end

subgraph Área de Usuario
    dashboard[🎛️ Dashboard]
    notifications[📬 Notificaciones]
    modifyProfile[✏️ Editar Perfil]
    reply[📨 Enviar Notificación]
    review[✨ Dejar una Reseña]
    reportReview[⚠️ Reportar una Reseña]
    requestApointment[📅 Solicitar Visita]
    verifyByAdmin{✅ 
    Verificacion
    de Admin}
    verifyUserRole{🔐
    Verificacion
    del Usuario}
    subgraph Lista de Favoritos
        favs[♥️ Favoritos]
        addFav[💘 Añadir a Favoritos]
        removeFav[💔 Eliminar de Favoritos]
    end
    subgraph Propiedades
        properties[🏢 Mis Propiedades]
        modifyProperty[🪧 Editar Propiedad]
        propertyForm[🏘️ Formulario
        de Propiedad]
    end
    subgraph Contratos
        requestContract{✍️ Solicitar
        un Contrato}
        cancelContract[ Cancelar un Contrato]
        myContracts[📃 Mis Contratos]
    end
end

subgraph Perfiles Publicos
    publicProfile[👤 Perfil Publico]
        userReviews[⭐ Reseñas]
    propertyDetail[🏠 Detalle de Propiedad]
end

subgraph Busquedas
    searchResults[🔎 Resultados de Busqueda]
end

verifyUser{✅
Verificacion
de Usuario}
generateToken{👌
Usuario
Logeado}

home                --> search
home                --> login
home                --> signUp

login               --> generateToken
verifyUser          --> generateToken

signUp              --> verifyUser

createProperty      --> generateToken
propertyForm        --> verifyByAdmin
verifyByAdmin       --> |✅| properties
modifyProperty      --> verifyByAdmin

search              --> searchResults
searchResults       --> propertyDetail
propertyDetail      --> publicProfile
propertyDetail      --> generateToken
propertyDetail      --> searchResults
publicProfile       --> userReviews
searchResults       --> generateToken

generateToken       --> |Token Valido| addFav
generateToken       --> |Token Valido| modifyProfile
generateToken       --> |Token Valido| modifyProperty
generateToken       --> |Token Valido| reply
generateToken       --> |Token Valido| dashboard
generateToken       --> |Token Valido| properties
generateToken       --> |Token Valido| notifications
generateToken       --> |Token Valido| propertyForm

dashboard           --> modifyProfile
dashboard           --> modifyProperty
dashboard           --> favs
dashboard           --> reportReview
dashboard           --> myContracts

favs                --> removeFav
addFav              --> favs
removeFav           --> favs
favs                --> dashboard

review              --> userReviews
reportReview        --> verifyByAdmin
verifyByAdmin       --> |✅| notifications

notifications       --> requestContract
requestContract     --> |Aceptar| notifications
requestContract     --> |Rechazar| cancelContract
myContracts         --> cancelContract
cancelContract      --> notifications
notifications       --> myContracts

notifications       --> reply
notifications       --> requestApointment
notifications       --> review

requestApointment   --> verifyUserRole
verifyUserRole      --> notifications

reply               --> dashboard

modifyProfile       --> dashboard
```

[Editable](https://www.mermaidchart.com/app/projects/200af6bf-3c37-4c2d-add5-860745724187/diagrams/11bf6451-0d0b-4877-b6d5-2bf1ad23d2a9/version/v0.1/edit)