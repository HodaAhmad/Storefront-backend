/* Replace with your SQL commands */
CREATE TABLE order_product (
    id SERIAL PRIMARY KEY,
    quantity INTEGER,
    product_id INTEGER REFERENCES product(id) NOT NULL,
    order_id INTEGER REFERENCES orders(id) NOT NULL
    );