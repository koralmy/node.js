require("dotenv").config();
const chalk = require("chalk");
const express = require("express");
const { handleError } = require("./utils/handleErrors");
const app = express();
const router = require("./router/router");
const cors = require("./middlewares/cors");
const logger = require("./logger/loggerService");
const config = require("config");
const {
  generateInitialCards,
  generateInitialUsers,
} = require("./initialData/initialDataService");
const mongoose = require("mongoose");

// Server start
const PORT = process.env.PORT || config.get("PORT") || 8181;

// Middleware
app.use(cors);
app.use(logger);
app.use(express.json());
app.use(express.static("./public"));
app.use(router);

// Error handling middleware
app.use((err, req, res, next) => {
  handleError(res, 500, err.message);
});

// MongoDB connection
if (mongoose.connection.readyState === 0) {
  console.log(process.env.MONGO_URI);
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log(chalk.green("Connected to MongoDB"));
      app.listen(PORT, () => {
        console.log(chalk.blueBright(`Listening on: http://localhost:${PORT}`));
      });

      generateInitialCards();
      generateInitialUsers();
    })
    .catch((err) =>
      console.log(chalk.red("Failed to connect to MongoDB", err))
    );
}
