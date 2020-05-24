// https://www.youtube.com/watch?v=zNjVFOo3eO0
const express = require('express');
const serverport = process.env.PORT || 3000;
const db = require('./controllers/mongoctrl.js');

const app = express();

var server = app.listen(serverport, function(){
  console.log( `Server running on ${serverport}!!`);
  const client = db.createClient();
  db.connectAndSeed(client);
});
