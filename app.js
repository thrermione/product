// https://www.youtube.com/watch?v=zNjVFOo3eO0
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const port = process.env.PORT || 3000;


console.log(cluster);
var routes = require('./routes.js')(app);

var server = app.listen(port, function(){
  console.log( `Server running on ${port}!!`);
});