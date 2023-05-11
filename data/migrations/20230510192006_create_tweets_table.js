/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("tweets", (table) => {
    table.increments("tweet_id").primary();
    table.string("tweet").notNullable();
    table
      .integer("user_id")
      .references("user_id")
      .inTable("users")
      .onDelete("CASCADE") // will be delete this tweet when referenced user is deleted.
      .onUpdate("CASCADE");
    table.timestamps(true, true, true); // Same as object form
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("tweets");
};
