# Endpoints (Rutas) de la API - CasaLink

## 1. Endpoints de Usuarios

| Id   | Método | Ruta                       | Descripción                    |
| ---- | ------ | -------------------------- | ------------------------------ |
| 1.01 | POST   | /api/users/register        | Registro de usuarios           |
| 1.02 | PATCH  | /api/users/validate        | Validación de usuario (email)  |
| 1.03 | POST   | /api/users/login           | Autenticación JWT              |
| 1.04 | GET    | /api/users/password        | Solicitar cambio de contraseña |
| 1.05 | GET    | /api/users/profile         | Perfil del usuario             |
| 1.06 | GET    | /api/users/:userId         | Información de un usuario      |
| 1.07 | PUT    | /api/users/                | Modificar usuario [EXTRA]      |
| 1.08 | PUT    | /api/users/change-password | Modificar contraseña           |
| 1.09 | GET    | /api/users/:userId/reviews | Histórico de reseñas           |
| 1.10 | POST   | /api/users/reviews         | Enviar valoración              |
| 1.11 | PATCH  | /api/users/avatar          | Avatar del usuario             |

---

### 1.01 Registro de Usuarios

-   **Método:** POST
-   **Endpoint:** `/api/users/register`
-   **Descripción:** Registra un nuevo usuario.
-   **Body:**

    ```json
    {
    	"name": "string",
    	"lastName": "string",
    	"email": "string",
    	"password": "string",
    	"1phone": "string",
    	"legalId": "string"
    }
    ```

