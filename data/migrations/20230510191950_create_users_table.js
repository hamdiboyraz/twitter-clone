/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("user_id").primary();
    table.string("username").notNullable();
    table.string("email").notNullable();
    table.string("password").notNullable();
    table.string("role").notNullable().defaultTo("user");
    table.timestamps({
      useTimestamps: true,
      defaultToNow: true,
      useCamelCase: true,
    });
    table.boolean("active").defaultTo(true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};
