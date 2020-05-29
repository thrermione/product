console.log(`Writing CSVs at ${Date.now()}`);
const fs = require('fs');
const csv = require('csv-write-stream'); 
const faker = require('faker');
const path = require('path');
const filepath = path.join(__dirname , 'lib', 'csv');

const start = process.hrtime();

// lookup tables to make random numbers pre-loaded.
let lut10 = [];
let luti = 0;
for ( let i = 0; i < 1000; i += 1 ) {
  lut10.push(Math.random()*9|0)
}

let lut1k = [];
let lutk = 0;
for ( let i = 0; i < 1000000; i += 1 ) {
  lut1k.push(Math.random()*1000|0)
}

const rand10 = function() {
  if( luti === lut10.length ) {
    luti = 0;
  }
  return lut10[++luti];
}

const rand1k = function() {
  if( lutk === lut1k.length ) {
    lutk = 0;
  }
  return lut1k[++lutk];
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

console.log(`Writing inventories at ${Date.now()}`);
const inventories = csv();
inventories.pipe(fs.createWriteStream(`${filepath}/inventories.csv`));
for( var i = 1; i < 10000000; i += 1 ) {

  const newline = `${rand1k()},i,${rand1k()}\n${rand1k()},i,${rand1k()}\n${rand1k()},i,${rand1k()}\n${rand1k()},i,${rand1k()}\n${rand1k()},i,${rand1k()}\n`;

  // for( var j = 1; j < 5; j += 1 ) {
  //   inventories.write({
  //     store_id: rand1k(),
  //     product_id: i,
  //     quantity: rand1k(),
  //     reserved: 0
  //   });
  // }
}
inventories.end();

const products = csv();
products.pipe(fs.createWriteStream(`${filepath}/products.csv`));

for( var i = 1; i < 10000000; i+= 1 ) {
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
console.log(`Products complete ${Date.now()}`);

const stores = csv();
stores.pipe(fs.createWriteStream(`${filepath}/stores.csv`));
for( var j = 1; j < 10001; j+= 1 ) {
  stores.write({
    id: j,
    name: faker.commerce.department(),
    street_number: faker.random.number(),
    street_number_suffix: streetSuffix(),
    street_name: faker.address.streetName(),
    street_type: streetType(),
    street_direction: streetDirection(),
    address_type: addressType(),
    city_id: rand1k(),
  })
}
stores.end();

const cities = csv();
cities.pipe(fs.createWriteStream(`${filepath}/cities.csv`));
for( var k = 1; k < 1001; k+=1 ) {
  cities.write({
    id: k,
    name: faker.address.city(),
    governing_district: faker.address.state(),
    country: 'United States',
    latitude: faker.address.latitude(),
    longitude: faker.address.longitude(),
    postal_code: faker.address.zipCode(),
  })
}
cities.end();
