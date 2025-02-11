import 'dotenv/config';

import express from 'express';
import getPool from './src/db/getPool.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Ruta de ejemplo para comprobar la conexión a la base de datos.
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

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
