const salesService = require('../services/salesService');

const createSale = async (req, res) => {
  const sales = req.body;
  // console.log(sales);

  const { insertId } = await salesService.createSale(sales);

  return res.status(201).json({ id: insertId, itemsSold: sales });
};

module.exports = {
  createSale,
};