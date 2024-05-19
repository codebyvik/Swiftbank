"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "auth",
      {
        user_id: {
          allowNull: false,
          type: Sequelize.UUID,
          references: {
            model: "users",
            key: "id",
          },
        },
        email: {
          type: Sequelize.STRING,
          unique: true,
          primaryKey: true,
          allowNull: false,
          references: {
            model: "users",
            key: "email",
          },
          onUpdate: "CASCADE",
          validate: {
            notNull: {
              msg: "Email cannot be null",
            },
            notEmpty: {
              msg: "Email cannot be empty",
            },
          },
        },
        password: {
          type: Sequelize.STRING,
          unique: true,
          allowNull: false,
          validate: {
            notNull: {
              msg: "password cannot be null",
            },
            notEmpty: {
              msg: "password cannot be empty",
            },
          },
        },
        phone_pin: {
          allowNull: false,
          type: Sequelize.INTEGER,
          validate: {
            notNull: {
              msg: "phone pin cannot be null",
            },
            notEmpty: {
              msg: "phone pin cannot be empty",
            },
          },
        },
        phone_number: {
          allowNull: false,
          type: Sequelize.STRING,
          unique: true,
          validate: {
            notNull: {
              msg: "phone number cannot be null",
            },
            notEmpty: {
              msg: "phone number cannot be empty",
            },
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
    await queryInterface.dropTable("auth");
  },
};
