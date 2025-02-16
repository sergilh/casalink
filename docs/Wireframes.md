# Wireframes de CasaLink

## 1. Páginas Públicas

### 1.1 - Landing Page

-   **Hero Section**:
    -   Barra de búsqueda rápida (ubicación, precio, habitaciones) [🔗](#busqueda-rapida)
-   **Publicar Propiedad**:
    -   Mecanica de Publicacion [🔗](#mecanica)
    -   Botón "Publicar Propiedad"
-   **Propiedades Destacadas**:
    -   Grid con miniaturas (imagen, precio, ubicación, rating) [🔗](#propiedades-destacadas)
-   **Testimonios**:
    -   Reseñas de usuarios verificados [🔗](#testimonios)

|                         Desktop                          |                         Mobile                          |
| :------------------------------------------------------: | :-----------------------------------------------------: |
| ![Landing Page (Desktop)](./media/ui_d_landing_page.jpg) | ![Landing Page (Mobile)](./media/ui_m_landing_page.jpg) |

---

### 1.2 - Resultados de Búsqueda

-   **Filtros Avanzados** (sidebar):
    -   Rango de precios
    -   Número de habitaciones/baños
    -   Certificado energético
    -   Dueños con mejores valoraciones
-   **Listado de Propiedades**:
    -   Mapa interactivo [EXTRA]
    -   Cards con: imágenes, precio, ubicación, rating
    -   Botones "Ver Detalle" / "Añadir a Favoritos"

|                                  Desktop                                  |                                  Mobile                                  |
| :-----------------------------------------------------------------------: | :----------------------------------------------------------------------: |
| ![Resultados de Búsqueda (Desktop)](./media/ui_d_resultados_busqueda.jpg) | ![Resultados de Búsqueda (Mobile)](./media/ui_m_resultados_busqueda.jpg) |

### 1.3 - Detalle de Propiedad

-   **Galería de Imágenes** (carrusel + thumbnails)
-   **Información Básica**:
    -   Título, precio, ubicación exacta
    -   Botón "Añadir a Favoritos"
    -   Características (m², habitaciones, baños, etc.)
-   **Descripción Larga**
-   **Perfil del Propietario**:
    -   Avatar, nombre, rating.
-   **Formulario de Solicitud de Visita** (solo logged)

|                                Desktop                                |                                Mobile                                |
| :-------------------------------------------------------------------: | :------------------------------------------------------------------: |
| ![Detalle de Propiedad (Desktop)](./media/ui_d_detalle_propiedad.jpg) | ![Detalle de Propiedad (Mobile)](./media/ui_m_detalle_propiedad.jpg) |

---

## 2. Páginas de Usuario Registrado

### 2.4 - Dashboard General

-   **Resumen**:

    -   Numero de notificaciones pendientes y botón "Ver" (Si existen)
    -   Editar Perfil
    -   Estado de perfil (completo/verificado)
    -

-   **Acciones Rápidas**:

    -   "Publicar Propiedad"
    -   "Mis Propiedades"
    -   "Ver Favoritos"
    -   "Mis Contratos"

|                              Desktop                               |                              Mobile                               |
| :----------------------------------------------------------------: | :---------------------------------------------------------------: |
| ![Dashboard General (Desktop)](./media/ui_d_dashboard_general.jpg) | ![Dashboard General (Mobile)](./media/ui_m_dashboard_general.jpg) |

---

### 2.5 - Perfil de Usuario

-   **Perfil**:

    -   Avatar
    -   Nombre Completo

-   **Sección de Edición**: (Solo si es su perfil)

    -   Avatar uploader
    -   Campos: Nombre, teléfono, biografía
    -   Switch "Verificación de Identidad" (subir documentos)

-   **Reseñas**:

    -   Gráfico de rating promedio
    -   Tabs: "Reseñas Recibidas" / "Reseñas Escritas"

|                             Desktop                             |                             Mobile                             |
| :-------------------------------------------------------------: | :------------------------------------------------------------: |
| ![Perfil de Usuario (Desktop)](./media/ui_d_perfil_usuario.jpg) | ![Perfil de Usuario (Mobile)](./media/ui_m_perfil_usuario.jpg) |

---

### 2.6 - Mis Propiedades

-   **Listado de Propiedades**:

    -   Estado (pendiente, disponible, oculta, alquilada)
    -   Acciones: Editar, Ocultar, Ver Solicitudes

-   **Listado de Propiedades Favoritas**:

    -   Lista de propiedades
    -   Botón "Ver detalle"
    -   Botón "Eliminar de Favoritos"

|                            Desktop                             |                            Mobile                             |
| :------------------------------------------------------------: | :-----------------------------------------------------------: |
| ![Mis Propiedades (Desktop)](./media/ui_d_mis_propiedades.jpg) | ![Mis Propiedades (Mobile)](./media/ui_m_mis_propiedades.jpg) |

---

### 2.7 - Contratos y Visitas

-   **Visitas**:
    -   Listado de visitas
    -   Acciones: Aprobar / Modificar / Rechazar
-   **Contratos**:
    -   Fechas (inicio/fin)
    -   Status
    -   Acciones: Aprobar / Rechazar / zzCancelar
    -   Descargar en PDF (si existe) [EXTRA]
    -   Botón "Dejar Reseña" (si no existe ya)

|                               Desktop                                |                               Mobile                                |
| :------------------------------------------------------------------: | :-----------------------------------------------------------------: |
| ![Contratos y Visitas (Desktop)](./media/ui_d_contratos_visitas.jpg) | ![Contratos y Visitas (Mobile)](./media/ui_m_contratos_visitas.jpg) |

---

### 2.8 - Mis Notificaciones

-   **Lista Priorizada**:
    -   Solicitudes de visita (Acción: Aceptar/Rechazar)
    -   Aprobaciones/Rechazos de propiedades (Acción: Ver)
    -   Reseña (Acción: Enviar/Reportar)
    -   Aprobaciones/Rechazos/Cancelación/Vencimiento de contratos (Acción: Ver)

|                               Desktop                               |                               Mobile                               |
| :-----------------------------------------------------------------: | :----------------------------------------------------------------: |
| ![Mis Notificaciones (Desktop)](./media/ui_d_mis_notifications.jpg) | ![Mis Notificaciones (Mobile)](./media/ui_m_mis_notifications.jpg) |

---

## 3. Páginas de Administrador

### 3.9 - Panel de Control Admin

-   **Pendientes**:
    -   Listado de Propiedades pendientes de aprobación (Acción: Ver)
    -   Listado de Reseñas reportadas (Acción: Ver)
-   **Modal**:
    -   Comentario/Propiedad
    -   Botones "Aprobar" / "Rechazar" con campo de motivo

|                                  Desktop                                  |                                  Mobile                                  |
| :-----------------------------------------------------------------------: | :----------------------------------------------------------------------: |
| ![Panel de Control Admin (Desktop)](./media/ui_d_panel_control_admin.jpg) | ![Panel de Control Admin (Mobile)](./media/ui_m_panel_control_admin.jpg) |

---

## 4. Componentes Reutilizables

-   **Header**{#header-section}:
    -   Logo
    -   Navegación (Inicio, Acerca, Buscar, Publicar) [🔗](#navbar-section)
    -   Call-to-Action Button (Registro/Login)
    -   Iconos: Notificaciones, Perfil, Dashboard
-   **Mecanica de Publicacion** {#mecanica}
    -   3 pasos ilustrados (publicar, contactar, alquilar)
-   **Carrusel de Propiedades**{#propiedades-destacadas}
    -   Grid con miniaturas (imagen, precio, ubicación, rating)
-   **Testimonios**{#testimonios}
    -   Grid con Reseñas de usuarios verificados con 5 estrellas
-   **Footer**{#footer-section}:
    -   Sección de confianza (sellos de seguridad)
    -   Enlaces rápidos (FAQ, Soporte)
    -   Enlaces legales (Términos, Privacidad)
    -   Redes sociales [🔗](#redes-sociales)
-   **Modal Formulario de Login**:
    -   Campos: Email, Contraseña
    -   Enlace "¿Olvidaste tu contraseña?"
-   **Modal Formulario de Registro**:
    -   Campos: Nombre, Apellido, Email, Teléfono, Contraseña
    -   Checkbox "Acepto términos y condiciones"
-   **Modal Formulario de Nueva Propiedad**:
    -   Paso 1: Detalles (título, descripción, precio)
    -   Paso 2: Características (habitaciones, m², extras)
    -   Paso 3: Subir imágenes + certificados
-   **Modales Comunes**:
    -   Confirmación de acciones ("¿Eliminar de favoritos?")
    -   Sistema de rating (1-5 estrellas + comentario)
-   **Mapa Interactivo**:
    -   Mapa de las propiedades
    -   Botón "Ver en lista"
-   **Lista de Propiedades**:
    -   Lista de propiedades
    -   Botón "Ver detalle"
    -   Botón "Añadir a Favoritos" (Solo si es usuario) [EXTRA]
-   **Redes Sociales**{#redes-sociales}
    -   Enlaces a redes sociales
-   **Filtros Avanzados** (sidebar) {#filtros-avanzados}
    -   Rango de precios
    -   Número de habitaciones/baños
    -   Certificado energético
    -   Dueños con mejores valoraciones
-   **Estados Especiales**:
    -   Búsqueda sin resultados
    -   Perfil sin reseñas
    -   Propiedad pendiente de aprobación

![Componentes Reutilizables](./media/ui_componentes_reutilizables.jpg)

---

## **Ejemplo de Estructura en Figma**

```plaintext
├─ 🎨 Landing Page
├─ 🔍 Resultados de Búsqueda
├─ 🏠 Detalle de Propiedad
├─ 📋 Dashboard General
├─ 👤 Perfil de Usuario
├─ 🏘️ Mis Propiedades
├─ 📝 Contratos y Visitas
├─ 📢 Mis Notificaciones
└─ ⚙️ Panel de Control Admin
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
