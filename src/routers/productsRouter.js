const express = require('express');
const productsController = require('../controllers/productsController');

const router = express.Router();

router.get(
  '/',
  productsController.listProducts,
);

router.get(
  '/:id',
  productsController.listProductsById,
);

module.exports = router;