-   **Respuesta:**

        -   **Código 201:** Usuario registrado exitosamente.

            ```json
        	{
        		"status": "success",
        		"message": "Usuario registrado con éxito.",
        		"data": {
            "newUserId": number,
            "name": "string",
            "lastName": "string",
            "email": "string",
            "phone": "string",
            "legalId": "string"
        }

    }

    ````

        -   **Código 409:** Error en la solicitud.

            ```json
            {
            	"status": "error",
    			"message":"string"
            }
            ```
    ````

---

### 1.02 Validación de Usuario

-   **Método:** PATCH
-   **Endpoint:** `/api/users/validate`
-   **Descripción:** Valida el email del usuario.
-   **Body:**

    ```json
    {
    	"email": "string"
    }
    ```

-   **Respuesta:**

    -   **Código 200:** Email validado.

        ```json
        {
        	"message": "Email validado exitosamente."
        }
        ```

    -   **Código 404:** Email no encontrado.

        ```json
        {
        	"status": "error",
        	"message": "string"
        }
        ```

### 1.03 Autenticación

-   **Método:** POST
-   **Endpoint:** `/api/users/login`
-   **Descripción:** Inicia sesión y devuelve un token JWT.
-   **Body:**

    ```json
    {
    	"email": "string",
    	"password": "string"
    }
    ```

-   **Respuesta:**

    -   **Código 200:** Inicio de sesión exitoso.

        ```json
        {
        	"status": "ok",
        	"message": "Usuario logueado",
        	"data": {
        		"token": "string"
        	}
        }
        ```

    -   **Código 401:** Credenciales inválidas.

        ```json
        {
        	"error": "Credenciales inválidas."
        }
        ```

### 1.04 Solicitar cambio de Contraseña por olvido

-   **Método:** GET
-   **Endpoint:** `/api/users/password`
-   **Descripción:** Permite al usuario cambiar su contraseña.
-   **Body:**

    ```json
    {
    	"email": "string"
    }
    ```

-   **Respuesta:**

    -   **Código 200:** Contraseña cambiada exitosamente.

        ```json
        {
        	"message": "Contraseña cambiada exitosamente."
        }
        ```

    -   **Código 400:** Error en la solicitud.

        ```json
        {
        	"error": "Contraseña antigua incorrecta."
        }
        ```

### 1.05 Información de Usuario

-   **Método:** GET
-   **Endpoint:** `/api/users/profile`
-   **Descripción:** Obtiene la información del perfil del usuario autenticado.

-   **Respuesta:**

    -   **Código 200:** Información del usuario.

        ```json
        {
        	"userId": "string",
        	"name": "string",
        	"email": "string",
        	"avatar": "string"
        }
        ```

### 1.06 Información de Usuario Específico

-   **Método:** GET
-   **Endpoint:** `/api/users/:userId`
-   **Descripción:** Obtiene la información de un usuario específico.
-   **Parámetros:**
    -   `userId`: ID del usuario.
-   **Respuesta:**
    -   **Código 200:** Información del usuario.
    ```json
    {
    	"userId": "string",
    	"name": "string",
    	"email": "string",
    	"avatar": "string"
    }
    ```
    -   **Código 404:** Usuario no encontrado.
    ```json
    {
    	"error": "Usuario no encontrado."
    }
    ```

### 1.07 Modificar Usuario

-   **Método:** PUT
-   **Endpoint:** `/api/users/`
-   **Descripción:** Modifica la información del usuario autenticado.
-   **Body:**
    ```json
    {
    	"name": "string",
    	"email": "string"
    }
    ```
-   **Respuesta:**
    -   **Código 200:** Usuario modificado exitosamente.
    ```json
    {
    	"message": "Usuario modificado exitosamente."
    }
    ```
    -   **Código 400:** Error en la solicitud.
    ```json
    {
    	"error": "Email ya registrado."
    }
    ```

### 1.08 Cambiar Contraseña

-   **Método:** PUT
-   **Endpoint:** `/api/users/change-password`
-   **Descripción:** Cambia la contraseña del usuario autenticado.
-   **Body:**
    ```json
    {
    	"oldPassword": "string",
    	"newPassword": "string"
    }
    ```
-   **Respuesta:**
    -   **Código 200:** Contraseña cambiada exitosamente.
    ```json
    {
    	"message": "Contraseña cambiada exitosamente."
    }
    ```
    -   **Código 400:** Error en la solicitud.
    ```json
    {
    	"error": "Contraseña antigua incorrecta."
    }
    ```

### 1.09 Histórico de Reseñas

-   **Método:** GET
-   **Endpoint:** `/api/users/:userId/reviews`
-   **Descripción:** Obtiene el histórico de reseñas de un usuario específico.
-   **Parámetros:**
    -   `userId`: ID del usuario.
-   **Respuesta:**
    -   **Código 200:** Lista de reseñas.
    ```json
    [
    	{
    		"reviewId": "string",
    		"rating": "number",
    		"comment": "string",
    		"date": "string"
    	}
    ]
    ```

### 1.10 Enviar Valoración

-   **Método:** POST
-   **Endpoint:** `/api/users/reviews/`
-   **Descripción:** Envía una valoración para un usuario.
-   **Body:**
    ```json
    {
    	"userId": "string",
    	"rating": "number",
    	"comment": "string"
    }
    ```
-   **Respuesta:**
    -   **Código 201:** Valoración enviada exitosamente.
    ```json
    {
    	"message": "Valoración enviada exitosamente."
    }
    ```
    -   **Código 400:** Error en la solicitud.
    ```json
    {
    	"error": "Error al enviar la valoración."
    }
    ```

### 1.11 Actualizar Avatar

-   **Método:** PATCH
-   **Endpoint:** `/api/users/avatar`
-   **Descripción:** Actualiza el avatar del usuario autenticado.
-   **Body:**
    ```json
    {
    	"avatar": "string" // URL de la imagen
    }
    ```
-   **Respuesta:**
    -   **Código 200:** Avatar actualizado exitosamente.
    ```json
    {
    	"message": "Avatar actualizado exitosamente."
    }
    ```

## 2. Endpoints de Propiedades

| Id   | Método | Ruta                               | Descripción                             |
| ---- | ------ | ---------------------------------- | --------------------------------------- |
| 2.12 | GET    | /api/properties                    | Listado de propiedades                  |
| 2.13 | POST   | /api/properties                    | Creación de nueva propiedad             |
| 2.14 | GET    | /api/properties/:propertyId        | Detalle de una propiedad                |
| 2.15 | PATCH  | /api/properties/:propertyId        | Disponibilidad de una propiedad (dueño) |
| 2.16 | PUT    | /api/properties/:propertyId        | Modificar una propiedad (dueño) [EXTRA] |
| 2.17 | POST   | /api/properties/:propertyId/upload | Cargar multimedia a una propiedad       |

### 2.12 Listado de Propiedades

-   **Método:** GET
-   **Endpoint:** `/api/properties`
-   **Descripción:** Obtiene un listado de propiedades.
-   **Respuesta:**
    -   **Código 200:** Lista de propiedades.
    ```json
    [
    	{
    		"propertyId": "string",
    		"title": "string",
    		"price": "number",
    		"location": "string",
    		"images": ["string"]
    	}
    ]
    ```

### 2.13 Creación de Nueva Propiedad

-   **Método:** POST
-   **Endpoint:** `/api/properties`
-   **Descripción:** Crea una nueva propiedad.
-   **Body:**
    ```json
    {
    	"title": "string",
    	"description": "string",
    	"price": "number",
    	"location": "string",
    	"images": ["string"] // URLs de las imágenes
    }
    ```
-   **Respuesta:**
    -   **Código 201:** Propiedad creada exitosamente.
    ```json
    {
    	"message": "Propiedad creada exitosamente.",
    	"propertyId": "string"
    }
    ```
    -   **Código 400:** Error en la solicitud.
    ```json
    {
    	"error": "Error al crear la propiedad."
    }
    ```

### 2.14 Detalle de Propiedad

-   **Método:** GET
-   **Endpoint:** `/api/properties/:propertyId`
-   **Descripción:** Obtiene los detalles de una propiedad específica.
-   **Parámetros:**
    -   `propertyId`: ID de la propiedad.
-   **Respuesta:**
    -   **Código 200:** Detalles de la propiedad.
    ```json
    {
    	"propertyId": "string",
    	"title": "string",
    	"description": "string",
    	"price": "number",
    	"location": "string",
    	"images": ["string"]
    }
    ```
    -   **Código 404:** Propiedad no encontrada.
    ```json
    {
    	"error": "Propiedad no encontrada."
    }
    ```

### 2.15 Cambio de Estado de Propiedad

-   **Método:** PATCH
-   **Endpoint:** `/api/properties/:propertyId`
-   **Descripción:** Cambia el estado de una propiedad (disponible, no disponible).
-   **Parámetros:**
    -   `propertyId`: ID de la propiedad.
-   **Body:**
    ```json
    {
    	"status": "string" // "available" o "unavailable"
    }
    ```
-   **Respuesta:**
    -   **Código 200:** Estado de la propiedad cambiado exitosamente.
    ```json
    {
    	"message": "Estado de la propiedad cambiado exitosamente."
    }
    ```
    -   **Código 404:** Propiedad no encontrada.
    ```json
    {
    	"error": "Propiedad no encontrada."
    }
    ```

### 2.16 Modificar Propiedad

-   **Método:** PUT
-   **Endpoint:** `/api/properties/:propertyId`
-   **Descripción:** Modifica la información de una propiedad.
-   **Parámetros:**
    -   `propertyId`: ID de la propiedad.
-   **Body:**
    ```json
    {
    	"title": "string",
    	"description": "string",
    	"price": "number",
    	"location": "string",
    	"images": ["string"] // URLs de las imágenes
    }
    ```
-   **Respuesta:**
    -   **Código 200:** Propiedad modificada exitosamente.
    ```json
    {
    	"message": "Propiedad modificada exitosamente."
    }
    ```
    -   **Código 404:** Propiedad no encontrada.
    ```json
    {
    	"error": "Propiedad no encontrada."
    }
    ```

### 2.17 Subir Imágenes y Videos

-   **Método:** POST
-   **Endpoint:** `/api/properties/:propertyId/upload`
-   **Descripción:** Sube imágenes y videos asociados a una propiedad.
-   **Parámetros:**
    -   `propertyId`: ID de la propiedad.
-   **Body:**
    ```json
    {
    	"files": ["string"] // URLs de las imágenes o videos
    }
    ```
-   **Respuesta:**
    -   **Código 200:** Archivos subidos exitosamente.
    ```json
    {
    	"message": "Archivos subidos exitosamente."
    }
    ```
    -   **Código 404:** Propiedad no encontrada.
    ```json
    {
    	"error": "Propiedad no encontrada."
    }
    ```

## 3. Endpoints de Contratos de Alquiler / Visitas

| Id   | Método | Ruta                               | Descripción                            |
| ---- | ------ | ---------------------------------- | -------------------------------------- |
| 3.18 | GET    | /api/contracts                     | Lista de solicitudes de alquiler       |
| 3.19 | POST   | /api/contracts/:propertyId         | Solicitud de visita (crea un contrato) |
| 3.20 | PATCH  | /api/contracts/:contractId/:status | Aceptar/Rechazar solicitud (owner)     |
| 3.21 | POST   | /api/contracts/:contractId/blocks/ | Bloquear usuario de propiedad [EXTRA]  |

### 3.18 Lista de Solicitudes de Alquiler

-   **Método:** GET
-   **Endpoint:** `/api/contracts/`
-   **Descripción:** Obtiene la lista de solicitudes de alquiler.
-   **Respuesta:**
    -   **Código 200:** Lista de solicitudes.
    ```json
    [
    	{
    		"contractId": "string",
    		"propertyId": "string",
    		"userId": "string",
    		"status": "string"
    	}
    ]
    ```

### 3.19 Solicitud de Visita

-   **Método:** POST
-   **Endpoint:** `/api/contracts/:propertyId`
-   **Descripción:** Realiza una solicitud de visita para una propiedad.
-   **Parámetros:**
    -   `propertyId`: ID de la propiedad.
-   **Body:**
    ```json
    {
    	"userId": "string",
    	"visitDate": "string" // Fecha de la visita
    }
    ```
-   **Respuesta:**
    -   **Código 201:** Solicitud de visita creada exitosamente.
    ```json
    {
    	"message": "Solicitud de visita creada exitosamente."
    }
    ```
    -   **Código 404:** Propiedad no encontrada.
    ```json
    {
    	"error": "Propiedad no encontrada."
    }
    ```

### 3.20 Aceptar/Rechazar Solicitud

-   **Método:** PATCH
-   **Endpoint:** `/api/contracts/:contractId/:status`
-   **Descripción:** Acepta o rechaza una solicitud de contrato.
-   **Parámetros:**
    -   `contractId`: ID del contrato.
    -   `status`: "accept" o "reject".
-   **Respuesta:**
    -   **Código 200:** Solicitud aceptada o rechazada exitosamente.
    ```json
    {
    	"message": "Solicitud {status} exitosamente."
    }
    ```
    -   **Código 404:** Contrato no encontrado.
    ```json
    {
    	"error": "Contrato no encontrado."
    }
    ```

### 3.21 Bloquear Usuario de Propiedad

-   **Método:** POST
-   **Endpoint:** `/api/contracts/:contractId/blocks/`
-   **Descripción:** Bloquea a un usuario de una propiedad.
-   **Parámetros:**
    -   `contractId`: ID del contrato.
-   **Body:**
    ```json
    {
    	"userId": "string"
    }
    ```
-   **Respuesta:**
    -   **Código 200:** Usuario bloqueado exitosamente.
    ```json
    {
    	"message": "Usuario bloqueado exitosamente."
    }
    ```
    -   **Código 404:** Contrato no encontrado.
    ```json
    {
    	"error": "Contrato no encontrado."
    }
    ```

## 4.## Endpoints de Administración

| Id   | Método | Ruta                                      | Descripción                             |
| ---- | ------ | ----------------------------------------- | --------------------------------------- |
| 4.22 | GET    | /api/admin/users                          | Lista de usuarios (admin)               |
| 4.23 | PATCH  | /api/admin/users/:userId/:newRole         | Gestionar usuarios (superadmin) [EXTRA] |
| 4.24 | PATCH  | /api/admin/properties/:propertyId/:action | Aprobar/Rechazar propiedad (admin)      |
| 4.25 | PUT    | /api/admin/properties/:propertyId         | Modificar una propiedad (admin) [EXTRA] |
| 4.26 | PATCH  | /api/admin/review/:reviewId               | Gestionar reseñas (admin)               |

### 4.22 Lista de Usuarios

-   **Método:** GET
-   **Endpoint:** `/api/admin/users/`
-   **Descripción:** Obtiene la lista de usuarios.
-   **Respuesta:**
    -   **Código 200:** Lista de usuarios.
    ```json
    [
    	{
    		"userId": "string",
    		"name": "string",
    		"email": "string",
    		"role": "string"
    	}
    ]
    ```

### 4.23 Gestionar Usuarios

-   **Método:** PATCH
-   **Endpoint:** `/api/admin/users/:userId/:newRole`
-   **Descripción:** Cambia el rol de un usuario.
-   **Parámetros:**
    -   `userId`: ID del usuario.
    -   `newRole`: Nuevo rol del usuario.
-   **Respuesta:**
    -   **Código 200:** Rol de usuario cambiado exitosamente.
    ```json
    {
    	"message": "Rol de usuario cambiado exitosamente."
    }
    ```
    -   **Código 404:** Usuario no encontrado.
    ```json
    {
    	"error": "Usuario no encontrado."
    }
    ```

### 4.24 Aprobar/Rechazar Propiedad

-   **Método:** PATCH
-   **Endpoint:** `/api/admin/properties/:propertyId/:action`
-   **Descripción:** Aprobar o rechazar una propiedad.
-   **Parámetros:**
    -   `propertyId`: ID de la propiedad.
    -   `action`: "approve" o "reject".
-   **Respuesta:**
    -   **Código 200:** Propiedad aprobada o rechazada exitosamente.
    ```json
    {
    	"message": "Propiedad {action} exitosamente."
    }
    ```
    -   **Código 404:** Propiedad no encontrada.
    ```json
    {
    	"error": "Propiedad no encontrada."
    }
    ```

### 4.25 Modificar Propiedad

-   **Método:** PUT
-   **Endpoint:** `/api/admin/properties/:propertyId`
-   **Descripción:** Modifica la información de una propiedad.
-   **Parámetros:**
    -   `propertyId`: ID de la propiedad.
-   **Body:**
    ```json
    {
    	"title": "string",
    	"description": "string",
    	"price": "number",
    	"location": "string",
    	"images": ["string"] // URLs de las imágenes
    }
    ```
-   **Respuesta:**
    -   **Código 200:** Propiedad modificada exitosamente.
    ```json
    {
    	"message": "Propiedad modificada exitosamente."
    }
    ```
    -   **Código 404:** Propiedad no encontrada.
    ```json
    {
    	"error": "Propiedad no encontrada."
    }
    ```

### 4.26 Gestionar Reseñas

-   **Método:** PATCH
-   **Endpoint:** `/api/admin/review/:reviewId`
-   **Descripción:** Gestiona reseñas de propiedades.
-   **Parámetros:**
    -   `reviewId`: ID de la reseña.
-   **Respuesta:**
    -   **Código 200:** Reseña gestionada exitosamente.
    ```json
    {
    	"message": "Reseña gestionada exitosamente."
    }
    ```
    -   **Código 404:** Reseña no encontrada.
    ```json
    {
    	"error": "Reseña no encontrada."
    }
    ```
