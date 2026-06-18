CREATE DATABASE quan_ly_ban_hang
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE quan_ly_ban_hang;

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    quantity INT NOT NULL
);

INSERT INTO products (name, description, price, quantity)
VALUES
('Ao thun', 'Ao thun cotton', 150000, 20),
('Quan jean', 'Quan jean xanh', 300000, 10);
