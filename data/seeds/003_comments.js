/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("comments").truncate();
  await knex("comments").insert([
    {
      user_id: 1,
      tweet_id: 1,
      comment: "Great post, thanks for sharing!",
    },
    {
      user_id: 2,
      tweet_id: 1,
      comment: "I completely agree, thanks for writing this!",
    },
    {
      user_id: 3,
      tweet_id: 2,
      comment: "Interesting article, I learned a lot.",
    },
    {
      user_id: 4,
      tweet_id: 2,
      comment: "Thanks for sharing your knowledge with us!",
    },
    {
      user_id: 5,
      tweet_id: 3,
      comment: "This is a great resource, thank you!",
    },
    {
      user_id: 6,
      tweet_id: 3,
      comment: "I found this very helpful, thanks!",
    },
    {
      user_id: 7,
      tweet_id: 4,
      comment: "I have a question about this, can you clarify?",
    },
    {
      user_id: 8,
      tweet_id: 4,
      comment: "I'm not sure I understand, can you explain more?",
    },
    {
      user_id: 9,
      tweet_id: 5,
      comment: "I really enjoyed reading this, thanks!",
    },
    {
      user_id: 10,
      tweet_id: 5,
      comment: "This was very informative, thank you for sharing!",
    },
  ]);
};
