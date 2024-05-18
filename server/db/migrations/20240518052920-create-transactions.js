"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "transactions",
      {
        user_id: {
          allowNull: false,
          type: Sequelize.UUID,
          references: {
            model: "users",
            key: "id",
          },
        },
        transaction_id: {
          primaryKey: true,
          allowNull: false,
          type: Sequelize.UUID,
          unique: true,
        },
        from_account_id: {
          allowNull: false,
          type: Sequelize.UUID,
          references: {
            model: "accounts",
            key: "account_id",
          },
        },
        to_account_id: {
          allowNull: false,
          type: Sequelize.UUID,
          references: {
            model: "accounts",
            key: "account_id",
          },
        },
        amount_transferred: {
          type: Sequelize.DECIMAL(10, 2),
          allowNull: false,
        },
        transaction_type: {
          type: Sequelize.ENUM("credit", "debit"),
          allowNull: false,
        },
        description: {
          type: Sequelize.TEXT,
        },

        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      },
      {
        freezeTableName: true,
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("transactions");
  },
};
