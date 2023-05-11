/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("tweets").truncate();
  await knex("tweets").insert([
    {
      tweet: "This is my first tweet",
      user_id: 1,
    },
    {
      tweet: "This is my second tweet",
      user_id: 1,
    },
    {
      tweet: "What a beautiful day!",
      user_id: 2,
    },
    {
      tweet: "I can't believe it's already Friday!",
      user_id: 3,
    },
    {
      tweet: "I just learned a new programming language!",
      user_id: 4,
    },
    {
      tweet: "I'm going on vacation next week",
      user_id: 5,
    },
    {
      tweet: "I won a marathon today!",
      user_id: 6,
    },
    {
      tweet: "I'm so excited for the new movie coming out this weekend",
      user_id: 7,
    },
    {
      tweet: "I'm attending a wedding tomorrow",
      user_id: 8,
    },
    {
      tweet: "I'm feeling inspired today!",
      user_id: 9,
    },
    {
      tweet: "I just finished reading a great book",
      user_id: 10,
    },
  ]);
};
