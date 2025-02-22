USE casalinkdblimpia;

-- Insertar un usuario sin propiedades
INSERT INTO users (name, email) VALUES ('Carlos Pérez', 'carlos@example.com');

-- Verificar que el usuario NO es propietario
SELECT * FROM users WHERE email = 'carlos@example.com';

-- Insertar una propiedad para ese usuario
INSERT INTO properties (ownerId, propertyTitle, propertyType, description, zipCode, bedrooms, bathrooms, price) 
VALUES (LAST_INSERT_ID(), 'Bonito apartamento', 'apartamento', 'Céntrico y acogedor', '28001', 2, 1, 1200.00);

-- Insertar otra propiedad para ese usuario
INSERT INTO properties (ownerId, propertyTitle, propertyType, description, zipCode, bedrooms, bathrooms, price) 
VALUES (LAST_INSERT_ID(), 'Bonita casa', 'casa', 'Céntrica y acogedora', '28001', 5, 2, 1800.00);

-- Verificar que `isOwner` ahora es TRUE
SELECT * FROM users WHERE email = 'carlos@example.com';

-- Eliminar la ultima propiedad del usuario
DELETE FROM properties WHERE id = 2;

-- Verificar que `isOwner` sigue siendo TRUE
SELECT * FROM users WHERE email = 'carlos@example.com';

-- Eliminar la única propiedad del usuario
DELETE FROM properties WHERE id = 1;

-- Verificar que `isOwner` vuelve a ser FALSE
SELECT * FROM users WHERE email = 'carlos@example.com';