const path = require('path');
const fs = require('fs');
const { Client } = require('pg');
const loadSchema = require('../lib/schema.js');
const { rand1k } = require('../lib/randomluts.js');
//const QueryStream = require('pg-query-stream');
const pgp = require('pg-promise');
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
          console.log('Data loaded.')

          const dbpromise = pgp(client);
          console.log(dbpromise);

          // our set of columns, to be created only once (statically), and then reused,
          // to let it cache up its formatting templates for high performance:
          const cs = new pgp.helpers.ColumnSet(['product_id', 'store_id'], {table: 'products_stores'});

          const makeInventory = async function(id){
            let values = [];
            for( let i = 0; i < 15; i += 1 ) {
              values.push({
                product_id: id,
                store_id: rand1k(),
              })
            }

            // generating a multi-row insert query:
            const query = pgp.helpers.insert(values, cs);

            // executing the query:
            dbpromise.none(query);
            console.log('Inserted ' + id )
            // client.query(assoc)
            // .then(() => {
            //   console.log('Inserted ' + id )
            // })

          }

          async function streamInventory(stream) {
            for await ( const row of stream ) {
              makeInventory(row[0]);
            }
          }

          // sql = `SELECT id FROM products`;
          // var query = new QueryStream(sql);
          // this won't avoid memory leak problems bc you can still load just
          // tons and tons of rows into your application
          // lt's just idk open up that CSV.
          var stream = fs.createReadStream(`${filepath}/products.csv`);
          streamInventory(stream);

          stream.on('end', (data)=>{
            console.log('FINITO');
          });
        })
      })
    })
  }
}

module.exports = PGController; 
