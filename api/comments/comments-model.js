const db = require("../../data/db-config");

const getAll = () => {
  return db("comments as c")
    .leftJoin("users as u", "u.user_id", "c.user_id")
    .leftJoin("tweets as t", "t.tweet_id", "c.tweet_id")
    .select("c.*", "u.username", "t.tweet");
};

const getById = (id) => {
  return db("comments").where("comment_id", id).first();
};

const create = (comment) => {
  return db("comments").insert(comment);
};
const findByIdAndUpdate = async (id, comment) => {
  await db("comments").where({ comment_id: id }).update({ comment });
  const updatedComment = await getById(id);
  return updatedComment;
};

const findByIdAndDelete = async (id) => {
  await db("comments").where({ comment_id: id }).del();
};

const getCommentsByUser = async (id) => {
  return db("comments as c")
    .leftJoin("tweets as t", "t.tweet_id", "c.tweet_id")
    .leftJoin("users as u", "u.user_id", "c.user_id")
    .where("c.user_id", id)
    .select("c.*", "t.tweet");
};

module.exports = {
  getAll,
  getById,
  create,
  findByIdAndUpdate,
  findByIdAndDelete,
  getCommentsByUser,
};
