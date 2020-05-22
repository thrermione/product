// https://www.youtube.com/watch?v=zNjVFOo3eO0
const express = require('express');
const bodyParser = require('body-parser');
const couchbase = require('couchbase');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const couchserver = process.env.COUCHSERVER || '127.0.0.1';
const port = process.env.PORT || 3000;

// time to set up connection to couchbase.
var cluster = new couchbase.Cluster( couchserver, { username: 'productservice', password: 'cocacola' });

console.log(cluster);

// cluster.openBucket is apparently out of date!! 
var bucket = cluster.openBucket('example');

console.log(bucket);


module.exports.bucket = bucket;

var routes = require('./routes.js')(app);

var server = app.listen(port, function(){
  console.log( `Server running on ${port}!!`);
});