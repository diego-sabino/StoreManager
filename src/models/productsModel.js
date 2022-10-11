const connection = require('./connection');

const findById = async (driverId) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [driverId],
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

module.exports = {
  findById,
  findAll,
  insert,
};