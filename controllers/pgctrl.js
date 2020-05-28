const path = require('path');
const { Client } = require('pg');
const loadSchema = require('../lib/schema.js');
const { rand1k } = require('../lib/randomluts.js');
const QueryStream = require('pg-query-stream');
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
          console.log('Data loaded.')

          const makeInventory = function(id){
            console.log("Running on" + id );
            let values = '';
            for( let i = 0; i < 15; i += 1 ) {
              values += `(${id}, ${rand1k()}),`;
            }
            values += `(${id}, ${rand1k()})`;
            let assoc = `INSERT INTO products_stores (product_id, store_id) VALUES ${values} RETURNING ID`;
            client.query(assoc)
            .then(() => {
              console.log('Finito')
            })
          }

          async function streamInventory(stream) {
            for await ( const row of stream ) {
              makeInventory(row.id);
            }
          }

          sql = `SELECT id FROM products`;
          var query = new QueryStream(sql);
          // this won't avoid memory leak problems bc you can still load just
          // tons and tons of rows into your application
          var stream = client.query(query);
          streamInventory(stream);
        
        })
      })
    })
  }
}

module.exports = PGController; 
