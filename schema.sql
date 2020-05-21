/*
  See foreign key creation at the bottom, the plan is to load initial data
  without constraints to speed up the load process, then put in the constraints.
*/


DROP TABLE IF EXISTS products;
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR,
  price FLOAT,
  sku VARCHAR,
  viewcount INT,
  created_at TIMESTAMP,
);

DROP TABLE IF EXISTS locations;
CREATE TABLE locations (
  id SERIAL PRIMARY KEY,
  street_number INT,
  street_number_suffix VARCHAR, /* A-Z, 1/3, etc.  */
  street_name VARCHAR,
  street_type VARCHAR, /* Road, Blvd etc */
  street_direction VARCHAR, /* NE, SW */
  address_type VARCHAR, /* "building", "suite", etc. */
  municipality VARCHAR, /* "littleton", "aurora" in Denver */
  metroplex VARCHAR, /* Denver */
  governing_district VARCHAR, /* "California", or a province in another country, etc. */
  postal_code VARCHAR, /* American zipcodes but also other nations which may not be striclty numeric */
  country VARCHAR,
  latitude FLOAT,
  longitude FLOAT
);

/*
   A later point of investigation would be "do I need tables for cities, metroplexes, districts",
   however were I to do that I'd probably have to do massive joins just to check for product 
   availability. 
*/

DROP TABLE IF EXISTS stores;
CREATE TABLE stores (
  id SERIAL PRIMARY KEY,
  name VARCHAR,
  street VARCHAR,
  location_id INT,
);

DROP TABLE IF EXISTS products_stores;
CREATE TABLE products_stores (
  id SERIAL PRIMARY KEY,
  product_id INT,
  store_id INT,
  quantity_in_stock INT,
  order_interval INT /* amount of seconds */
  created_at TIMESTAMP,
);

DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id INT SERIAL PRIMARY KEY
);

DROP TABLE IF EXISTS carts;
CREATE TABLE IF NOT EXISTS carts (
  id SERIAL PRIMARY KEY,
  user_id INT,
  created_at TIMESTAMP,
);

CREATE TABLE IF NOT EXISTS wishlists (
  id SERIAL PRIMARY KEY,
  user_id INT,
  product_id INT
);

-- carts


-- stores
ALTER TABLE stores DROP CONSTRAINT IF EXISTS fk_location_id;
ALTER TABLE stores ADD CONSTRAINT fk_location_id FOREIGN KEY (location_id) REFERENCES locations ON DELETE CASCADE;

-- product availability
ALTER TABLE products_stores DROP CONSTRAINT IF EXISTS fk_product_id;
ALTER TABLE products_stores DROP CONSTRAINT IF EXISTS fk_store_id;
ALTER TABLE products_stores ADD CONSTRAINT fk_product_id FOREIGN KEY (product_id) REFERENCES products ON DELETE CASCADE;
ALTER TABLE products_stores ADD CONSTRAINT fk_store_id FOREIGN KEY (store_id) REFERENCES stores ON DELETE CASCADE;

-- wishlists 
ALTER TABLE products_stores DROP CONSTRAINT IF EXISTS fk_product_id;
ALTER TABLE products_stores DROP CONSTRAINT IF EXISTS fk_user_id;
ALTER TABLE products_stores ADD CONSTRAINT fk_product_id FOREIGN KEY (product_id) REFERENCES products ON DELETE CASCADE;
ALTER TABLE products_stores ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES stores ON DELETE CASCADE;
