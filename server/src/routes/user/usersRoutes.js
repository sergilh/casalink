import express from 'express';
import usersController from '../../controllers/user/usersController.js';
import getUserInfo from '../../controllers/user/getUserInfo.js';
import authUserMiddleware from '../../middlewares/authUserMiddleware.js';
import usersLoginController from '../../controllers/user/usersLoginController.js';
import usersRegisterController from '../../controllers/user/usersRegisterController.js';

const router = express.Router();

// Endpoint para obtener la lista de usuarios
router.get('/users', usersController); // En que contexto se ejecuta?

//Endpoint protegido para obtener la información del usuario autenticado
//authUserMiddleware para obtener el token y verificarlo
router.get('/profile', authUserMiddleware, getUserInfo); // definir la lógica de la ruta

// Registro de usuarios
router.post('/users/register', usersRegisterController);
// Validación de usuario (email)
router.post('/users/validate', usersController);
// Autenticación JWT
router.post('/users/login', usersLoginController);
// Cambio de contraseña
router.patch('/users/password', usersController);
// Información de usuario
router.get('/users/:id', usersController);
// Modificar usuario [EXTRA]
router.put('/users/:id', usersController);
// Histórico de reseñas
router.get('/users/:id/reviews', usersController);
// Enviar valoración
router.post('/users/reviews', usersController);

export default router;
