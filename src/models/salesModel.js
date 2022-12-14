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
    await connection.execute(
      `INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
      VALUES (?, ?, ?)`, [result.insertId, productId, quantity],
);
  }));
  return result;
};

const findById = async (saleId) => {
  const [result] = await connection
    .execute(`
    SELECT 
    distinct   
    s.date,
    a.product_id productId,
    a.quantity
    FROM
    StoreManager.sales_products a
    INNER JOIN
    StoreManager.sales s
    WHERE a.sale_id = ?
    ORDER BY a.product_id
    `, [saleId]);
  return result;
};

const findAll = async () => {
  const [result] = await connection
    .execute(`
    SELECT
    DISTINCT
    a.sale_id saleId,
    s.date,
    a.product_id productId,
    a.quantity
    FROM
    StoreManager.sales_products a
    INNER JOIN
    StoreManager.sales s
    ORDER BY sale_id, product_id`);
  return result;
};

const deleteById = async (id) => {
  const [result] = await connection.execute(
    `DELETE FROM sales
    WHERE id = ?`,
    [id],
);
  return result;
};

const editById = async (sales) => {
  const result = await sales.forEach((async (sale) => {
    const { quantity, productId } = sale;
   await connection.execute(
    `UPDATE sales_products
    SET
    quantity = ?
    WHERE product_id = ?`,
    [quantity, productId],
   );
  }));
  return result;
};

module.exports = {
  createSaleProduct,
  findById,
  findAll,
  deleteById,
  editById,
};