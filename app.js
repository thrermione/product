// https://www.youtube.com/watch?v=zNjVFOo3eO0
const express = require('express');
const serverport = process.env.PORT || 3000;
const db = require('./controllers/mongoctrl.js');

const app = express();
let client = null;
db.createClient( function(connection) {
  client = connection;
  db.connectAndSeed(client);
});

var server = app.listen(serverport, function(){
  console.log( `Server running on ${serverport}!!`);
});
