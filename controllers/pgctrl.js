const { Client } = require('pg');

const port = process.env.PORT || 5432;
const user = process.env.DBUSER || 'productservice';
const password = process.env.PASSWORD || 'cocacola';
const host = process.env.HOST || 'localhost';
const database = process.env.DATABASE || 'productservice';

const loadSchema = require('../lib/schema.js');

const PGController = {

  createClient: function() {
    return new Client({
      user,
      password,
      host,
      port,
      database
    });
  },

  connectAndSeed: function(client) {
    client.connect()
    .then(() => {
      console.log( `Postgres connection established on port ${port}.`);
      client.query(loadSchema)
      .then((response) => {
        console.log( 'Schema successfully loaded!!');
        // copy time
      })
      .catch((err) => {
        console.error(`Error loading schema: ${err}`);
      })
    })
    .catch((error) => {
      console.error( `Error establishing Postgres connection: ${error}`);
    })
  }
};

module.exports = PGController; 
