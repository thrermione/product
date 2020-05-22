const fs = require('fs');
const csv = require('csv-write-stream')(); 
const faker = require('faker');

const productData = () => {
  csv.pipe(fs.createWriteStream('products.csv'));
  for( var i = 0; i < 10; i++ ) {
    csv.write({
      id: i,
      test: 'test',
    });
  }
  csv.end();
}

productData();