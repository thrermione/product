// https://www.youtube.com/watch?v=zNjVFOo3eO0
const express = require('express');
const serverport = process.env.PORT || 3000;
const db = require('./controllers/pgctrl.js');

const app = express();
let client = db.createClient();
db.connectAndSeed(client);

var server = app.listen(serverport, function(){
  console.log( `Server running on ${serverport}!!`);
});

/* Perhaps you have started the http server before making connection with mongodb server. That's why the variable db was undefined when your post api was loaded in the memory. Since the connection with mongodb is async. In order to utilize the mongodb instance you have to first connect with mongdb server and then starts the http server and store the db instance globally or in some module which you can require and get the db instance to perform queries.*/
