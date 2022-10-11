const express = require('express');
const productsController = require('../controllers/productsController');
const { productNameField } = require('../middlewares/fieldValidation');
const { productNameValue } = require('../middlewares/valueValidation');

const router = express.Router();

router.post(
  '/', productNameField, productNameValue,
  productsController.createProduct,
);

router.get(
  '/',
  productsController.listProducts,
);

router.get(
  '/:id',
  productsController.listProductsById,
);

module.exports = router;