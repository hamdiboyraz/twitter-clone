const db = require("../../data/db-config");

const getAll = () => {
  return db("users");
};

const getById = (id) => {
  return db("users").where({ user_id: id }).first();
};

// const getByUsername = (username) => {
//   return db("users").where({ username }).first();
// };

const getBy = (db_column, filter) => {
  return db("users").where(db_column, filter).first();
};

const findByIdAndUpdate = async (id, user) => {
  await db("users").where({ user_id: id }).update(user);
  const updatedUser = await getById(id);
  return updatedUser;
};

const findByIdAndDelete = async (id) => {
  await db("users").where({ user_id: id }).update({ active: false });
};

const create = async (user) => {
  const [newUserID] = await db("users").insert(user);
  const newUser = await getById(newUserID);
  delete newUser.password;
  delete newUser.active;
  return newUser;
};

module.exports = {
  getAll,
  getById,
  // getByUsername,
  getBy,
  findByIdAndUpdate,
  findByIdAndDelete,
  create,
};
