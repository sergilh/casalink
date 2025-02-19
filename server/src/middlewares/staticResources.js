import express from 'express';
import path from 'path';

// Middleware para servir imágenes y videos subidos
const staticResourcesMiddleware = (app) => {
	app.use(
		'/images',
		express.static(path.join(process.cwd(), 'public/images'))
	);

	app.use(
		'/videos',
		express.static(path.join(process.cwd(), 'public/videos'))
	);

	// Middleware para manejar rutas no encontradas (404)
	app.use((req, res) => {
		res.status(404).json({
			status: 'error',
			message: 'Ruta no encontrada',
		});
	});
};

export default staticResourcesMiddleware;
