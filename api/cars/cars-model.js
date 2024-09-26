const db = require('../../data/db-config.js');

const getAll = () => {
  // DO YOUR MAGIC
  return db('cars');
}

const getById = (id) => {
  // DO YOUR MAGIC
  return db('cars').where({ id });
}

const create = async (newCar) => {
  // DO YOUR MAGIC
  const ids = await db('cars').insert(newCar);
  return getById(ids[0]);
}

const updateById = (id, car) => {
  return db('cars').update(car).where({ id });
}

const deleteById = (id) => {
  return db('cars').del().where({ id })
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById
}
