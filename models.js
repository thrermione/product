var uuid = require('uuid');
var n1qlQuery = require('couchbase').n1qlQuery;
var bucket = require('./app').bucket;

function ProductModel() {
};

function StoreModel() {
};

module.exports.ProductModel = ProductModel;
module.exports.StoreModel = StoreModel;