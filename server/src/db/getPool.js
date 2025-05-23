import mysql from 'mysql2/promise';

// Desestructuramos las variables de entorno necesarias.
const { MYSQL_HOST, MYSQL_USER, MYSQL_PASS, MYSQL_DB, MYSQL_PORT } =
	process.env;

let pool;

const getPool = async () => {
	try {
		// Si no existe aún el pool, lo creamos.
		if (!pool) {
			// Creamos el pool de conexiones especificando la base de datos.
			pool = mysql.createPool({
				host: MYSQL_HOST,
				user: MYSQL_USER,
				password: MYSQL_PASS,
				database: MYSQL_DB,
				port: Number(MYSQL_PORT),
				timezone: 'Z',
			});
		}
		// Retornamos el pool ya configurado.
		return pool;
	} catch (err) {
		console.error('Error al conectar con la base de datos:', err);
		throw err;
	}
};

export default getPool;
