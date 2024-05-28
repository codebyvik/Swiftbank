"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "accounts",
      {
        user_id: {
          allowNull: false,
          type: Sequelize.UUID,
          references: {
            model: "users",
            key: "id",
          },
        },
        account_id: {
          allowNull: false,
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          unique: true,
          primaryKey: true,
        },
        account_number: {
          type: Sequelize.STRING,
          unique: true,
          allowNull: false,
          validate: {
            notNull: {
              msg: "account number cannot be null",
            },
            notEmpty: {
              msg: "account number cannot be empty",
            },
          },
        },
        balance: {
          type: Sequelize.DECIMAL(10, 2),
          allowNull: false,
          validate: {
            notNull: {
              msg: "balance cannot be null",
            },
            notEmpty: {
              msg: "balance cannot be empty",
            },
            isDecimal: {
              msg: "balance should be in decimal",
            },
          },
        },
        account_type: {
          type: Sequelize.ENUM("savings", "current"),
          allowNull: false,
          validate: {
            notNull: {
              msg: "account type cannot be null",
            },
            notEmpty: {
              msg: "account type cannot be empty",
            },
          },
        },
        transaction_PIN: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            notNull: {
              msg: "transaction pin cannot be null",
            },
            notEmpty: {
              msg: "transaction pin cannot be empty",
            },
          },
        },
        branch_id: {
          allowNull: false,
          type: Sequelize.UUID,
          references: {
            model: "branch",
            key: "branchId",
          },
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
    await queryInterface.dropTable("accounts");
  },
};
