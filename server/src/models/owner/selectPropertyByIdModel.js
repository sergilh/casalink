import getPool from '../../db/getPool.js';
const selectPropertyByIdModel = async (propertyId) => {
	const pool = await getPool();

	const [properties] = await pool.query(
		`
        SELECT p.id,
         p.propertyTitle,
         p.propertyType,
         p.description
         p.price,
        p.addressLocality,
        p.addressStreet,
        p.addressNumber,
        p.addressFloor,
        p.hasEnergyCert,
        p.zipCode,
        p.location,
        p.squareMeters,
        p.bedrooms,
        p.bathrooms,
        p.price,
        p.status,
        u.id,
        u.name,
        u.lastName,
        u.avatarUrl,
        
         FROM properties p
         JOIN users u ON p.ownerId = u.id
         WHERE p.id=?`,
		[propertyId]
	);
};
export default selectPropertyByIdModel;
