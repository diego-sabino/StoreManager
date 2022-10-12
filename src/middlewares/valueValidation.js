const { findAll } = require('../models/productsModel');

const productNameValue = (req, res, next) => {
  const { name } = req.body;
  const nameValidation = name.length > 4;
  if (!nameValidation) {
    return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
  }
  next();
};

const salesValue = async (req, res, next) => {
  const [{ quantity }] = req.body;
  const quantityValidation = quantity > 0;
  const findID = await findAll();
  const lastIndex = findID.length - 1;
  const productIdExist = req.body
    .filter((sale) => sale.productId > findID[lastIndex].id)
    .every((sale) => sale.length);
  if (!quantityValidation) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }
  if (!productIdExist) {
    return res.status(404).json({ message: 'Product not found' });
  }
  next();
};
module.exports = {
  productNameValue,
  salesValue,
};