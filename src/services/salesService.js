const salesModel = require('../models/salesModel');

const createSale = async (sales) => {
  const result = await salesModel.createSaleProduct(sales);

  return result;
};

module.exports = {
  createSale,
};