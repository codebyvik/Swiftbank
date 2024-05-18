"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "users",
      {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          unique: true,
        },
        first_name: {
          allowNull: false,
          type: Sequelize.STRING,
          validate: {
            notNull: {
              msg: "First Name cannot be null",
            },
            notEmpty: {
              msg: "First Name cannot be empty",
            },
          },
        },
        last_name: {
          allowNull: false,
          type: Sequelize.STRING,
          validate: {
            notNull: {
              msg: "Last Name cannot be null",
            },
            notEmpty: {
              msg: "Last Name cannot be empty",
            },
          },
        },
        email: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.STRING,
          unique: true,
          validate: {
            notNull: {
              msg: "Email cannot be null",
            },
            notEmpty: {
              msg: "Email cannot be empty",
            },
          },
        },
        user_type: {
          allowNull: false,
          type: Sequelize.ENUM("customer", "admin"),
          validate: {
            notNull: {
              msg: "User type cannot be null",
            },
            notEmpty: {
              msg: "User type cannot be empty",
            },
          },
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
          unique: true,
          validate: {
            notNull: {
              msg: "Phone number cannot be null",
            },
            notEmpty: {
              msg: "Phone number cannot be empty",
            },
          },
        },
        avatar: {
          type: Sequelize.STRING,
        },
        user_dateOfBirth: {
          allowNull: false,
          type: Sequelize.STRING,
          validate: {
            notNull: {
              msg: "DOB cannot be null",
            },
            notEmpty: {
              msg: "DOB cannot be empty",
            },
          },
        },
        user_profession: {
          allowNull: false,
          type: Sequelize.ENUM("salaried", "student", "unemployed", "others"),
          validate: {
            notNull: {
              msg: "Profession  cannot be null",
            },
            notEmpty: {
              msg: "Profession cannot be empty",
            },
          },
        },
        user_maritalStatus: {
          allowNull: false,
          type: Sequelize.ENUM("married", "unmarried", "others"),
          validate: {
            notNull: {
              msg: "Marital status cannot be null",
            },
            notEmpty: {
              msg: "Marital status cannot be empty",
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
        nationality: {
          allowNull: false,
          type: Sequelize.STRING,
          validate: {
            notNull: {
              msg: "Nationality cannot be null",
            },
            notEmpty: {
              msg: "Nationality cannot be empty",
            },
          },
        },
        user_gender: {
          allowNull: false,
          type: Sequelize.ENUM("male", "female", "others"),
          validate: {
            notNull: {
              msg: "Gender cannot be null",
            },
            notEmpty: {
              msg: "Gender cannot be empty",
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
    await queryInterface.dropTable("users");
  },
};
