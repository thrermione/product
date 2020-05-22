// https://www.youtube.com/watch?v=zNjVFOo3eO0
const express = require('express');
const bodyParser = require('body-parser');
const couchbase = require('couchbase');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true;}));

// time to set up connection to couchbase.