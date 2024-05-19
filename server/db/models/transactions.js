"use strict";

const { DataTypes } = require("sequelize");

const sequelize = require("../../config/connectToDB");
const user = require("./user");
const accounts = require("./accounts");

const transactions = sequelize.define(
  "transactions",
  {
    user_id: {
      allowNull: false,
      type: DataTypes.UUID,
      references: {
        model: "users",
        key: "id",
      },
    },
    transaction_id: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
    },
    from_account_id: {
      allowNull: false,
      type: DataTypes.UUID,
      references: {
        model: "accounts",
        key: "account_id",
      },
    },
    to_account_id: {
      allowNull: false,
      type: DataTypes.UUID,
      references: {
        model: "accounts",
        key: "account_id",
      },
    },
    amount_transferred: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    transaction_type: {
      type: DataTypes.ENUM("credit", "debit"),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
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

module.exports = transactions;
