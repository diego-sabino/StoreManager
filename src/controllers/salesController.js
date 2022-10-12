const salesService = require('../services/salesService');

const createSale = async (req, res) => {
  const sales = req.body;
  // console.log(sales);

  const { insertId } = await salesService.createSale(sales);

  return res.status(201).json({ id: insertId, itemsSold: sales });
};

const listSales = async (_req, res) => {
  const { message } = await salesService.findAll();
  res.status(200).json(message);
};

const listSalesById = async (req, res) => {
  const { id } = req.params;
  // console.log(req.params);
  const { message } = await salesService.findById(id);
   if (message.length) {
    return res.status(200).json(message);
  }
  return res.status(404).json({ message: 'Sale not found' });
};

module.exports = {
  createSale,
  listSales,
  listSalesById,
};