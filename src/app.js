const express = require('express');
const bodyParser = require('body-parser');
const { productsRouter, salesRouter } = require('./routers');

const app = express();
app.use(bodyParser.json());

app.use('/products', productsRouter);
app.use('/sales', salesRouter);

app.get('/', (_request, response) => {
  response.send();
});

module.exports = app;