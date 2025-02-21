import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

// Obtener la ruta absoluta del directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Servir archivos estáticos desde la carpeta de presentaciones
app.use(express.static(path.join(__dirname, '../../../docs/presentaciones')));

app.use(express.static(path.join(__dirname, '../../../docs/')));

// Ruta para servir el HTML
app.get('/', (req, res) => {
	res.sendFile(
		path.join(__dirname, '../../../docs/presentaciones', 'index.html')
	);
});

// Iniciar servidor en el puerto 8081
const PORT = 8081;
app.listen(PORT, () => {
	console.log(
		`🚀 Ya puedes ver nuestra presentacion en  http://localhost:${PORT}`
	);
});
