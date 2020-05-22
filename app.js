// https://www.youtube.com/watch?v=zNjVFOo3eO0
const express = require('express');
const bodyParser = require('body-parser');

const port = process.env.PORT || 5432;
const user = process.env.DBUSER || 'productservice';
const password = process.env.PASSWORD || 'cocacola';
const host = process.env.HOST || 'localhost';
const database = process.env.DATABASE || 'productservice';
const serverport = process.env.PORT || 3000;


const { Client } = require('pg');

//create a client object
const client = new Client({
  user,
  password,
  host,
  port,
  database
});

client.connect()
  .then(function() => {
    console.log(`Connected to database on port ${port)}`);
  })
  .catch((error)=>{
    console.error(`Error connecting to database: ${error}`)
  })

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));



console.log(cluster);
var routes = require('./routes.js')(app);

var server = app.listen(serverport, function(){
  console.log( `Server running on ${port}!!`);
});