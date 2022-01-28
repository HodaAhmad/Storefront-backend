/* Replace with your SQL commands */
CREATE TABLE users (
    id SERIAL PRIMARY KEY, 
    firstName VARCHAR(40), 
    lastName VARCHAR(40), 
    password_digest VARCHAR(100)
    );