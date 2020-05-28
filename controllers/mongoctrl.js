const path = require('path');
const { MongoClient } = require('mongodb');
const fs = require('fs');
const csv = require('csv-stream');
const { rand10k, rand1k } = require('../lib/randomluts.js');

const port = process.env.MONGOPORT || 27017;
const user = process.env.DBUSER || 'productservice';
const password = process.env.PASSWORD || 'cocacola';
const database = process.env.DATABASE || 'productservice';
const host = process.env.HOST || 'localhost';

const filepath = path.join(__dirname, '..' , 'lib', 'csv');
const MongoController = {

  createClient: function() {
    return new MongoClient(`mongodb://${host}`);
  },

  // take the inventory out of the stors and put it in the product. 
  // the product tells you waht stores its available in. 

  // key in it that is like "avaiable_at"
  // the value of available_at is an array
  // the objects in that array are the object ids or some other means of ref. ideally objids of the particular stores, 
  // and also probalby the # in stock

  connectAndSeed: function(client) {
    client.connect(function(err) {
      if(err) {
        console.error(err);
        return;
      }
      const db = client.db(database);
      MongoController.loadCities((err, cities) => {
        if( err ) {
          console.log(err);
          return;
        }
        MongoController.createStores(db, cities, () => {
          if(err) {
            console.log(err);
            return;
          }
          MongoController.createProducts(db);
        });
      })
    });
  },

  loadCities: function(callback) {
    const readCities = fs.createReadStream(`${filepath}/cities.csv`);
    const citiesCsv = csv.createStream();
    let cities = [];
    readCities.pipe(citiesCsv)
      .on('error', (error) => {
       callback( error, null )
      })
      .on('data', (data) => {
        cities.push(data);
      })
      .on('end', (rowCount) => {
        console.log( `${rowCount} cities parsed.`);
        if( callback !== undefined ) {
          callback(null, cities);
        }
      });
  },

  createStores: function(db, cities, callback) {
    const readStores = fs.createReadStream(`${filepath}/stores.csv`);
    const storesCsv = csv.createStream();
    const stores = db.collection('stores');
    let storelist = [];
    readStores.pipe(storesCsv)
      .on('error', (error) => {
        callback(error);
      })
      .on('data', (data) => {
        console.log(data);
        const i = rand1k();
        const currcity = cities[i];
        const store = {
          insertOne: {
            name: data.name,
            street_number: data.street_number,
            street_number_suffix: data.street_number_suffix,
            street_name: data.street_name,
            street_type: data.street_type,
            street_direction: data.street_direction,
            address_type: data.address_type,
            city: {
              name: currcity.name,
              governing_district: currcity.governing_district,
              country: currcity.country,
              latitude: currcity.latitude,
              longitude: currcity.longitude,
              postal_code: currcity.postal_code
            }
          }
        };
        storelist.push(store);
      })
      .on('end', () => {
        console.log( `Stores parsed.`);
        stores.bulkWrite(storelist)
        .then(function() {
          callback(null);
        })
      })
  }, 

  createInventories: function(db) {
    //create an inventories collection
    // we have 10k stores so 10k inventories.

    const generateInventory = function(size) {
      let inventory = [];
      for( let i = 0; i < size; i++ ) {
        const stock = {
          sku: rand10m(),
          quantity: rand1k()
        }
        inventory.push(stock);
      }
      return inventory;
    }

    for( let i = 0; i < 1000; i += 1 ) {
      const store = i,
      // then products
    }

    const nextStore = {
      storeId: i,
      products: []
    }
    nextStore.products.
    //location
    //producs
  }



  createProducts: function(db) {
    const readProducts = fs.createReadStream(`${filepath}/products.csv`);
    const productsCsv = csv.createStream();
    const products = db.collection('products');
    products.createIndex({ sku: 1 });
    let productRows = [];
    readProducts.pipe(productsCsv)
        .on('error', (error) => {
            console.error(error);
          })
        .on('data', (data) => {
          const product = Object.assign( availability, data);
          const row = { insertOne: product };
          productRows.push(row);
          if( productRows.length === 100000 ) {
            readProducts.pause();
            console.log('Bulkwriting');
            products.bulkWrite(productRows)
            .then((res) => {
              productRows = [];
              readProducts.resume();
            })
            .catch((err) => {
              console.error(err);
            });
          }
        })
        .on('end', (rowCount) => {
          console.log(`Products parsed.`);
          if( productRows.length > 0 ) {
            products.bulkWrite(productRows)
            .then((res) => {
              console.log( `Products loaded into database.`);
            })
            .catch((err) => {
              console.error(err);
            });
          }
        });
  }
}

   
module.exports = MongoController; 
