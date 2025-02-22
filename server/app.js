// componentes
import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import path from 'path';
import process from 'process';

// middlewares
import jsonMiddleware from './src/middlewares/jsonMiddleware.js';

// rutas
import usersRoutes from './src/routes/usersRoutes.js';
import propertiesRoutes from './src/routes/propertiesRoutes.js';
import contractsRoutes from './src/routes/contractsRoutes.js';
import adminRoutes from './src/routes/adminRoutes.js';

// variables
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(jsonMiddleware);
app.use(express.json());
app.use('/static', express.static(path.join(process.cwd(), 'public'))); // Middleware para servir archivos estáticos

// Rutas
app.use('/api', usersRoutes); // Rutas de usuarios
<<<<<<< HEAD
app.use('/api', propertiesRoutes); // Rutas de propiedades
app.use('/api', contractsRoutes); // Rutas de contratos
app.use('/api', adminRoutes); // Rutas de admin
=======
app.use('/api', adminRoutes); // Rutas de usuarios
app.use('/api', contractsRoutes); // Rutas de usuarios
app.use('/api', requestsRoutes); // Rutas de solicitudes
app.use('/api/solicitudes', requestVisitRoutes); // Ruta para solicitar visita
app.use('/api/reviews', reviewsRoutes); // Rutas de valoraciones
app.use('/api', fileUploadRoute);
app.use('/api', propertiesRoutes);

/*// Ruta de prueba para recibir JSON
app.post('/api/test-json', (req, res) => {
	try {
		console.log('Body recibido:', req.body); // Ver el body en la terminal
		res.json({
			status: 'ok',
			receivedBody: req.body, // Retorna el body recibido
		});
	} catch (error) {
		res.status(400).json({ error: 'Error procesando JSON' });
	}
});*/

// Ruta de prueba para verificar la conexión a la base de datos
app.get('/', async (req, res) => {
	try {
		const pool = await getPool();
		// Realizamos una consulta simple para obtener la hora actual desde MySQL.
		const [rows] = await pool.query('SELECT NOW() AS currentTime');
		res.json({
			message:
				'Servidor Express funcionando y conectado a la base de datos',
			currentTime: rows[0].currentTime,
		});
	} catch (error) {
		console.error('Error en la consulta:', error);
		res.status(500).json({
			error: 'Error en la consulta a la base de datos',
		});
	}
});
>>>>>>> e330840663f7ad84f4f8ad7cdb3c2ffad11a013d

// Middleware de gestión de errores
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
	console.error(err);
	res.status(err.httpStatus || 500).send({
		status: 'error',
		message: err.message,
	});
});

// Iniciar servidor
app.listen(PORT, () => {
	console.log(
		`Servidor de CasaLink API corriendo en http://localhost:${PORT} 🚀\n`
	);
});

export default app;
