
const constraints = `ALTER TABLE carts_products DROP CONSTRAINT IF EXISTS fk_product_id;
ALTER TABLE carts_products ADD CONSTRAINT fk_product_id FOREIGN KEY (product_id) REFERENCES products (id);
ALTER TABLE carts_products DROP CONSTRAINT IF EXISTS fk_user_id;
ALTER TABLE carts_products ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users (id);
ALTER TABLE carts_products ADD CONSTRAINT unique_cart_products UNIQUE (user_id, product_id);

ALTER TABLE stores DROP CONSTRAINT IF EXISTS fk_location_id;
ALTER TABLE stores ADD CONSTRAINT fk_location_id FOREIGN KEY (location_id) REFERENCES locations ON DELETE CASCADE;
ALTER TABLE stores DROP CONSTRAINT IF EXISTS unique_street_addresses; 
ALTER TABLE stores ADD CONSTRAINT unique_street_addresses UNIQUE ( street_number, street_number_suffix, street_name, street_type, street_direction, address_type);

ALTER TABLE locations DROP CONSTRAINT IF EXISTS unique_latlongs; 
ALTER TABLE locations ADD CONSTRAINT unique_latlongs UNIQUE (latitude, longitude);

ALTER TABLE products_stores DROP CONSTRAINT IF EXISTS fk_product_id;
ALTER TABLE products_stores DROP CONSTRAINT IF EXISTS fk_store_id;
ALTER TABLE products_stores ADD CONSTRAINT fk_product_id FOREIGN KEY (product_id) REFERENCES products ON DELETE CASCADE;
ALTER TABLE products_stores ADD CONSTRAINT fk_store_id FOREIGN KEY (store_id) REFERENCES stores ON DELETE CASCADE;
ALTER TABLE products_stores DROP CONSTRAINT IF EXISTS unique_inventories;
ALTER TABLE products_stores ADD CONSTRAINT unique_inventories UNIQUE (product_id, store_id);

ALTER TABLE wishlists DROP CONSTRAINT IF EXISTS fk_product_id;
ALTER TABLE wishlists DROP CONSTRAINT IF EXISTS fk_user_id;
ALTER TABLE wishlists ADD CONSTRAINT fk_product_id FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE;
ALTER TABLE wishlists ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE;
ALTER TABLE wishlists ADD CONSTRAINT unique_wishlist_entries UNIQUE (user_id, product_id);
`;

module.exports = constraints;