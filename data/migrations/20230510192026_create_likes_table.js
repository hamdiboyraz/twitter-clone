/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("likes", function (table) {
    table.increments("like_id").primary();
    table.boolean("isLiked").defaultTo(true);
    table
      .integer("user_id")
      .references("user_id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table
      .integer("tweet_id")
      .references("tweet_id")
      .inTable("tweets")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table.timestamps(true, true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("likes");
};
