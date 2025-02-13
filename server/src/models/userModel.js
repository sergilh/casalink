import getPool from '../db/getPool.js';

const getAllUsers = async ({ username = '', email = '', role = '' }) => {
    const pool = await getPool();

    let query = `SELECT id, username, email, role FROM users WHERE username LIKE ? AND email LIKE ? AND role LIKE ?`;

    const queryParams = [`%${username}%`, `%${email}%`, `%${role}%`];

    const [users] = await pool.query(query, queryParams);

    return users;
};

export { getAllUsers };
