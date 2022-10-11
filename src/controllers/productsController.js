const productsService = require('../services/productsService');

const listProducts = async (_req, res) => {
  const { message } = await productsService.findAll();
  res.status(200).json(message);
};

const listProductsById = async (req, res) => {
  const { id } = req.params;
  const { message } = await productsService.findById(id);
   if (message) {
    res.status(200).json(message);
  }
  return res.status(404).json({ message: 'Product not found' });
};

module.exports = {
  listProducts,
  listProductsById,
};