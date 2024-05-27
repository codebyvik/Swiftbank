"use strict";
const { DataTypes } = require("sequelize");

const sequelize = require("../../config/connectToDB");
const transactions = require("./transactions");
const user = require("./user");

const accounts = sequelize.define(
  "accounts",
  {
    user_id: {
      allowNull: false,
      type: DataTypes.UUID,
      references: {
        model: "users",
        key: "id",
      },
    },
    account_id: {
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
      primaryKey: true,
    },
    account_number: {
      type: DataTypes.STRING,
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
      type: DataTypes.DECIMAL(10, 2),
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
      type: DataTypes.ENUM("savings", "current"),
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
      type: DataTypes.STRING,

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

accounts.hasMany(transactions, {
  foreignKey: "to_account_id",
  as: "To_account_id",
  onUpdate: "CASCADE",
});

accounts.hasMany(transactions, {
  foreignKey: "from_account_id",
  as: "From_account_id",
  onUpdate: "CASCADE",
});

transactions.belongsTo(accounts, {
  foreignKey: "from_account_id",
  as: "From_account_id",
});

transactions.belongsTo(accounts, {
  foreignKey: "to_account_id",
  as: "To_account_id",
});

module.exports = accounts;
