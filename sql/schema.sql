-- Practice database (SQLite dialect, 99% compatible with PostgreSQL/MySQL for these exercises)
CREATE TABLE customers (
  id        INTEGER PRIMARY KEY,
  name      TEXT NOT NULL,
  city      TEXT NOT NULL,
  joined_on TEXT NOT NULL            -- ISO date 'YYYY-MM-DD'
);

CREATE TABLE products (
  id       INTEGER PRIMARY KEY,
  name     TEXT NOT NULL,
  category TEXT NOT NULL,
  price    REAL NOT NULL
);

CREATE TABLE orders (
  id          INTEGER PRIMARY KEY,
  customer_id INTEGER NOT NULL REFERENCES customers(id),
  status      TEXT NOT NULL CHECK (status IN ('completed', 'pending', 'cancelled')),
  ordered_on  TEXT NOT NULL
);

CREATE TABLE order_items (
  order_id   INTEGER NOT NULL REFERENCES orders(id),
  product_id INTEGER NOT NULL REFERENCES products(id),
  quantity   INTEGER NOT NULL,
  unit_price REAL NOT NULL,          -- price paid (can differ from products.price)
  PRIMARY KEY (order_id, product_id)
);

INSERT INTO customers (id, name, city, joined_on) VALUES
  (1, 'Ana Torres',      'Cancún',      '2024-01-15'),
  (2, 'Luis Pérez',      'Mérida',      '2024-03-02'),
  (3, 'Sofía Ramírez',   'Cancún',      '2024-05-20'),
  (4, 'Diego Hernández', 'Monterrey',   '2025-01-10'),
  (5, 'Valeria Cruz',    'Guadalajara', '2025-02-28'),
  (6, 'Jorge Molina',    'Mérida',      '2025-06-05');

INSERT INTO products (id, name, category, price) VALUES
  (1,  'Mechanical Keyboard',         'Electronics', 89.90),
  (2,  'USB-C Hub',                   'Electronics', 45.00),
  (3,  'Noise-Cancelling Headphones', 'Electronics', 199.99),
  (4,  'Ergonomic Chair',             'Furniture',   249.00),
  (5,  'Standing Desk',               'Furniture',   420.00),
  (6,  'Desk Lamp',                   'Furniture',   35.50),
  (7,  'Coffee Beans 1kg',            'Grocery',     18.75),
  (8,  '4K Monitor',                  'Electronics', 329.00),
  (9,  'Notebook Pack',               'Stationery',  9.99),
  (10, 'Gel Pens (12)',               'Stationery',  7.49);

INSERT INTO orders (id, customer_id, status, ordered_on) VALUES
  (1, 1, 'completed', '2025-07-01'),
  (2, 1, 'completed', '2025-08-15'),
  (3, 2, 'completed', '2025-07-20'),
  (4, 3, 'pending',   '2025-09-01'),
  (5, 4, 'completed', '2025-08-02'),
  (6, 4, 'cancelled', '2025-08-10'),
  (7, 5, 'completed', '2025-09-12'),
  (8, 3, 'completed', '2025-09-18');

INSERT INTO order_items (order_id, product_id, quantity, unit_price) VALUES
  (1, 1, 1, 89.90), (1, 2, 2, 45.00),
  (2, 7, 3, 18.75),
  (3, 4, 1, 249.00), (3, 6, 1, 35.50),
  (4, 3, 1, 199.99),
  (5, 8, 2, 329.00), (5, 1, 1, 85.00),
  (6, 5, 1, 420.00),
  (7, 7, 2, 18.75), (7, 6, 2, 35.50),
  (8, 2, 1, 45.00);
