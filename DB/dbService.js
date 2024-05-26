const mongoose = require("mongoose");
const config = require("config");
const chalk = require("chalk");

const connectToDb = () => {
  if (mongoose.connection.readyState === 0) {
    console.log(chalk.green("MongoDB connection is not active"));
  } else {
    console.log(chalk.green("MongoDB connection is active"));
  }
};

module.exports = connectToDb;
