var routes = function(app){

  app.get('*', (req, res) => {
    console.log('Get request!');
    res.writeHead(200);
    res.end();
  })

};

module.exports = routes;