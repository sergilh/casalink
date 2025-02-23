import getPool from '../../db/getPool.js';
// Evitar que se modifique el legalId a menos que sea NULL

const usersModificationController = async (req, res, next) => {
	const { id } = req.params;
	const { name, lastName, legalId, email, phone, bio } = req.body;

	const pool = await getPool();

	const query = `UPDATE users SET name = ?, lastName = ?, legalId = ?, email = ?, phone = ?, bio = ? WHERE id = ?;`;
	const values = [name, lastName, legalId, email, phone, bio, id];

	try {
		//const results = await pool.execute(query, values);
		//res.status(200).json(results);
		res.status(200).json({
			status: 'Agregar la lógica aquí',
			query: query,
			values: values,
		});
		console.log('Agregar la lógica aquí', pool);
	} catch (error) {
		next(error);
	}
};

export default usersModificationController;
