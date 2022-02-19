# API Requirements
## DATABASE SCHEMA

Users table CREATE TABLE users ( id SERIAL PRIMARY KEY, firstName VARCHAR(40), lastName VARCHAR(40), password_digest VARCHAR(100) );

Product table CREATE TABLE product ( id SERIAL PRIMARY KEY, name VARCHAR(40), price integer, category VARCHAR(100) );

Orders table CREATE TABLE orders ( id SERIAL PRIMARY KEY, status VARCHAR(25), user_id INTEGER REFERENCES users(id) NOT NULL );

Order Product table CREATE TABLE order_product (
    id SERIAL PRIMARY KEY,
    quantity INTEGER,
    product_id INTEGER REFERENCES product(id) NOT NULL,
    order_id INTEGER REFERENCES orders(id) NOT NULL
    );

## ENDPOINTS

### User endpoints

/users (GET) index
/users/:id (GET) show
/users (POST) create

### Products endpoints

/products (GET) index
/products/:id (GET) show
/products (POST) create

Orders endpoints

/orders (GET) index
/userorders/:id (GET) getUserOrders
/orders (POST) create
