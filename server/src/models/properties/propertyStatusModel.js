import getPool from '../../db/getPool.js';

const propertyStatusModel = async ({ status, propertyId }) => {
	const pool = getPool();

	let query = `UPDATE properties SET status = ? WHERE propertyId = ?`;

	const queryParams = [`%${status}%`, `%${propertyId}%`];

	// Si no queremos retornar nada, simplemente llamamos a modificar la tabla y capturamos un res.status 200 o error
	return await pool.query(query, queryParams);
};

export default propertyStatusModel;
