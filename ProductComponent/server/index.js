/* eslint-disable no-console */
const express = require('express');
const { getProduct, getStores } = require('./controller.js');

const app = express();
const PORT = 3002;

app.use(express.static('public'));
app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
app.use((req, res, next) => {
  console.log(`Incoming ${req.method} request to ${req.path}`);
  next();
});

app.get('/product/:id', (req, res) => {
  getProduct(req.params.id, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else if (!results.length) {
      res.status(404).send('Oops! Product not found!');
    } else {
      res.status(200).send(results);
    }
  });
});


app.get('/product/:id/find-store', (req, res) => {
  getStores(req.params.id, req.query.q, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else if (!results.length) {
      res.status(404).send('Store not found');
    } else {
      res.status(200).send(results);
    }
  });
});


if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
}

module.exports = app;
