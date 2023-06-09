const db = require("../../data/db-config");

const getAll = () => {
  return db("tweets as t")
    .leftJoin("users as u", "u.user_id", "t.user_id")
    .select("t.*", "u.username", "u.email");
};

const getById = (id) => {
  return db("tweets").where("tweet_id", id).first();
};

const create = (tweet) => {
  return db("tweets").insert(tweet);
};

const findByIdAndUpdate = async (id, tweet) => {
  await db("tweets").where({ tweet_id: id }).update({ tweet });
  const updatedTweet = await getById(id);
  return updatedTweet;
};

const findByIdAndDelete = async (id) => {
  await db("tweets").where({ tweet_id: id }).del();
};

const getTweetsByUser = async (id) => {
  return db("tweets as t")
    .leftJoin("users as u", "u.user_id", "t.user_id")
    .where("t.user_id", id)
    .select("t.*");
};

module.exports = {
  getAll,
  getById,
  create,
  findByIdAndUpdate,
  findByIdAndDelete,
  getTweetsByUser,
};
