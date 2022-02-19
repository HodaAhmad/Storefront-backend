# Storefront Backend Project

## Prerequisites

node version 12 or 10
yarn
npm

## Configuration

* Run yarn to get dependencies
* Create the Database as in env description below
* Make env file
* Follow REQUIREMENT file to see endpoints info & Database schema
* Insall postgresql
* Connect to postgres and create database shopping as well as create database shopping_test
* run yarn test to test models and endpoints

### env file instructions

POSTGRES_HOST=127.0.0.1
POSTGRES_DB=shopping
POSTGRES_DB_TEST=shopping_test
POSTGRES_USER=shopping_user
POSTGRES_PASSWORD=password
ENV=dev
BCRYPT_PASSWORD=speak-friend-and-enter
SALT_ROUNDS=10
TOKEN_SECRET=great123

## Database Setup

### Host: 127.0.0.1 
###  Port: 5432 
### Database user: "shopping_user" 
### Database name: "shopping" 
### Test database name: "shopping_test"

to set up database:

CREATE USER shopping_user WITH PASSWORD 'password'; CREATE DATABASE shopping; GRANT ALL PRIVILEGES ON DATABASE shopping TO shopping_user; CREATE DATABASE shopping_test; GRANT ALL PRIVILEGES ON DATABASE shopping_test TO shopping_user;

#### Application configured to run on port 3000
