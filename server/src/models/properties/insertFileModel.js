import getPool from '../../db/getPool.js';

const insertFileModel = async (
	propertyId,
	fileUrl,
	fileType,
	sortIndex = 1
) => {
	try {
		const db = await getPool();
		await db.query(
			`
			INSERT INTO images (propertyId, imageUrl, fileType, sortIndex) 
			VALUES (?, ?, ?, ?)`,
			[propertyId, fileUrl, fileType, sortIndex]
		);
	} catch (err) {
		throw new Error(
			`Error al insertar el archivo en la base de datos: ${err.message}`
		);
	}
};

export default insertFileModel;
