const path = require('path');
// load whatever we need to connect with
// load whatever we need as a schema file 
const { MongoClient } = require('mongodb');

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
    // connect to the client 
    console.log( "connect and seed is triggered.")
  }
};

module.exports = MongoController; 

