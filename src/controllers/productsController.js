const productsService = require('../services/productsService');

const listProducts = async (_req, res) => {
  const { message } = await productsService.findAll();
  res.status(200).json(message);
};

const listProductsById = async (req, res) => {
  const { id } = req.params;
  const { message } = await productsService.findById(id);
   if (message) {
    return res.status(200).json(message);
  }
  res.status(404).json({ message: 'Product not id' });
};

const createProduct = async (req, res) => {
  const { name } = req.body;
  const { message } = await productsService.createProduct(name);
  res.status(201).json(message);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const { message } = await productsService.findById(id);
  await productsService.deleteProduct(id);
  if (message) return res.status(204).json(message);
  res.status(404).json({ message: 'Product not del' });
};

const editProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  await productsService.editProduct(id, name);
  const { message } = await productsService.findById(id);
  // console.log(message);
  if (message) return res.status(200).json(message);
  res.status(404).json({ message: 'Product not edit' });
};

const searchProduct = async (req, res) => {
  const { q } = req.query;
  const { message } = await productsService.searchProduct(q);
  // console.log(message);
  // if (message) return
  res.status(200).json(message);
  // res.status(404).json({ message: 'Product not found' });
};

module.exports = {
  listProducts,
  listProductsById,
  createProduct,
  editProduct,
  deleteProduct,
  searchProduct,
};