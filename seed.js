const fs = require('fs');
const csv = require('csv-write-stream'); 
const faker = require('faker');

const suffixes = ['1/2', '1/3', 'A', 'B', 'C', '3/4'];

const rand = function(min=0, max=10) {
  return Math.floor((Math.random() * max) + min);
}

const pickrand = function(selection) {
  let i = rand(0, selection.length);
  return selection[i];
}

const streetSuffix = function() {
  if( rand(1,6) === 1 ) {
    return pickrand(suffixes);
  }
  return null;
}

const streetDirection = function() {
  if( rand(1,6) === 1 ) {
    return pickrand(['N', 'E', 'S', 'W', 'NE', 'NW', 'SE', 'SW']);
  }
  return null;  
}

const streetType = function() {
  if( rand(1,4) === 1 ) {
    return pickrand(['Ave', 'Blvd', 'Lane', 'Circle']);
  }
  return 'Street';  
}

const addressType = function() {
  if( rand(1,7) === 1 ) {
    return pickrand(['Suite', 'Building']);
  }
  return null;  
}


const products = csv();
products.pipe(fs.createWriteStream('products.csv'));
// spinal tap to 10M later
for( var i = 1; i < 101; i++ ) {
  products.write({
    id: i,
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    sku: faker.random.uuid(),
    view_count: 0,
    created_at: faker.date.recent(),
  });
}
products.end();


const stores = csv();
stores.pipe(fs.createWriteStream('stores.csv'));
// Crank to 12k later, ala Wal Mart
for( var j = 1; j < 11; j++ ) {
  stores.write({
    id: j,
    name: faker.commerce.department(),
    street_number: faker.random.number,
    street_number_suffix: streetSuffix(),
    street_name: faker.random.streetName,
    street_type: streetType(),
    street_direction: streetDirection(),
    address_type: addressType(),
    city_id: rand(1,5),
  })
}
stores.end();

const cities = csv();
cities.pipe(fs.createWriteStream('cities.csv'));
for( var k = 1; k < 6; k++ ) {
  cities.write({
    id: k,
    name: faker.address.city(),
    latitude: faker.address.latitude(),
    longitude: faker.address.longitude(),
    postal_code: rand(11111,99999)
  })
}
cities.end();
