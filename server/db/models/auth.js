"use strict";
const { DataTypes } = require("sequelize");

const sequelize = require("../../config/connectToDB");

const auth = sequelize.define(
  "auth",
  {
    user_id: {
      allowNull: false,
      type: DataTypes.UUID,
      references: {
        model: "users",
        key: "id",
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      primaryKey: true,
      allowNull: false,
      references: {
        model: "users",
        key: "email",
      },
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
      type: DataTypes.STRING,
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
      type: DataTypes.INTEGER,
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
      type: DataTypes.STRING,
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
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = auth;
