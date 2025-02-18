import getPool from '../../db/getPool.js';

// Función para insertar un archivo en la base de datos
const insertFileModel = async (propertyId, fileUrl, fileType, sortIndex = 1) => {
    try {
        const db = await getPool();
        await db.query(
            `INSERT INTO images (id, propertyId, imageUrl, sortIndex) VALUES (UUID_TO_BIN(UUID()), UUID_TO_BIN(?), ?, ?)`,
            [propertyId, fileUrl, sortIndex]
        );
    } catch (err) {
        console.error('Error en insertFileModel:', err); // Registro para depuración
        throw new Error(`Error al insertar el archivo en la base de datos: ${err.message}`);
    }
};

export default insertFileModel;
