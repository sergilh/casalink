---
title: CasaLink Flow Chart
---
graph TD;
  %% Inicio del flujo
  A([🏠 Inicio]) --> B[Buscar Propiedades]
  A --> C[Publicar Propiedad]
  A --> D[Iniciar Sesión / Registrarse]
  A --> E[Ver Perfil]
  
  %% Flujo de búsqueda de propiedades
  B --> B1[Resultados de Búsqueda]
  B1 --> B2[Ver Detalle de Propiedad]
  B2 -->|No Registrado| D
  B2 -->|Registrado| B3[Contactar Propietario]
  B2 -->|Registrado| B4[Guardar en Favoritos]
  B2 -->|Registrado| B5[Solicitar Visita]

  %% Flujo de registro
  D --> D1[Formulario Registro/Login]
  D1 --> D2[Confirmación de Cuenta]
  D2 --> B2

  %% Flujo de publicación de propiedades
  C --> C1[Formulario de Publicación]
  C1 -->|No Registrado| D
  C1 -->|Registrado| C2[Confirmación y Aprobación]
  C2 --> C3[Propiedad Publicada]

  %% Flujo de perfil y gestión de propiedades
  E -->|No Registrado| D
  E --> E1[Panel de Usuario]
  E1 --> E2[Mis Propiedades]
  E1 --> E3[Mis Favoritos]
  E1 --> E4[Mis Visitas Agendadas]
  E1 --> E5[Mis Contratos]

  %% Flujo de contratos
  B5 --> F[Solicitud de Contrato]
  F -->|Debe haber solicitado visita| B5
  F --> F1[Revisión del Propietario]
  F1 --> F2[Firma de Contrato]
  F2 --> E5

  %% Flujo de gestión de notificaciones
  E1 --> N[Notificaciones]

