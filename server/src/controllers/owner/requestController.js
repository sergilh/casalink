import getPool from '../../db/getPool.js';

const requestController = async (req, res) => {
    try {
        const pool = await getPool();

        // Verificar si el usuario tiene permisos (solo owners y admins)
        if (req.user.rol !== 'owner' && req.user.rol !== 'admin') {
            return res.status(403).json({ message: 'Unauthorized access' });
        }

        // Consulta para obtener las solicitudes de alquiler
        const [requests] = await pool.query(
            `SELECT r.id, r.tenantId, r.propertyId, r.status, r.startDate, r.createdAt, 
                    u.name AS tenantName, p.adTitle AS propertyTitle
             FROM rentalContracts r
             JOIN users u ON r.tenantId = u.id
             JOIN properties p ON r.propertyId = p.id
             ORDER BY r.createdAt DESC;`
        );

        res.json(requests);
    } catch (error) {
        console.error('Error fetching rental requests:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export { requestController };
