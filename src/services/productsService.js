const { productsModel } = require('../models');

const findAll = async () => {
  const products = await productsModel.findAll();
  return { message: products };
};

const findById = async (productId) => {
  const passenger = await productsModel.findById(productId);
  return { message: passenger };
};

const createProduct = async (name) => {
  const newProductId = await productsModel.insert({ name });
  const newProduct = await productsModel.findById(newProductId);
  return { message: newProduct };
};

module.exports = {
  findAll,
  findById,
  createProduct,
};