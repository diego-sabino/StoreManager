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
  // console.log(sale);
  return { message: sale };
};

const editSale = async (sale) => {
  const newSaleId = await salesModel.editById(sale);
  return newSaleId;
};

const deleteSale = async (id) => {
  const newSaleId = await salesModel.deleteById(id);
  return { message: newSaleId };
};

module.exports = {
  createSale,
  findAll,
  findById,
  deleteSale,
  editSale,
};