const connection = require('./connection');

const findById = async (productId) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [productId],
  );
  return result;
};

const findAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM products',
  );
  return result;
};

const insert = async (products) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO products (name) VALUE (?)',
    [...Object.values(products)],
  );
  return insertId;
};

const editById = async (id, name) => {
  const [result] = await connection.execute(
    `UPDATE products
    SET name = ?
    WHERE id = ?`,
    [name, id],
);
  return result;
};

const deleteById = async (id) => {
  const [result] = await connection.execute(
    `DELETE FROM products
    WHERE id = ?`,
    [id],
);
  return result;
};

const searchByParams = async (name) => {
  const [result] = await connection.query(
    'SELECT * FROM products WHERE name LIKE ?',
    [`${name.substr(0, 1)}%`],
  );
  return result;
};

module.exports = {
  findById,
  findAll,
  insert,
  editById,
  deleteById,
  searchByParams,
};