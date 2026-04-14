-- 1. Insertar Marcas
INSERT INTO brand (name) VALUES 
('Logitech'), ('Keychron'), ('LG'), ('Sony'), ('Raspberry Pi');

-- 2. Insertar Categorías
INSERT INTO category (name) VALUES 
('perifericos'), ('oficina'), ('ergonomia'), ('teclados'), 
('mecanicos'), ('bluetooth'), ('monitores'), ('gaming'), 
('audio'), ('noise-cancelling'), ('componentes'), ('desarrollo'), ('linux');

-- 3. Insertar Gadgets (Usando IDs de marca: Logitech=1, Keychron=2, LG=3, Sony=4, Raspberry=5)
INSERT INTO gadget (id, name, price, stock, brand_id) VALUES 
('d1a2b3c4-e5f6-7g8h-9i0j-k1l2m3n4o5p6', 'Logitech MX Master 3S', 99.99, 12, 1),
('a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p7', 'Keychron K2 V2', 85.00, 3, 2),
('b2c3d4e5-f6g7-8h9i-0j1k-2l3m4n5o6p7q', 'Monitor LG UltraGear 27"', 249.50, 8, 3),
('c3d4e5f6-g7h8-9i0j-k1l2-m3n4o5p6q7r', 'Sony WH-1000XM5', 320.00, 2, 4),
('e5f6g7h8-i9j0-k1l2-m3n4-o5p6q7r8s9t', 'Raspberry Pi 5 8GB', 80.00, 25, 5);

-- 4. Relacionar Gadgets con Categorías (Tabla Intermedia)
INSERT INTO gadget_categories (gadget_id, category_id) VALUES 
-- Logitech MX Master (perifericos=1, oficina=2, ergonomia=3)
('d1a2b3c4-e5f6-7g8h-9i0j-k1l2m3n4o5p6', 1),
('d1a2b3c4-e5f6-7g8h-9i0j-k1l2m3n4o5p6', 2),
('d1a2b3c4-e5f6-7g8h-9i0j-k1l2m3n4o5p6', 3),
-- Keychron (teclados=4, mecanicos=5, bluetooth=6)
('a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p7', 4),
('a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p7', 5),
('a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p7', 6),
-- Sony (audio=9, bluetooth=6, noise-cancelling=10)
('c3d4e5f6-g7h8-9i0j-k1l2-m3n4o5p6q7r', 9),
('c3d4e5f6-g7h8-9i0j-k1l2-m3n4o5p6q7r', 6),
('c3d4e5f6-g7h8-9i0j-k1l2-m3n4o5p6q7r', 10);