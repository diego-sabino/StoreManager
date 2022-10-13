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

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const { message } = await salesService.findById(id);
  await salesService.deleteSale(id);
  // console.log(message);
  if (message.length) return res.status(204).json(message);
  res.status(404).json({ message: 'Sale not found' });
};

const editSale = async (req, res) => {
  const { id } = req.params;
  // const [{ productId, quantity }] = req.body;
  const sales = req.body;
  // console.log(sales);
  await salesService.editSale(sales);
  const { message } = await salesService.findById(id);
  console.log(message);
  if (message.length) return res.status(200).json({ saleId: id, itemsUpdated: sales });
  res.status(404).json({ message: 'Sale not found' });
};

module.exports = {
  createSale,
  listSales,
  listSalesById,
  deleteSale,
  editSale,
};