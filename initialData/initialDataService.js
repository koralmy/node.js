const chalk = require("chalk");
const normalizeCard = require("../cards/helpers/normalizeCard");
const {
  createCard,
  findCardByEmail,
} = require("../cards/models/cardsAccessDataService");
const {
  registerUser,
  findUserByEmail,
} = require("../users/models/usersAccessDataService");
const data = require("./initialData.json");
const normalizeUser = require("../users/helpers/normalizeUser");
const { generateUserPassword } = require("../users/helpers/bcrypt");

const generateInitialCards = async () => {
  const { cards } = data;
  for (const card of cards) {
    try {
      const userId = "6376274068d78742d84f31d2";
      const normalizedCard = await normalizeCard(card, userId);

      // Check if card already exists
      const existingCard = await findCardByEmail(normalizedCard.email);
      if (existingCard) {
        continue; // Skip if card already exists
      }

      await createCard(normalizedCard);
    } catch (error) {
      console.log(chalk.redBright(error.message));
    }
  }
};

const generateInitialUsers = async () => {
  const { users } = data;
  for (const user of users) {
    try {
      const normalizedUser = await normalizeUser(user);
      normalizedUser.password = generateUserPassword(normalizedUser.password);

      // Check if user already exists
      const existingUser = await findUserByEmail(normalizedUser.email);
      if (existingUser) {
        continue; // Skip if user already exists
      }

      await registerUser(normalizedUser);
    } catch (error) {
      console.log(chalk.redBright(error.message));
    }
  }
};

exports.generateInitialCards = generateInitialCards;
exports.generateInitialUsers = generateInitialUsers;
