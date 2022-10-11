const express = require('express');
const productsController = require('../controllers/productsController');
const { productNameField } = require('../middlewares/fieldValidation');
const { productNameValue } = require('../middlewares/valueValidation');

const router = express.Router();

router.get(
  '/',
  productsController.listProducts,
);

router.get(
  '/:id',
  productsController.listProductsById,
);

router.post(
  '/', productNameField, productNameValue,
  productsController.createProduct,
);

module.exports = router;