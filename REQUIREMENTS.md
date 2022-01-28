# API Requirements
DATABASE SCHEMA

Users table CREATE TABLE users ( id SERIAL PRIMARY KEY, firstName VARCHAR(40), lastName VARCHAR(40), password_digest VARCHAR(100) );
Product table CREATE TABLE product ( id SERIAL PRIMARY KEY, name VARCHAR(40), price integer, category VARCHAR(100) );
Orders table CREATE TABLE orders ( id SERIAL PRIMARY KEY, status VARCHAR(25), user_id INTEGER REFERENCES users(id) NOT NULL );
ENDPOINTS

User endpoints

/api/users (GET) index
/api/users/:id (GET) show
/api/users (POST) create
Products endpoints

/api/products (GET) index
/api/products (POST) create
Orders endpoints

/api/orders (GET) index
/api/userorders/:id (GET) getUserOrders
