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
    // const products = db.collection('products');
    // const stores = db.collection('stores');
    // const locations = db.collection('locations');
    // products.drop();
    // stores.drop();
    // locations.drop();
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
    // We are going to do this 10,000 times because w have 10K stores
    // So we gotta go through each store in the database.

    // then we get a random selection of let's say somewhere around 1k records
    // and put that shit in a random uh, store
    // To update a single field or specific fields just use the $set operator...
    products = db.collection('products');
    stores = db.collection('stores');


    let bulkUpdate = [];
    let productId = null;
    let myproducts = [];

//      var stock = null;
      products.aggregate(
        [{ $sample: {size: 1000}  }]
        ,
        (err, cursor) => {
          cursor
          .on('data', (data) => {
            myproducts.push({id: data._id});
          })
          .on('end', () => {
            console.log('End');
            console.log(myproducts);
            console.log( `Let's update store 1 with this product list.`);
            products.updateOne({id: 1} , { $set: {stock: myproducts }})
              .then(() => {
                console.log("i done did it");
                //this takes way too long
              })
              .catch((err) => {
                console.error(err);
              })
          })
        }
        );
      //this has to be an operation.
 //     const update = { updateOne: { "filter": {"id" : i }, "update": { availability: stock } }};
  //    bulkUpdate.push(update);
//    products.bulkWrite( bulkUpdate )
//      .then(function(){
//        console.log('Updated')
//      })
//      .catch(function(err){
//        console.error(err);
//      })
    })
  },

  
    // loader.io for stress testing
    // k6 for local testing

    // do all your API calls separately and write results in as bson into a file
    // invoke mongoimport and import that bson file into a new empty collection prices_new. 
    // Javascript, let alone high-level OO wrappers, are just too slow for that
    // rename prices_new -> prices dropTarget=true (this will be atomic hence no downtime)

  createProducts: function(db) {
    const readProducts = fs.createReadStream(`${filepath}/products.csv`);
    const productsCsv = csv.createStream();
    const products = db.collection('products');
    let productRows = [];

    readProducts.pipe(productsCsv)
        .on('error', (error) => {
            console.error(error);
          })
        .on('data', (data) => {
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
              productsCsv.end();
             })
            .catch((err) => {
              console.error(err);
            });
          }
        });
  }
}

   
module.exports = MongoController; 
