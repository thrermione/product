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
  },

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
      .on('end', () => {
        console.log( `Stores parsed.`);
        callback(null)
      })
  },

  createInventories: function(client) {

    client.connect(function(err) {
      if(err) {
        console.error(err);
        return;
      }
      const db = client.db(database);
      console.log('Connection established');
    products = db.collection('products');
    stores = db.collection('stores');

       // ****************
      var cursor = stores.find();
      console.log(cursor);
      while (cursor.hasNext()){
       // console.log('Next'); <== this iS running.
        // so let's just load one thing 
        // tis approach causes a heap error.
        products.aggregate(
          [{$sample: {size:1000}}]
          ,
          (err, agg) => {
            agg
            .on('data', (data) => {
              console.log('Data');
              var thisdoc = cursor.next();
              var availability = {
                product_id: data._id,
                number_in_stock: rand1k()
              }
              var newdoc = Object.assign(availability, thisdoc);
              stores.update({_id: thisdoc['_id']}, newdoc )
            })
          }
        )
      }
      // ****************
    });


   
    // stores.find().forEach( function(store){
    //   //Get 1K stores.
    //   products.aggregate(
    //     [{ $sample: {size: 1000}  }]
    //     ,
    //     (err, cursor) => {
    //       cursor
    //       .on('data', (data) => {
    //         myproducts.push({ 
    //           product_id: data._id,
    //           number_in_stock: rand1k(),
    //         });
    //       })
    //       .on('end', () => {
    //         //Add that 1k stores to the thing.
    //         products.update(
    //           {_id: store._id }, 
    //           { $set: {stock: myproducts }
    //         })
    //           .then(() => {
    //             console.log("i done did it");
    //             products.findOne({sku: "1580255383"})
    //               .then((product) => {
    //                 console.log(product);
    //               })
    //           })
    //           .catch((err) => {
    //             console.error(err);
    //           })
    //       })
    //     }
    //     );

    // })
  },

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
          const product = data;
          const row = { insertOne: data };
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
              MongoController.createInventories(db);
            })
            .catch((err) => {
              console.error(err);
            });
          }
        });
  }
}

   
module.exports = MongoController; 
