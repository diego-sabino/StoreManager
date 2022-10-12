const connection = require('./connection');

const createDate = async () => {
    const [result] = await connection.execute(
      'INSERT INTO StoreManager.sales (date) VALUES (NOW());',
    );
  return result;
};

const createSaleProduct = async (sales) => {
  const result = await createDate();
  await sales.forEach((async (sale) => {
    const { productId, quantity } = sale;
    // console.log(productId);
    await connection.execute(
      `INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
      VALUES (?, ?, ?)`, [result.insertId, productId, quantity],
);
  }));
  return result;
};

const findById = async (productId) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [productId],
  );
  return result;
};

module.exports = {
  createSaleProduct,
  findById,
};