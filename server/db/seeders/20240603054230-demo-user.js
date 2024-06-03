"use strict";
const data = require("../../utils/testdata");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const user = await queryInterface.bulkInsert("users", data.UsersData);
    await queryInterface.bulkInsert("branch", data.BranchData);
    await queryInterface.bulkInsert("accounts", data.AccountsData);
    await queryInterface.bulkInsert("auth", data.AuthData);
    await queryInterface.bulkInsert("beneficiaries", data.BeneficiaryData);
    await queryInterface.bulkInsert("transactions", data.TransactionsData);

    return user;
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
