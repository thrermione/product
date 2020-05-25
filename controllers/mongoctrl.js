const path = require('path');
// load whatever we need to connect with
// load whatever we need as a schema file 
const { MongoClient } = require('mongodb');
const fs = require('fs');
const csv = require('csv-stream');
const { rand1k } = require('../lib/randomluts.js');

const port = process.env.MONGOPORT || 27017;
const user = process.env.DBUSER || 'productservice';
const password = process.env.PASSWORD || 'cocacola';
const database = process.env.DATABASE || 'productservice';
const host = process.env.HOST || 'localhost';

const filepath = path.join(__dirname, '..' , 'lib', 'csv');
const MongoController = {

  createClient: function() {
    return new MongoClient(`mongodb://${host}`);
    const products = db.collection('products');
    const stores = db.collection('stores');
    const locations = db.collection('locations');
    products.drop();
    stores.drop();
    locations.drop();
  },

  connectAndSeed: function(client) {
    client.connect(function(err) {
      if(err) {
        console.error(err);
        return;
      }

      const db = client.db(database);
      let readProducts = fs.createReadStream(`${filepath}/products.csv`);
      let readStores = fs.createReadStream(`${filepath}/stores.csv`);
      let readCities = fs.createReadStream(`${filepath}/cities.csv`);
      let csvStream = csv.createStream();
      let storeStream = csv.createStream();

      const products = db.collection('products');
      const stores = db.createCollection('stores');

      let productRows = [];
      let count = 0;

      //Let's make 10K stores with their locations.

      let cities = [];
      let storelist = [];
      readCities.pipe(csvStream)
        .on('error', (error) => {
          console.error(error);
        })
        .on('data', (data) => {
          cities.push(data);
        })
        .on('end', (rowCount) => {
          console.log( `${rowCount} cities parsed. Loading stores.`);
          readStores.pipe(storeStream)
            .on('error', (error) => {
              console.error(error);
            })
            .on('data', (data) => {
              console.log(data);
              const i = rand1k();
              const currcity = cities[i];

              const store = {
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
              };
              storelist.push(store);
            })
            .on('end', (rowCount) => {
              console.log( `${rowCount} stores parsed.`);
              console.log(storelist[1]);
            })
        })

      /*

      readProducts.pipe(csvStream)
        .on('error', (error) => {
            console.error(error);
          })
        .on('data', (data) => {
          count++;
          const row = { insertOne: data };
          productRows.push(row);
          if( productRows.length === 100000 ) {
            readProducts.pause();
            console.log('Stream paused, writing rows, at ' + count );
            products.bulkWrite(productRows)
            .then((res) => {
              console.log( "Batch of products written" );
              productRows = [];
              readProducts.resume();
            })
            .catch((err) => {
              console.error(err);
            });
          }
        })
        .on('end', (rowCount) => {
          console.log(`Parsed ${rowCount} rows`);
          if( productRows.length > 0 ) {
            products.bulkWrite(productRows)
            .then((res) => {
              console.log( "Final batch of products written" );
              readProducts.resume();
            })
            .catch((err) => {
              console.error(err);
            });
          }
        });

        */

    });
  }
}

   
module.exports = MongoController; 
