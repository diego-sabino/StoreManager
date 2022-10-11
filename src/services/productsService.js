const { productsModel } = require('../models');

const findAll = async () => {
  const products = await productsModel.findAll();
  return { message: products };
};

const findById = async (productId) => {
  const passenger = await productsModel.findById(productId);
  return { message: passenger };
};

module.exports = {
  findAll,
  findById,
};