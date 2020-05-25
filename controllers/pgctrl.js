const path = require('path');
const {Client } = require('pg');
const loadSchema = require('../lib/schema.js');

const port = process.env.PGPORT || 5432;
const user = process.env.DBUSER || 'productservice';
const password = process.env.PASSWORD || 'cocacola';
const host = process.env.HOST || 'localhost';
const database = process.env.DATABASE || 'productservice';

const filepath = path.join(__dirname, '..' , 'lib', 'csv');
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
        client.query(`
          COPY products
          FROM '${filepath}/products.csv'
          WITH (format csv, header)
        `)
        .then((res)=>{
          console.log(`CSVs successfully copied into the database.`)
        })
        .catch((err)=>{
          console.error(`Error writing data into Postgres: ${err}`);
        })
      })
      .catch((err) => {
        console.error(`Error loading schema into Postgres: ${err}`);
      })
    })
    .catch((error) => {
      console.error( `Error establishing Postgres connection: ${error}`);
    })
  }
};

module.exports = PGController; 
