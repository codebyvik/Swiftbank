"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "beneficiaries",
      {
        customer_id: {
          allowNull: false,
          type: Sequelize.UUID,
          references: {
            model: "users",
            key: "id",
          },
        },
        beneficiary_id: {
          primaryKey: true,
          allowNull: false,
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          unique: true,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            notNull: {
              msg: "Benificiary name cannot be null",
            },
            notEmpty: {
              msg: "Benificiary name cannot be empty",
            },
          },
        },
        bank_name: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            notNull: {
              msg: "Benificiary bank cannot be null",
            },
            notEmpty: {
              msg: "Benificiary bank cannot be empty",
            },
          },
        },
        account_number: {
          type: Sequelize.STRING,
          allowNull: false,
          references: {
            model: "accounts",
            key: "account_number",
          },
        },
        transfer_limit: {
          type: Sequelize.DECIMAL(10, 0),
          allowNull: false,
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
    await queryInterface.dropTable("beneficiaries");
  },
};
