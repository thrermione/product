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

  createClient: function(callback) {
    MongoClient.connect( `mongodb://${host}:${port}/${database}`, function(err, database) {
      if (err) {
        return console.error(err);
      }
      console.log(`MongoDB connection established`);
      callback(database);
    })
  },

  connectAndSeed: function(client) {
    console.log( "connect and seed is triggered.");
        // connect to the client , do 1k per batch.
    let dataToWrite = [];
    let readProducts = fs.createReadStream(`${filepath}/products.csv`);
    let writeProducts = fs.create
    let csvStream = csv.createStream();
    let i = 0;

    readProducts.pipe(csvStream)
      .on('error', (error) => {
          console.error(error);
        })
      .on('data', (data) => {
        const row = {
          id: data[0],
          name: data[1],
          governing_district: data[2],
          country: data[3],
          latitude: data[4],
          longitude: data[5],
          postal_code: data[6]
        };
        dataToWrite.push(row);

        if( dataToWrite.length === 100000 ) {
          console.log('Writing rows');
          client.bulkWrite(dataToWrite)
          .then((res) => {
            console.log( "Batch of products written" );
            dataToWrite = [];
          })
          .catch((err) => {
            console.error(err);
          });
        }
      })
      .on('end', (rowCount) => {
        console.log(`Parsed ${rowCount} rows`);
      });
  }
}

module.exports = MongoController; 
