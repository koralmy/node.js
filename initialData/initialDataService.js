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
  cards.forEach(async (card) => {
    try {
      const userId = "6376274068d78742d84f31d2";
      card = await normalizeCard(card, userId);

      // Check if card already exists
      const existingCard = await findCardByEmail(card.email);
      if (existingCard) {
        console.log(
          chalk.yellow(`Card with email ${card.email} already exists`)
        );
        return;
      }

      await createCard(card);
      return;
    } catch (error) {
      return console.log(chalk.redBright(error.message));
    }
  });
};

const generateInitialUsers = async () => {
  const { users } = data;
  users.forEach(async (user) => {
    try {
      user = await normalizeUser(user);
      user.password = generateUserPassword(user.password);

      // Check if user already exists
      const existingUser = await findUserByEmail(user.email);
      if (existingUser) {
        console.log(
          chalk.yellow(`User with email ${user.email} already exists`)
        );
        return;
      }

      await registerUser(user);
      return;
    } catch (error) {
      return console.log(chalk.redBright(error.message));
    }
  });
};

exports.generateInitialCards = generateInitialCards;
exports.generateInitialUsers = generateInitialUsers;
