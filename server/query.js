const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("./config/connectToDB");
const queryInterface = sequelize.getQueryInterface();

queryInterface.addColumn("users", "isActive", { type: DataTypes.BOOLEAN, defaultValue: false });
