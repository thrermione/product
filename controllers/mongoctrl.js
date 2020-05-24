const path = require('path');
// load whatever we need to connect with
// load whatever we need as a schema file 
const { MongoClient } = require('mongodb');
const fs = require('fs');
const fastcsv = require('fast-csv');

const port = process.env.MONGOPORT || 27017;
const user = process.env.DBUSER || 'productservice';
const password = process.env.PASSWORD || 'cocacola';
const database = process.env.DATABASE || 'productservice';
const host = process.env.HOST || 'localhost';

const filepath = path.join(__dirname, '..' , 'lib', 'csv');
const MongoController = {

  createClient: function() {
    return MongoClient.connect( `mongodb://${host}:${port}/${database}`, function(err, database) {
      if (err) {
        return console.error(err);
      }
      console.log(`MongoDB connection established`);
      return database;
    })
  },

  connectAndSeed: function(client) {
    console.log( "connect and seed is triggered.");
        // connect to the client , do 1k per batch.
    let dataToWrite = [];
    let stream = fs.createReadStream(`${filepath}/cities.csv`);

    const parseRows = function(batch){
      stream.pipe(fastcsv.parse({ skipRows: batch, maxRows: batch }))
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
        })
        .on('end', rowCount => {
          console.log(`Parsed ${rowCount} rows from ${batch}`);
        });
    }

    for( var i = 0; i < 3000; i += 1000 ) {
      parseRows(i);
    }
  }
}

module.exports = MongoController; 
