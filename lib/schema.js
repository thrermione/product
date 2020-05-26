const schema = `DROP TABLE IF EXISTS products;
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR,
  price FLOAT,
  sku VARCHAR,
  viewcount INT,
  created_at INT
);

DROP TABLE IF EXISTS locations;
CREATE TABLE locations (
  id SERIAL PRIMARY KEY,
  municipality VARCHAR, /* "littleton", "aurora" in Denver */
  metroplex VARCHAR, /* Denver */
  governing_district VARCHAR, /* "California", or a province in another country, etc. */
  postal_code VARCHAR, /* American zipcodes but also other nations which may not be striclty numeric */
  country VARCHAR,
  latitude FLOAT,
  longitude FLOAT
);

DROP TABLE IF EXISTS stores;
CREATE TABLE stores (
  id SERIAL PRIMARY KEY,
  name VARCHAR,
  street_number INT,
  street_number_suffix VARCHAR, /* A-Z, 1/3, etc.  */
  street_name VARCHAR,
  street_type VARCHAR, /* Road, Blvd etc */
  street_direction VARCHAR, /* NE, SW */
  address_type VARCHAR, /* "building", "suite", etc. */
  location_id INT
);

DROP TABLE IF EXISTS products_stores;
CREATE TABLE products_stores (
  id SERIAL PRIMARY KEY,
  product_id INT,
  store_id INT,
  quantity_in_stock INT,
  order_interval INT, /* amount of seconds */
  created_at INT
);

DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  session_hash VARCHAR
);

DROP TABLE IF EXISTS carts;
CREATE TABLE IF NOT EXISTS carts (
  id SERIAL PRIMARY KEY,
  user_id INT,
  created_at INT
);

DROP TABLE IF EXISTS carts_products;
CREATE TABLE IF NOT EXISTS carts_products (
  id SERIAL PRIMARY KEY,
  product_id INT,
  cart_id INT,
  quantity INT,
  added_on INT
);

DROP TABLE IF EXISTS wishlists;
CREATE TABLE wishlists (
  id SERIAL PRIMARY KEY,
  user_id INT,
  product_id INT
);

`;

module.exports = schema;