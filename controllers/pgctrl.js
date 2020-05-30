const path = require('path');
const fs = require('fs');
// const { Client } = require('pg');
const pgp = require('pg-promise')();
const loadSchema = require('../lib/schema.js');
const { rand1k } = require('../lib/randomluts.js');
//const QueryStream = require('pg-query-stream');
const csv = require('csv-stream');
const port = process.env.PGPORT || 5432;
const user = process.env.DBUSER || 'productservice';
const password = process.env.PASSWORD || 'cocacola';
const host = process.env.HOST || 'localhost';
const database = process.env.DATABASE || 'productservice';


const filepath = path.join(__dirname, '..' , 'lib', 'csv');
const PGController = {

  createClient: function() {
    console.log('CreateClient running.');
    const connectionDetails = `postgres://${user}:${password}@${host}:${port}/${database}`;
    const db = pgp(connectionDetails);
    return db;

  },

  connectAndSeed: function(client) {
    var leftover = 10000000;
    client.none(loadSchema)
    .then(()=>{
      console.log('Schema loaded.');
      client.none(
      `COPY products
        FROM '${filepath}/products.csv'
        WITH (format csv, header);

        COPY stores
        FROM '${filepath}/stores.csv'
        WITH (format csv, header);

        COPY locations
        FROM '${filepath}/cities.csv'
        WITH (format csv, header);

        COPY products_stores
        FROM '${filepath}/inventories.csv'
        WITH (format csv, header);
      `
      )
        .then(()=>{
          console.log('Records loaded.')
        })
        .catch((err)=>{
          console.error(err);
        })
    })
  } 
}

module.exports = PGController; 
