const salesModel = require('../models/salesModel');

const findAll = async () => {
  const sales = await salesModel.findAll();
  return { message: sales };
};

const createSale = async (sales) => {
  const result = await salesModel.createSaleProduct(sales);
  return result;
};

const findById = async (saleId) => {
  const sale = await salesModel.findById(saleId);
  console.log(sale);
  return { message: sale };
};

module.exports = {
  createSale,
  findAll,
  findById,
};