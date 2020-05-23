const fs = require('fs');
const csv = require('csv-write-stream'); 
const faker = require('faker');

// create a lookup table to make, idk, 1 million "random" numbers.
let lut10 = [];
let luti = 0;
for ( let i = 0; i < 1e6; i ++ ) {
  lut10.push(Math.random()*9|0)
}

const rand10 = function() {
  if( luti === lut10.length ) {
    luti = 0;
  }
  return lut10[++luti];
}

const pickrand = function( selection ){
  return selection[rand10()];
}

const streetSuffix = function() {
  if( rand10() === 1 ) {
    return pickrand(['1/2', '1/3', 'A', 'B', 'C', '3/4', 'D', '-100', '1/2', '1/2']);
  }
  return null;
}

const streetDirection = function() {
  if( rand10() < 3 ) {
    return pickrand(['N', 'E', 'S', 'W', 'NE', 'NW', 'SE', 'SW', 'North', 'West']);
  }
  return null;  
}

const streetType = function() {
  if( rand10() < 4 ) {
    return pickrand(['Ave', 'Blvd', 'Lane', 'Circle', 'Avenue', 'Lane', 'Drive', 'Court', 'Circuit', 'Way']);
  }
  return 'Street';  
}

const addressType = function() {
  if( rand10() === 1 ) {
    return pickrand(['Suite', 'Building', 'Suite', 'Building', 'Suite', 'Building', 'Suite', 'Building', 'Suite', 'Building']);
  }
  return null;  
}

const products = csv();
products.pipe(fs.createWriteStream('products.csv'));
// spinal tap to 10M later
for( var i = 1; i < 10000000; i++ ) {
  products.write({
    id: i,
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    sku: 1580255382 + i,
    view_count: 0,
    created_at: 1580255382 + i,
  });
}
products.end();

const stores = csv();
stores.pipe(fs.createWriteStream('stores.csv'));
// Crank to 12k later, ala Wal Mart
for( var j = 1; j < 10000; j++ ) {
  stores.write({
    id: j,
    name: faker.commerce.department(),
    street_number: faker.random.number(),
    street_number_suffix: streetSuffix(),
    street_name: faker.address.streetName(),
    street_type: streetType(),
    street_direction: streetDirection(),
    address_type: addressType(),
    city_id: ,
  })
}
stores.end();

const cities = csv();
cities.pipe(fs.createWriteStream('cities.csv'));
for( var k = 1; k < 1000; k++ ) {
  cities.write({
    id: k,
    name: faker.address.city(),
    governing_district: faker.address.state(),
    country: 'United States',
    latitude: faker.address.latitude(),
    longitude: faker.address.longitude(),
    postal_code: rand(11111,99999)
  })
}
cities.end();
