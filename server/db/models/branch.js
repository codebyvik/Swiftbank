"use strict";

const { DataTypes } = require("sequelize");
const sequelize = require("../../config/connectToDB");
const accounts = require("../models/accounts");

const branch = sequelize.define(
  "branch",
  {
    branchId: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
    },
    branch_name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    phone_pin: {
      allowNull: false,
      type: DataTypes.INTEGER,
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
      type: DataTypes.STRING,
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
      type: DataTypes.STRING,
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
      type: DataTypes.STRING,
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
      type: DataTypes.STRING,
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
      type: DataTypes.STRING,
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
      type: DataTypes.STRING,
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
      type: DataTypes.STRING,
      unique: true,
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

module.exports = branch;
