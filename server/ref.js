/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function (knex) {
  return knex.schema
    .createTable("users", function (table) {
      //
      table.uuid("user_id").unique().defaultTo(knex.fn.uuid()).primary();
      table.enu("user_type", ["customer", "admin"]).notNullable();
      table.string("first_name", [100]).notNullable();
      table.string("last_name", [100]).notNullable();
      table.string("email").notNullable().unique();
      table.integer("phone_pin").notNullable();
      table.string("phone_number").notNullable().unique();

      // AVATAR
      table.string("avatar");
      // GENDER
      table.enu("user_gender", ["male", "female", "others"]).notNullable();
      // NATIONALITY
      table.string("nationality").notNullable();
      // AGE
      table.integer("user_age").notNullable();
      // DOB
      table.string("user_dateOfBirth").notNullable();
      // PROFESSION
      table.enu("user_profession", ["salaried", "student", "others"]).notNullable();
      // MARRIAGE STATUS
      table.enu("user_maritalStatus", ["unmarried", "married"]).notNullable();

      // address
      table.string("street").notNullable();
      table.string("city").notNullable();
      table.string("state").notNullable();
      table.string("country").notNullable();
      table.string("pincode").notNullable();

      table.timestamps({ useTimestamps: true, defaultToNow: true });
    })
    .createTable("auth", function (table) {
      table.uuid("user_id").references("user_id").inTable("users");
      table.string("email").references("email").inTable("users");
      table.integer("phone_pin").notNullable();
      table.string("phone_number").references("phone_number").inTable("users");
      table.string("password").notNullable();
      table.timestamps({ useTimestamps: true, defaultToNow: true });
    })
    .createTable("accounts", function (table) {
      table.uuid("user_id").references("user_id").inTable("users");
      table.uuid("account_id").unique().defaultTo(knex.fn.uuid()).primary();
      table.string("account_number").unique();
      table.decimal("balance", [10], [2]).notNullable();
      table.enum("account_type", ["savings", "current"]).notNullable();
      table.string("transaction_PIN").notNullable();
      table.timestamps({ useTimestamps: true, defaultToNow: true });
    })

    .createTable("transaction", function (table) {
      table.uuid("user_id").references("user_id").inTable("users");
      table.uuid("transaction_id").unique().notNullable().primary().defaultTo(knex.fn.uuid());
      table.string("from_account_id").references("account_number").inTable("accounts");
      table.string("to_account_id").references("account_number").inTable("accounts");
      table.decimal("amount_transferred", [10], [2]).notNullable();
      table.enum("transaction_type", ["debit", "credit"]).notNullable();
      table.string("description").notNullable();
      table.timestamps({ useTimestamps: true, defaultToNow: true });
    })

    .createTable("beneficiary", function (table) {
      table.uuid("customer_id").references("user_id").inTable("users");
      table.string("beneficiary_id").unique().notNullable().primary();
      table.string("name").notNullable();
      table.string("bank_name").notNullable();
      table.string("account_number").notNullable();
      table.decimal("transfer_limit", [10], [2]).notNullable();
      table.timestamps({ useTimestamps: true, defaultToNow: true });
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTable("auth")
    .dropTable("beneficiary")
    .dropTable("transaction")
    .dropTable("accounts")
    .dropTable("users");
};
