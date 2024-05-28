"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "branch",
      {
        branchId: {
          type: Sequelize.UUID,
          primaryKey: true,
          allowNull: false,
        },
        branch_name: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        email: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        phone_pin: {
          allowNull: false,
          type: Sequelize.INTEGER,
          validate: {
            notNull: {
              msg: "Phone pin cannot be null",
            },
            notEmpty: {
              msg: "Phone pin cannot be empty",
            },
          },
        },
        phone_number: {
          allowNull: false,
          type: Sequelize.STRING,
          validate: {
            notNull: {
              msg: "Phone number cannot be null",
            },
            notEmpty: {
              msg: "Phone number cannot be empty",
            },
          },
        },
        street: {
          allowNull: false,
          type: Sequelize.STRING,
          validate: {
            notNull: {
              msg: "Address:street cannot be null",
            },
            notEmpty: {
              msg: "Address:street cannot be empty",
            },
          },
        },
        city: {
          allowNull: false,
          type: Sequelize.STRING,
          validate: {
            notNull: {
              msg: "Address:city cannot be null",
            },
            notEmpty: {
              msg: "Address:city cannot be empty",
            },
          },
        },
        state: {
          allowNull: false,
          type: Sequelize.STRING,
          validate: {
            notNull: {
              msg: "Address:state cannot be null",
            },
            notEmpty: {
              msg: "Address:state cannot be empty",
            },
          },
        },
        country: {
          allowNull: false,
          type: Sequelize.STRING,
          validate: {
            notNull: {
              msg: "Address:country cannot be null",
            },
            notEmpty: {
              msg: "Address:country cannot be empty",
            },
          },
        },
        pincode: {
          allowNull: false,
          type: Sequelize.STRING,
          validate: {
            notNull: {
              msg: "Address:pincode cannot be null",
            },
            notEmpty: {
              msg: "Address:pincode cannot be empty",
            },
          },
        },
        IFSC: {
          allowNull: false,
          type: Sequelize.STRING,
          unique: true,
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
    await queryInterface.dropTable("branch");
  },
};
