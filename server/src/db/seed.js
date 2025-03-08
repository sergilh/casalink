import 'dotenv/config';
import getPool from './getPool.js';
import bcrypt from 'bcrypt';

const {
	SUPERADMIN_NAME,
	SUPERADMIN_LASTNAME,
	SUPERADMIN_LEGAL_ID,
	SUPERADMIN_EMAIL,
	SUPERADMIN_PASSWORD,
	SUPERADMIN_PHONE,
	SUPERADMIN_BIO,
	ADMIN_NAME,
	ADMIN_LASTNAME,
	ADMIN_LEGAL_ID,
	ADMIN_EMAIL,
	ADMIN_PASSWORD,
	ADMIN_PHONE,
	ADMIN_BIO,
	USER_NAME,
	USER_LASTNAME,
	USER_LEGAL_ID,
	USER_EMAIL,
	USER_PASSWORD,
	USER_PHONE,
	USER_BIO,
} = process.env;

// Datos de los usuarios
const users = [
	{
		name: SUPERADMIN_NAME,
		lastName: SUPERADMIN_LASTNAME,
		legalId: SUPERADMIN_LEGAL_ID,
		email: SUPERADMIN_EMAIL,
		password: SUPERADMIN_PASSWORD,
		phone: SUPERADMIN_PHONE,
		bio: SUPERADMIN_BIO,
		role: 'superadmin',
	},
	{
		name: ADMIN_NAME,
		lastName: ADMIN_LASTNAME,
		legalId: ADMIN_LEGAL_ID,
		email: ADMIN_EMAIL,
		password: ADMIN_PASSWORD,
		phone: ADMIN_PHONE,
		bio: ADMIN_BIO,
		role: 'admin',
	},
	{
		name: USER_NAME,
		lastName: USER_LASTNAME,
		legalId: USER_LEGAL_ID,
		email: USER_EMAIL,
		password: USER_PASSWORD,
		phone: USER_PHONE,
		bio: USER_BIO,
		role: 'user',
	},
];

const pool = await getPool();

