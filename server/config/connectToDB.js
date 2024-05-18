const { Sequelize } = require("sequelize");

const config = require("./configDB");
const env = process.env.NODE_ENV || "development";

const sequelize = new Sequelize(config[env]);

async function checkConnection() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

checkConnection();

module.exports = sequelize;
