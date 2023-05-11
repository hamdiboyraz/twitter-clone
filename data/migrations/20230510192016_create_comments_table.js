/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("comments", (table) => {
    table.increments("comment_id").primary();
    table.string("comment").notNullable();
    table
      .integer("tweet_id")
      .references("tweet_id")
      .inTable("tweets")
      .onDelete("CASCADE"); // will be delete this comment when referenced tweet is deleted.
    table
      .integer("user_id")
      .references("user_id")
      .inTable("users")
      .onDelete("CASCADE") // will be delete this comment when referenced user is deleted.
      .onUpdate("CASCADE");
    table.timestamps(true, true, true); // Same as object form
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("comments");
};
