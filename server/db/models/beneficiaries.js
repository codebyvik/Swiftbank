"use strict";
const { DataTypes } = require("sequelize");

const sequelize = require("../../config/connectToDB");
const user = require("./user");
const accounts = require("./accounts");

const beneficiary = sequelize.define(
  "beneficiaries",
  {
    customer_id: {
      allowNull: false,
      type: DataTypes.UUID,
      references: {
        model: "users",
        key: "id",
      },
    },
    beneficiary_id: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
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
      type: DataTypes.STRING,
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
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "accounts",
        key: "account_number",
      },
    },
    transfer_limit: {
      type: DataTypes.DECIMAL(10, 0),
      allowNull: false,
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

accounts.hasMany(beneficiary, {
  foreignKey: "account_number",
});

user.hasMany(beneficiary, {
  foreignKey: "customer_id",
});

beneficiary.belongsTo(accounts, {
  foreignKey: "account_number",
});

beneficiary.belongsTo(user, {
  foreignKey: "customer_id",
});

module.exports = beneficiary;
