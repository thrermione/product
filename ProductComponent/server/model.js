const { connection } = require('../db/index.js');

const getProductData = (id, callback) => {
  const query = `SELECT * FROM products WHERE id=${id}`;

  connection.query(query, (err, results) => {
    if (err) {
      callback(err);
    }
    callback(null, results);
  });
};

const getStoreData = (id, searchQuery, callback) => {
  const query = `SELECT * FROM stores WHERE (productId=${id} AND storeAddress LIKE '%${searchQuery}%')`;

  connection.query(query, (err, results) => {
    if (err) {
      callback(err);
    }
    callback(null, results);
  });
};

module.exports = {
  getProductData,
  getStoreData,
};
