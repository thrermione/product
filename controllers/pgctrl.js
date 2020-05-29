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
            `
      )
        .then(()=>{
          console.log('Primary records loaded.')
          let csvStream = csv.createStream();
          var count = 0;
          var queue = []

          const columns = new pgp.helpers.ColumnSet(['product_id', 'store_id', 'quantity'], {table: 'products_stores'});
          
          const bulkWrite = function(operations, callback) {
            const query = pgp.helpers.insert(queue, columns);
            client.none(query).then(function(){
              queue = [];
              callback(null)
            })
            .catch((err) => {
              console.log(err);
              stream.pause();
            })   
          }

          const prepareInventoryForWrite = function(id) {
            for( let i = 0; i < 4; i += 1 ) {
             let value = {
                product_id: id,
                store_id: rand1k(),
                quantity: rand1k(),
              };
              queue.push(value);
            }
          }

          var stream = fs.createReadStream(`${filepath}/products.csv`);
          stream.pipe(csvStream)
            .on('end', (data)=>{
              console.log('10M rows processed');
            })
            .on('data', (data) => {
              count++;
              prepareInventoryForWrite(data.id);
              if( count >= 1000 ) {
                stream.pause()
                bulkWrite(queue, (err) => {
                  if(err) {
                    console.log(err);
                    return;
                  }
                  leftover -= 1000
                  console.log(`Bulkwrite complete, ${leftover} remaining.`);
                  count = 0; 
                  stream.resume();
                })
              } 
          })
        })
        .catch((err)=>{
          console.error(err);
        })
    })
  } 
}

module.exports = PGController; 
