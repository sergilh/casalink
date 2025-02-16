import getPool from '../../db/pool.js';

import generateErrorUtil from '../../utils/generateErrorUtil.js';

// Inicializamos el modelo.
const selectUserByIdModel = async (userId) => {
    const pool = await getPool();

    const [users] = await pool.query(
        `
            SELECT
                id,
                name,
                lastName,
                legalId,
                email,
                phone,
                avatarUrl,
                createdAt
            FROM users WHERE id = ?
        `,
        [userId]
    );

    if (users.length < 1) {
        generateErrorUtil('Usuario no encontrado', 404);
    }

    return users[0];
};

export default selectUserByIdModel;
