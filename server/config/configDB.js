const dotenv = require("dotenv").config();
module.exports = {
  development: {
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    dialect: "postgres",
    dialectOptions: {
      useUTC: false, // for reading from database
    },
    timezone: "+05:30",
  },
  test: {
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    host: process.env.DATABASE_HOST,
    dialect: "postgres",
    dialectOptions: {
      useUTC: false, // for reading from database
    },
    timezone: "+05:30",
  },
  production: {
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    host: process.env.DATABASE_HOST,
    dialect: "postgres",
    dialectOptions: {
      useUTC: false, // for reading from database
    },
    timezone: "+05:30",
  },
};
