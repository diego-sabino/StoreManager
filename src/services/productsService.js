const { productsModel } = require('../models');

const findAll = async () => {
  const products = await productsModel.findAll();
  return { message: products };
};

const findById = async (productId) => {
  const product = await productsModel.findById(productId);
  return { message: product };
};

const createProduct = async (name) => {
  const newProductId = await productsModel.insert({ name });
  const newProduct = await productsModel.findById(newProductId);
  return { message: newProduct };
};

const editProduct = async (id, name) => {
  const newProductId = await productsModel.editById(id, name);
  return { message: newProductId };
};

const deleteProduct = async (id) => {
  const newProductId = await productsModel.deleteById(id);
  return { message: newProductId };
};

const searchProduct = async (name) => {
  const result = await productsModel.searchByParams(name);
  return { message: result };
};

module.exports = {
  findAll,
  findById,
  createProduct,
  editProduct,
  deleteProduct,
  searchProduct,
};