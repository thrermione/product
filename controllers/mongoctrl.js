const path = require('path');
// load whatever we need to connect with
// load whatever we need as a schema file 
const { MongoClient } = require('mongodb');
const fs = require('fs');
const csv = require('csv-stream');

const port = process.env.MONGOPORT || 27017;
const user = process.env.DBUSER || 'productservice';
const password = process.env.PASSWORD || 'cocacola';
const database = process.env.DATABASE || 'productservice';
const host = process.env.HOST || 'localhost';

const filepath = path.join(__dirname, '..' , 'lib', 'csv');
const MongoController = {

  createClient: function() {
    console.log("making new client"); 
    return new MongoClient(`mongodb://${host}`);
    // MongoClient.connect( `mongodb://${host}:${port}/${database}`, function(err, client) {
    //   if (err) {
    //     return console.error(err);
    //   }
    //   console.log(`MongoDB connection established`);
    //   callback(client.db);
    // })
    const products = db.collection('products');

  },

  connectAndSeed: function(client) {
    client.connect(function(err) {
      if(err) {
        console.error(err);
        return;
      }

      console.log('Connected to mongodb server');
      const db = client.db(database);
      let readProducts = fs.createReadStream(`${filepath}/products.csv`);
      let csvStream = csv.createStream();

      db.createCollection('products',
      {
        id: Number,
        name: String,
        price: Number,
        sku: String,
        view_count: Number,
        created_at: Number
      });
      let dataToWrite = [];
      let count = 0;

      const products = db.collection('products');

        readProducts.pipe(csvStream)
        .on('error', (error) => {
            console.error(error);
          })
        .on('data', (data) => {
          count++;
          const row = { insertOne: data };
          dataToWrite.push(row);
          if( dataToWrite.length === 100000 ) {
            readProducts.pause();
            console.log('Stream paused, writing rows, at ' + count );
            products.bulkWrite(dataToWrite)
            .then((res) => {
              console.log( "Batch of products written" );
              dataToWrite = [];
              readProducts.resume();
            })
            .catch((err) => {
              console.error(err);
            });
          }
        })
        .on('end', (rowCount) => {
          console.log(`Parsed ${rowCount} rows`);
          if( dataToWrite.length > 0 ) {
            products.bulkWrite(dataToWrite)
            .then((res) => {
              console.log( "Final batch of products written" );
              dataToWrite = [];
              readProducts.resume();
            })
            .catch((err) => {
              console.error(err);
            });
          }
        });

    });
  }
}

   
module.exports = MongoController; 
