/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("likes").truncate();
  await knex("likes").insert([
    {
      user_id: 1,
      tweet_id: 1,
    },
    {
      user_id: 2,
      tweet_id: 1,
    },
    {
      user_id: 3,
      tweet_id: 1,
    },
    {
      user_id: 4,
      tweet_id: 2,
    },
    {
      user_id: 5,
      tweet_id: 2,
    },
    {
      user_id: 6,
      tweet_id: 2,
    },
    {
      user_id: 7,
      tweet_id: 3,
    },
    {
      user_id: 8,
      tweet_id: 3,
    },
    {
      user_id: 9,
      tweet_id: 4,
    },
    {
      user_id: 10,
      tweet_id: 4,
    },
  ]);
};
