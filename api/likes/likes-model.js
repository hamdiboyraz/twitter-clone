const db = require("../../data/db-config");

const getAll = () => {
  return db("likes as l")
    .leftJoin("tweets as t", "t.tweet_id", "l.tweet_id")
    .select("l.*", "t.tweet");
};

const getById = (id) => {
  return db("likes").where("like_id", id).first();
};

const create = (like) => {
  return db("likes").insert(like);
};

const findByIdAndUpdate = async (id) => {
  const query = await db("likes")
    .where("like_id", id)
    .select("isLiked")
    .first();
  await db("likes").where("like_id", id).update({ isLiked: !query.isLiked });
  const updatedLike = await getById(id);
  return updatedLike;
};

const getLikesByUser = (id) => {
  return db("likes as l")
    .leftJoin("tweets as t", "t.tweet_id", "l.tweet_id")
    .leftJoin("users as u", "u.user_id", "l.user_id")
    .where("l.user_id", id)
    .select("l.*", "t.tweet");
};

module.exports = {
  getAll,
  getById,
  create,
  findByIdAndUpdate,
  getLikesByUser,
};
