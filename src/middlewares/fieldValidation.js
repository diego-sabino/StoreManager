const productNameField = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: '"name" is required' });
  }
  next();
};

const salesField = (req, res, next) => {
  const [{ productId, quantity }] = req.body;
  if (!productId) {
    return res.status(400).json({ message: '"productId" is required' });
  }
   if (!quantity && quantity !== 0) {
    return res.status(400).json({ message: '"quantity" is required' });
  }
  next();
};

module.exports = {
  productNameField,
  salesField,
};