const seedUsers = async () => {
	try {
		console.log('Conectado a la base de datos');

		let querySeed = `
		INSERT INTO users
			(role, name, lastName, legalId, email, phone, isEmailVerified, isDocsVerified, isOwner, avatarUrl, password, bio) VALUES
			('admin', 'Admin', 'System', '00000000A', 'admin@casalink.com', '555000001', 1, 1, 0, 'seed_admin.png', '$2b$10$WQIRuUuJ2eSl5NSx8qfYQOufmqaSP/YV6SdJ2FJXfgDGel5XfXqKa', 'Administrador del sistema'),
			('user', 'María', 'Gómez', '12345678A', 'maria@example.com', '555000002', 1, 1, 0, 'seed_mariagomez.png', '$2b$10$WQIRuUuJ2eSl5NSx8qfYQOufmqaSP/YV6SdJ2FJXfgDGel5XfXqKa', 'Arquitecta apasionada por el diseño de interiores'),
			('user', 'Carlos', 'Ruiz', '87654321B', 'carlos@example.com', '555000003', 1, 1, 0, 'seed_carlosruiz.png', '$2b$10$WQIRuUuJ2eSl5NSx8qfYQOufmqaSP/YV6SdJ2FJXfgDGel5XfXqKa', 'Inversor inmobiliario'),
			('user', 'Laura', 'Fernández', '11223344C', 'laura@example.com', '555000004', 1, 1, 0, 'seed_laurafernandez.png', '$2b$10$WQIRuUuJ2eSl5NSx8qfYQOufmqaSP/YV6SdJ2FJXfgDGel5XfXqKa', 'Buscando mi primer hogar'),
			('user', 'Marta', 'Puelles', '12345678D', 'marta@example.com', '555000005', 1, 0, 0, 'seed_martapuelles.png', '$2b$10$WQIRuUuJ2eSl5NSx8qfYQOufmqaSP/YV6SdJ2FJXfgDGel5XfXqKa', 'Marketing & Customer Success professional with experience in multinationals and start ups. Vocational training teacher.'),
			('user', 'Juan', 'Perez', '12345678E', 'juan@example.com', '555000006', 1, 0, 0, 'seed_juanperez.png', '$2b$10$WQIRuUuJ2eSl5NSx8qfYQOufmqaSP/YV6SdJ2FJXfgDGel5XfXqKa', 'Nada mas especial que lo común de un nombre genérico'),
			('user', 'Sara', 'Navarro', '12345678F', 'sara@example.com', '555000007', 1, 0, 0, 'seed_saranavarro.png', '$2b$10$WQIRuUuJ2eSl5NSx8qfYQOufmqaSP/YV6SdJ2FJXfgDGel5XfXqKa', 'Especialista en Desarrollo Profesional B2C / B2B'),
			('user', 'Stefano', 'Peraldini', '12345678G', 'stefano@example.com', '555000008', 1, 0, 0, 'seed_stefanoperaldini.png', '$2b$10$WQIRuUuJ2eSl5NSx8qfYQOufmqaSP/YV6SdJ2FJXfgDGel5XfXqKa', 'Soy desarrollador, formador y tester de software. También especializado en soporte técnico de software para empresas.'),
			('user', 'Selene', 'Tourn', '12345678H', 'selene@example.com', '555000009', 1, 0, 0, 'seed_selenetourn.png', '$2b$10$WQIRuUuJ2eSl5NSx8qfYQOufmqaSP/YV6SdJ2FJXfgDGel5XfXqKa', 'Diseño instruccional 👩‍💻 + Agile 🚀 + HR 💻 + Psicología 🧠'),
			('user', 'David', 'Losas', '12345678I', 'david@example.com', '555000010', 1, 0, 0, 'seed_davidlosas.png', '$2b$10$WQIRuUuJ2eSl5NSx8qfYQOufmqaSP/YV6SdJ2FJXfgDGel5XfXqKa', 'Coordinador técnico en HACK A BOSS'),
			('user', 'Pablo', 'Rodríguez', '12345678J', 'pablo@example.com', '555000011', 1, 0, 0, 'seed_pablorodríguez.png', '$2b$10$WQIRuUuJ2eSl5NSx8qfYQOufmqaSP/YV6SdJ2FJXfgDGel5XfXqKa', 'Responsable de Negocio & Producto en HACK A BOSS');
		`;
		await pool.execute(querySeed);
		console.log('11 usuarios de SEED insertados correctamente.');
		querySeed = `
		INSERT INTO properties (ownerId, propertyTitle, propertyType, description, addressLocality, addressStreet, addressNumber, zipCode, location, squareMeters, bedrooms, bathrooms, price, status) VALUES
			(2, 'Apartamento céntrico en Malasaña', 'apartamento', 'Luminoso apartamento totalmente reformado con ascensor', 'Madrid', 'Calle de la Palma', '24', '28004' , POINT(40.4255, -3.70721), 78, 2, 1, 1350.00, 'available'),
			(2, 'Estudio con terraza en Chamberí', 'apartamento', 'Estudio reformado con terraza privada y trastero', 'Madrid', 'Calle de Santa Engracia', '72', '28010' , POINT(40.4362, -3.6987), 45, 1, 1, 950.00, 'rented'),
			(2, 'Ático con vistas en Salamanca', 'apartamento', 'Ático dúplex con vistas panorámicas y piscina comunitaria', 'Madrid', 'Calle de Serrano', '112', '28006' , POINT(40.4368, -3.6803), 145, 3, 2, 2800.00, 'available'),
			(2, 'Piso clásico en Retiro', 'piso', 'Piso clásico reformado con balcones a la calle', 'Madrid', 'Calle de Alcalá', '210', '28028' , POINT(40.4234, -3.6721), 92, 3, 2, 1650.00, 'pending'),
			(2, 'Loft industrial en Lavapiés', 'otro', 'Loft de diseño en edificio rehabilitado con techos altos', 'Madrid', 'Calle del Tribulete', '18', '28012' , POINT(40.4103, -3.7036), 65, 1, 1, 1200.00, 'available'),
			(2, 'Chalet adosado en Las Rozas', 'casa', 'Chalet adosado con jardín y garaje en urbanización privada', 'Las Rozas', 'Calle de los Prados', '5', '28232' , POINT(40.4923, -3.8914), 180, 4, 3, 2200.00, 'unavailable'),
			(3, 'Casa de pueblo en Girona', 'casa', 'Casa tradicional catalana totalmente restaurada', 'Girona', 'Carrer de la Força', '12', '17004' , POINT(41.9836, 2.8254), 220, 4, 3, 1800.00, 'available'),
			(3, 'Estudio cerca de la playa', 'apartamento', 'Estudio totalmente equipado a 200m de la playa', 'Barcelona', 'Passeig Marítim', '22', '08003' , POINT(41.3785, 2.1924), 40, 1, 1, 1100.00, 'rented'),
			(3, 'Ático en Eixample', 'apartamento', 'Ático moderno con terraza y vistas a la Sagrada Familia', 'Barcelona', 'Carrer de Provença', '320', '08037' , POINT(41.4015, 2.1740), 110, 2, 2, 2500.00, 'available'),
			(3, 'Finca rústica en Maresme', 'casa', 'Finca con terreno de 2 hectáreas y piscina', 'El Maresme', 'Camí de Ronda', 's/n', '08349' , POINT(41.5223, 2.4567), 350, 5, 4, 3500.00, 'pending'),
			(3, 'Piso con encanto en Gràcia', 'piso', 'Piso reformado con patio interior y mucha luz natural', 'Barcelona', 'Carrer de Verdi', '45', '08012' , POINT(41.4023, 2.1567), 85, 2, 1, 1900.00, 'available'),
			(3, 'Local comercial en Poble Sec', 'otro', 'Local comercial a estrenar con licencia de restaurante', 'Barcelona', 'Carrer de Blai', '55', '08004' , POINT(41.3750, 2.1667), 120, 0, 1, 2800.00, 'available'),
			(3, 'Duplex en Sant Cugat', 'duplex', 'Duplex moderno con jardín privado y parking', 'Sant Cugat', 'Avinguda de la Plana', '18', '08190' , POINT(41.4720, 2.0815), 130, 3, 2, 2100.00, 'rented'),
			(4, 'Cortijo andaluz en Sevilla', 'casa', 'Cortijo reformado con 2 hectáreas de olivos y piscina', 'Sevilla', 'Camino Viejo de Carmona', 'km 12', '41020' , POINT(37.3826, -5.9967), 400, 6, 4, 3200.00, 'available'),
			(4, 'Apartamento histórico en Triana', 'apartamento', 'Apartamento en edificio del siglo XVIII con vistas al río', 'Sevilla', 'Calle de San Jacinto', '88', '41010' , POINT(37.3864, -6.0032), 95, 3, 2, 1400.00, 'available'),
			(4, 'Estudio cerca de la Catedral', 'apartamento', 'Estudio totalmente equipado en zona monumental', 'Sevilla', 'Calle de Mateos Gago', '15', '41004' , POINT(37.3858, -5.9936), 38, 1, 1, 850.00, 'rented'),
			(4, 'Casa de campo en Córdoba', 'casa', 'Casa rural con caballerizas y huerto ecológico', 'Córdoba', 'Camino de las Ermitas', '7', '14012' , POINT(37.8915, -4.7793), 280, 4, 3, 1800.00, 'pending'),
			(4, 'Ático en Málaga Este', 'apartamento', 'Ático de lujo con vistas al mar y acabados premium', 'Málaga', 'Avenida de Salvador Allende', '25', '29018' , POINT(36.7160, -4.3903), 150, 3, 2, 2200.00, 'available'),
			(4, 'Finca con viñedo en Jerez', 'casa', 'Finca vinícola con bodega y casa señorial', 'Jerez', 'Carretera de Arcos', 'km 8.5', '11408' , POINT(36.6815, -6.1204), 600, 8, 5, 4500.00, 'unavailable'),
			(5, 'Piso moderno en Bilbao', 'piso', 'Piso nuevo con certificado energético A', 'Bilbao', 'Calle de Ercilla', '32', '48011' , POINT(43.2603, -2.9334), 88, 2, 2, 1450.00, 'available'),
			(5, 'Chalet en Getxo', 'casa', 'Chalet independiente con jardín y piscina climatizada', 'Getxo', 'Avenida de Zugazarte', '50', '48930' , POINT(43.3268, -3.0067), 220, 4, 3, 2800.00, 'rented'),
			(5, 'Estudio en Casco Viejo', 'apartamento', 'Estudio completamente renovado en edificio histórico', 'Bilbao', 'Calle de la Pelota', '8', '48005' , POINT(43.2569, -2.9236), 42, 1, 1, 900.00, 'available'),
			(5, 'Ático en Abandoibarra', 'apartamento', 'Ático con terraza y vistas a la ría', 'Bilbao', 'Alameda Mazarredo', '66', '48009' , POINT(43.2678, -2.9356), 110, 2, 2, 2100.00, 'pending'),
			(5, 'Caserío vasco restaurado', 'casa', 'Caserío del siglo XVIII con 2 hectáreas de terreno', 'Gernika', 'Barrio de Forua', '14', '48315' , POINT(43.3245, -2.6723), 350, 5, 4, 2400.00, 'available'),
			(5, 'Duplex en Santurtzi', 'duplex', 'Duplex con jardín privado y parking doble', 'Santurtzi', 'Calle de Mamariga', '12', '48980' , POINT(43.3291, -3.0315), 130, 3, 2, 1750.00, 'available'),
			(5, 'Local comercial en Indautxu', 'otro', 'Local comercial con licencia de cafetería', 'Bilbao', 'Calle de Ercilla', '22', '48009' , POINT(43.2638, -2.9389), 85, 0, 1, 1600.00, 'unavailable'),
			(6, 'Finca de lujo en Mallorca', 'casa', 'Villa moderna con acceso privado al mar', 'Calvià', 'Urbanización Son Vida', 's/n', '07181' , POINT(39.5662, 2.6148), 450, 6, 5, 6500.00, 'available'),
			(6, 'Apartamento en Palma', 'apartamento', 'Apartamento de diseño en primera línea de mar', 'Palma', 'Paseo Marítimo', '15', '07014' , POINT(39.5696, 2.6502), 95, 2, 2, 2300.00, 'rented'),
			(6, 'Casa de campo en Sóller', 'casa', 'Casa tradicional mallorquina con huerto y piscina', 'Sóller', 'Camí des Bàrcels', '7', '07100' , POINT(39.7653, 2.7154), 280, 4, 3, 2900.00, 'available'),
			(6, 'Ático con vistas al puerto', 'apartamento', 'Ático de lujo con terraza de 60m²', 'Palma', 'Avenida de Gabriel Roca', '32', '07015' , POINT(39.5624, 2.6231), 180, 3, 3, 3500.00, 'pending'),
			(6, 'Finca con viñedo en Binissalem', 'casa', 'Finca vinícola con bodega y alojamiento turístico', 'Binissalem', 'Camí de Muntanya', '14', '07350' , POINT(39.6833, 2.8500), 600, 8, 6, 4800.00, 'available'),
			(6, 'Estudio en el centro histórico', 'apartamento', 'Estudio completamente reformado en zona peatonal', 'Palma', 'Calle de la Almudaina', '5', '07001' , POINT(39.5693, 2.6492), 48, 1, 1, 1300.00, 'available');
		`;
		await pool.execute(querySeed);
		console.log('32 usuarios de SEED insertados correctamente.');
		querySeed = `
		INSERT INTO contracts (tenantId, propertyId, startDate, endDate, status) VALUES
			(7, 1, '2023-01-15', '2024-01-14', 'ongoing'),
			(8, 2, '2022-09-01', '2023-08-31', 'finished'),
			(4, 3, '2023-06-01', NULL, 'pending'),
			(9, 4, '2023-03-01', '2024-02-28', 'ongoing'),
			(10, 5, '2023-07-15', '2024-07-14', 'approved'),
			(11, 6, '2022-12-01', '2023-11-30', 'finished'),
			(1, 7, '2023-02-01', '2025-01-31', 'ongoing'),
			(7, 8, '2023-04-15', '2024-04-14', 'ongoing'),
			(8, 9, '2023-08-01', NULL, 'pending'),
			(8, 10, '2022-11-01', '2023-10-31', 'finished'),
			(10, 11, '2023-05-15', '2024-05-14', 'approved'),
			(11, 12, '2023-09-01', '2025-08-31', 'ongoing'),
			(4, 13, '2023-01-01', '2023-12-31', 'canceled'),
			(5, 14, '2023-10-01', '2024-09-30', 'approved'),
			(6, 15, '2023-07-01', '2024-06-30', 'ongoing'),
			(7, 16, '2023-03-20', NULL, 'pending'),
			(8, 17, '2023-06-15', '2024-06-14', 'ongoing'),
			(9, 18, '2023-04-01', '2024-03-31', 'approved'),
			(10, 19, '2022-08-01', '2023-07-31', 'finished'),
			(1, 20, '2023-09-01', '2025-08-31', 'approved'),
			(2, 21, '2023-05-01', '2024-04-30', 'ongoing'),
			(3, 22, '2023-02-15', NULL, 'pending'),
			(4, 23, '2023-07-01', '2024-06-30', 'ongoing'),
			(6, 24, '2023-01-10', '2023-12-31', 'canceled'),
			(7, 25, '2023-04-01', '2024-03-31', 'approved'),
			(8, 26, '2023-08-15', '2024-08-14', 'ongoing'),
			(9, 27, '2023-06-01', '2024-05-31', 'ongoing'),
			(10, 28, '2023-03-15', '2025-03-14', 'approved'),
			(11, 29, '2023-09-01', NULL, 'pending'),
			(1, 30, '2023-05-01', '2024-04-30', 'ongoing'),
			(2, 31, '2023-02-10', '2023-12-31', 'canceled'),
			(3, 32, '2023-07-15', '2024-07-14', 'approved');
		`;
		await pool.execute(querySeed);
		console.log('32 contratos de SEED insertados correctamente.');
		querySeed = `
		INSERT INTO reviews (reviewerId, reviewedId, contractId, rating, createdAt, comment) VALUES
			(9, 2, 1, 5, '2023-02-01', 'Excelente comunicación y flexibilidad en las visitas. El apartamento superó las expectativas'),
			(2, 9, 1, 5, '2023-02-05', 'Inquilina responsable y puntual en los pagos. Recomendada totalmente'),
			(10, 2, 5, 4, '2023-08-01', 'Buen mantenimiento del loft aunque el vecindario es algo ruidoso'),
			(2, 10, 5, 4, '2023-08-05', 'Correcto en los pagos pero algo descuidado con la limpieza al final'),
			(1, 3, 7, 5, '2023-03-15', 'Casa rural impecable, atención personalizada del propietario'),
			(2, 1, 7, 5, '2023-03-20', 'Inquilino modelo, trato profesional y sin incidencias'),
			(7, 3, 8, 3, '2023-05-10', 'El estudio es funcional pero falta mantenimiento en electrodomésticos'),
			(3, 7, 8, 4, '2023-05-12', 'Correcta en general, aunque con retrasos ocasionales en pagos'),
			(11, 3, 11, 5, '2023-06-01', 'Piso muy bien ubicado y propietario siempre disponible'),
			(3, 11, 11, 5, '2023-06-05', 'Excelente inquilino, mantenimiento perfecto de la propiedad'),
			(5, 4, 14, 4, '2023-11-01', 'Cortijo espectacular aunque con algunos detalles de mantenimiento'),
			(4, 5, 14, 5, '2023-11-05', 'Trato exquisito y gran cuidado de la propiedad'),
			(6, 4, 15, 2, '2023-08-01', 'Problemas con la calefacción que no se resolvieron a tiempo'),
			(4, 6, 15, 3, '2023-08-05', 'Pagos regulares pero poco cuidadoso con el mobiliario'),
			(8, 4, 17, 5, '2023-07-01', 'Experiencia increíble en la casa rural, todo perfecto'),
			(4, 8, 17, 4, '2023-07-05', 'Buen inquilino aunque con alguna visita inesperada'),
			(1, 5, 20, 5, '2023-10-01', 'Piso moderno con todas las comodidades necesarias'),
			(5, 1, 20, 5, '2023-10-05', 'Administrador profesional y resolutivo'),
			(2, 5, 21, 4, '2023-06-01', 'Chalet acogedor aunque el jardín necesita mejor mantenimiento'),
			(5, 2, 21, 5, '2023-06-05', 'Propietaria ejemplar, comunicación fluida'),
			(4, 5, 23, 5, '2023-08-01', 'Ático con vistas impresionantes y buena distribución'),
			(5, 4, 23, 5, '2023-08-05', 'Inquilina perfecta, recomendable 100%'),
			(9, 6, 27, 4, '2023-07-01', 'Finca increíble pero difícil acceso para servicios'),
			(6, 9, 27, 5, '2023-07-05', 'Cuidado excepcional de la propiedad'),
			(1, 6, 30, 3, '2023-06-01', 'Ático con potencial pero necesita actualización'),
			(6, 1, 30, 5, '2023-06-05', 'Profesional y cumplidor en todos los aspectos'),
			(3, 6, 32, 5, '2023-08-01', 'Estudio céntrico y bien equipado'),
			(6, 3, 32, 4, '2023-08-05', 'Buen inquilino aunque con alguna reforma no autorizada');
		`;
		await pool.execute(querySeed);
		console.log('28 reseñas de SEED insertados correctamente.');
		querySeed = `
		INSERT INTO favs (userId, propertyId) VALUES
			(1, 1),
			(1, 2),
			(1, 3),
			(1, 4),
			(1, 5),
			(1, 6),
			(1, 7),
			(1, 8),
			(1, 9),
			(1, 10),
			(1, 11),
			(1, 12),
			(1, 13),
			(1, 14),
			(1, 15),
			(1, 16),
			(1, 17),
			(1, 18),
			(1, 19),
			(1, 20),
			(1, 21),
			(1, 22),
			(1, 23),
			(1, 24),
			(1, 25),
			(1, 26),
			(1, 27),
			(1, 28),
			(1, 29),
			(1, 30),
			(1, 31),
			(1, 32);
		`;
		await pool.execute(querySeed);
		console.log('32 favoritos de SEED insertados correctamente.');
		querySeed = `
		INSERT INTO notifications (userId, propertyId, message, type, status, isRead, createdAt, readAt) VALUES
			(2, 1, 'La propiedad "Apartamento céntrico en Malasaña" ha sido aprobada', 'property', 'approved', true, '2023-10-15 09:00:00', '2023-10-15 10:30:00'),
			(2, 1, 'La propiedad "Apartamento céntrico en Malasaña" ha sido rechazada', 'property', 'rejected', false, '2023-10-15 10:30:00', NULL),
			(2, 1, 'Sara Navarro solicitó visita para el 01/11/2023', 'visit', 'requested', true, '2023-10-20 14:00:00', '2023-10-20 16:15:00'),
			(7, 1, 'Solicitaste visita para el 01/11/2023', 'visit', 'requested', true, '2023-10-20 14:00:00', '2023-10-20 15:45:00'),
			(7, 1, 'La visita de Sara Navarro ha sido aprobada', 'visit', 'approved', true, '2023-10-20 16:15:00', '2023-10-20 17:00:00'),
			(2, 1, 'La visita de Sara Navarro ha sido rechazada', 'visit', 'rejected', false, '2023-10-20 17:00:00', NULL),
			(7, 1, 'Reseña publicada en perfil de María Gómez', 'review', 'approved', true, '2023-10-20 17:00:00', '2023-10-20 18:00:00'),
			(2, 1, 'Sara Navarro te dejó 5 ⭐ por el apartamento', 'review', 'approved', true, '2023-10-20 18:00:00', '2023-10-20 19:00:00'),
			(7, 1, 'Reseña rechazada: Contenido inapropiado', 'review', 'rejected', false, '2023-10-20 19:00:00', NULL),
			(2, 1, 'Contrato finalizado para "Apartamento céntrico en Malasaña"', 'contract', 'approved', true, '2023-11-30 18:00:00', '2023-12-01 10:15:00'),
			(7, 1, 'El contrato de Sara Navarro ha sido aprobado', 'contract', 'approved', true, '2023-11-30 18:00:00', '2023-12-01 10:15:00');
		`;
		await pool.execute(querySeed);
		console.log('11 notificaciones de SEED insertados correctamente.');
		querySeed = `
		INSERT INTO blocks (userId, propertyId, reason) VALUES
			(2, 31, 'Usuario bloqueado por contrato cancelado'),
			(5, 24, 'Usuario bloqueado por contrato cancelado'),
			(6, 30, 'Usuario bloqueado por contrato cancelado');
		`;
		await pool.execute(querySeed);
		console.log('3 usuarios bloqueados de SEED insertados correctamente.');
		querySeed = `
		INSERT INTO images (propertyId, imageUrl, sortIndex, fileType) VALUES
		(1, 'seed_1_1.png', 1, 'image'),
		(1, 'seed_1_2.png', 2, 'image'),
		(1, 'seed_1_3.png', 3, 'image'),
		(1, 'seed_1_4.png', 4, 'image'),
		(1, 'seed_1_5.png', 5, 'image'),
		(1, 'seed_1_6.mp4', 6, 'video'),
		(1, 'seed_1_7.png', 7, 'image'),
		(1, 'seed_1_8.png', 8, 'image'),
		(1, 'seed_1_9.png', 9, 'image'),
		(2, 'seed_2_1.png', 1, 'image'),
		(2, 'seed_2_2.png', 2, 'image'),
		(3, 'seed_3_1.png', 1, 'image'),
		(3, 'seed_3_2.png', 2, 'image'),
		(3, 'seed_3_3.png', 3, 'image'),
		(3, 'seed_3_4.png', 4, 'image'),
		(4, 'seed_4_1.png', 1, 'image'),
		(4, 'seed_4_2.png', 2, 'image'),
		(4, 'seed_4_3.png', 3, 'image'),
		(5, 'seed_5_1.png', 1, 'image'),
		(5, 'seed_5_2.png', 2, 'image'),
		(6, 'seed_6_1.png', 1, 'image'),
		(7, 'seed_7_1.png', 1, 'image'),
		(7, 'seed_7_2.png', 2, 'image'),
		(8, 'seed_8_1.png', 1, 'image'),
		(8, 'seed_8_2.png', 2, 'image'),
		(8, 'seed_8_3.png', 3, 'image'),
		(9, 'seed_9_1.png', 1, 'image'),
		(11, 'seed_11_1.png', 1, 'image'),
		(11, 'seed_11_2.png', 2, 'image'),
		(11, 'seed_11_3.png', 3, 'image'),
		(12, 'seed_12_1.png', 1, 'image'),
		(12, 'seed_12_2.png', 2, 'image'),
		(13, 'seed_13_1.png', 1, 'image'),
		(13, 'seed_13_2.png', 2, 'image'),
		(13, 'seed_13_3.png', 3, 'image'),
		(13, 'seed_13_4.png', 4, 'image'),
		(13, 'seed_13_5.mp4', 5, 'video'),
		(14, 'seed_14_1.png', 1, 'image'),
		(14, 'seed_14_2.png', 2, 'image'),
		(15, 'seed_15_1.png', 1, 'image'),
		(16, 'seed_16_1.png', 1, 'image'),
		(17, 'seed_17_1.png', 1, 'image'),
		(18, 'seed_18_1.png', 1, 'image'),
		(19, 'seed_19_1.png', 1, 'image'),
		(19, 'seed_19_2.png', 2, 'image'),
		(20, 'seed_20_1.png', 1, 'image'),
		(21, 'seed_21_1.png', 1, 'image'),
		(21, 'seed_21_2.png', 2, 'image'),
		(22, 'seed_22_1.png', 1, 'image'),
		(22, 'seed_22_2.png', 2, 'image'),
		(23, 'seed_23_1.png', 1, 'image'),
		(24, 'seed_24_1.png', 1, 'image'),
		(25, 'seed_25_1.png', 1, 'image'),
		(26, 'seed_26_1.png', 1, 'image'),
		(26, 'seed_26_2.png', 2, 'image'),
		(26, 'seed_26_3.png', 3, 'image'),
		(26, 'seed_26_4.png', 4, 'image'),
		(26, 'seed_26_5.mp4', 5, 'video'),
		(27, 'seed_27_1.png', 1, 'image'),
		(28, 'seed_28_1.png', 1, 'image'),
		(28, 'seed_28_2.png', 2, 'image'),
		(29, 'seed_29_1.png', 1, 'image'),
		(29, 'seed_29_2.png', 2, 'image'),
		(30, 'seed_30_1.png', 1, 'image'),
		(31, 'seed_31_1.png', 1, 'image'),
		(32, 'seed_32_1.png', 1, 'image'),
		(32, 'seed_32_2.png', 2, 'image');
		`;
		await pool.execute(querySeed);
		console.log('64 imagenes y 3 videos de SEED insertados correctamente.');
		console.log(
			`Datos SEED insertados:\n\n- 11 usuarios\n- 32 propiedades\n- 32 contratos\n- 26 reseñas\n- 64 imágenes y 3 videos\n- 40 favoritos\n- 11 notificaciones\n- 3 usuarios bloqueados`
		);

		for (const user of users) {
			if (user.email !== '') {
				const hashedPhone = await bcrypt.hash(user.phone, 10);
				const hashedPassword = await bcrypt.hash(user.password, 10);

				const query = `INSERT INTO users (name, lastName, legalId, email, password, phone, bio, role, isEmailVerified, isDocsVerified) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1, 1)`;
				const values = [
					user.name,
					user.lastName,
					user.legalId,
					user.email,
					hashedPassword,
					hashedPhone,
					user.bio,
					user.role,
				];
				//console.log(JSON.stringify(values));
				await pool.execute(query, values);
				console.log(
					`Usuario ${user.name} ('${user.role}') insertado correctamente.`
				);
			}
		}
		console.log(
			`Semillas de datos de usuarios en .ENV insertadas correctamente.`
		);

		process.exit(0);
	} catch (error) {
		console.error(`Error insertando usuarios:\n`, error);
		process.exit(1);
	}
};

seedUsers();
