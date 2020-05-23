// https://www.youtube.com/watch?v=zNjVFOo3eO0
const express = require('express');
const serverport = process.env.PORT || 3000;
const db = require('./controllers/pgctrl.js');

const client = db.createClient();
db.connectAndSeed(client);

var server = app.listen(serverport, function(){
  console.log( `Server running on ${serverport}!!`);
});
