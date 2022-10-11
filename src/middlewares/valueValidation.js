const productNameValue = (req, res, next) => {
  const { name } = req.body;
  const nameValidation = name.length > 4;
  if (!nameValidation) {
    return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
  }
  next();
};

module.exports = {
  productNameValue,
};