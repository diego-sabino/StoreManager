const express = require('express');
const salesController = require('../controllers/salesController');
const { salesField } = require('../middlewares/fieldValidation');
const { salesValue } = require('../middlewares/valueValidation');

const router = express.Router();

router.post(
  '/', salesField, salesValue,
  salesController.createSale,
);

router.get(
  '/', 
  salesController.listSales,
);

router.get(
  '/:id', 
  salesController.listSalesById,
);

router.put(
  '/:id', salesField, salesValue,
  salesController.editSale,
);

router.delete(
  '/:id', 
  salesController.deleteSale,
);

module.exports = router;