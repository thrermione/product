const path = require('path');
const fs = require('fs');
const { Client } = require('pg');
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
      .then(() => {
        console.log( 'Schema successfully loaded.');
        client.query(

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

          console.log('Primary data loaded.')

          let csvStream = csv.createStream();

          var count = 0;
          var queue = []
          let supercounter = 0; 

          const bulkWrite = function(operations, callback) {
            while (operations.length > 0 ) {
              const op = operations.pop();
              client.query(op)
              .catch((err) => {
                callback(error)
              })
            }
            callback(null)
          }

          const prepareInventoryForWrite = function(id){
            count++;
            let values = '';
            for( let i = 0; i < 15; i += 1 ) {
              values += `(${id}, ${rand1k()}),`;
            }
            values += `(${id}, ${rand1k()})`;
            let query = `INSERT INTO products_stores (product_id, store_id) VALUES ${values} RETURNING ID`;
            queue.push(query);
          }

          var stream = fs.createReadStream(`${filepath}/products.csv`);
          stream.pipe(csvStream)
            .on('end', (data)=>{
              console.log('AAAAAAAAHHHHH!!!!!!');
              })
            .on('data', (data) => {
              count++;
              console.log(data);
              console.log('chunk');
              prepareInventoryForWrite(data.id);
              if( count >= 1000 ) {
                stream.pause()
                bulkWrite(queue, (err) => {
                  if(err) {
                    console.log(err);
                    return;
                  }
                  console.log('Bulkwrote');
                  count = 0; 
                  stream.resume();
                })
              } 
          })


       
          
        })
      })
    })
  }
}

module.exports = PGController; 
