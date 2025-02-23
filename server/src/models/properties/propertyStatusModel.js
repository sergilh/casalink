import getPool from '../../db/getPool.js';

const propertyStatusModel = async (status, propertyId) => {
	const pool = getPool();

	console.log('Status:', status);
	console.log('PropertyId:', propertyId);

	const [results] = await pool.query(
		`UPDATE properties SET status = ? WHERE id = ?`,
		[status, propertyId]
	);

	console.log('Results:', results);

	return results.changedRows;
};

export default propertyStatusModel;
