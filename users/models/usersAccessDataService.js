const DB = process.env.DB || "MONGODB";
const User = require("./mongodb/User");
const lodash = require("lodash");
const { comparePassword } = require("../helpers/bcrypt");
const { generateAuthToken } = require("../../auth/Providers/jwt");
const { handleBadRequest } = require("../../utils/handleErrors");

const registerUser = async (normalizedUser) => {
  if (DB === "MONGODB") {
    try {
      const { email } = normalizedUser;
      let user = await User.findOne({ email });
      if (user) throw new Error("User already registered");

      user = new User(normalizedUser);
      user = await user.save();

      user = lodash.pick(user, ["name", "email", "_id"]);
      return Promise.resolve(user);
    } catch (error) {
      error.status = 400;
      return Promise.reject(error);
    }
  }
  return Promise.resolve("registerUser new user not in mongodb");
};

const findUserByEmail = async (email) => {
  if (DB === "MONGODB") {
    try {
      const user = await User.findOne({ email });
      return Promise.resolve(user);
    } catch (error) {
      error.status = 404;
      return Promise.reject(error);
    }
  }
  return Promise.resolve("findUserByEmail not in mongodb");
};

const loginUser = async ({ email, password }) => {
  if (DB === "MONGODB") {
    try {
      const user = await User.findOne({ email });
      if (!user)
        throw new Error("Authentication Error: Invalid email or password");

      const validPassword = comparePassword(password, user.password);
      if (!validPassword)
        throw new Error("Authentication Error: Invalid email or password");

      const token = generateAuthToken(user);
      return Promise.resolve(token);
    } catch (error) {
      error.status = 400;
      return Promise.reject(error);
    }
  }
  return Promise.resolve("loginUser user not in mongodb");
};

const getUsers = async () => {
  if (DB === "MONGODB") {
    try {
      const users = await User.find({}, { password: 0, __v: 0 });
      return Promise.resolve(users);
    } catch (error) {
      error.status = 404;
      return Promise.reject(error);
    }
  }
  return Promise.resolve("get users not in mongodb");
};

const getUser = async (userId) => {
  if (DB === "MONGODB") {
    try {
      let user = await User.findById(userId, {
        password: 0,
        __v: 0,
      });
      if (!user) throw new Error("Could not find this user in the database");
      return Promise.resolve(user);
    } catch (error) {
      error.status = 404;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("get user not in mongodb");
};

const updateUser = async (userId, updatedUser) => {
  if (DB === "MONGODB") {
    try {
      const user = await User.findByIdAndUpdate(userId, updatedUser, {
        new: true,
      });
      if (!user) throw new Error("User not found");
      return Promise.resolve(user);
    } catch (error) {
      error.status = 400;
      return Promise.reject(error);
    }
  }
  return Promise.resolve("User update not supported in non-MongoDB databases");
};

const changeUserBusinessStatus = async (userId) => {
  if (DB === "MONGODB") {
    try {
      const user = await User.findById(userId);
      if (!user) throw new Error("User not found");

      console.log(`Current business status: ${user.isBusiness}`);
      user.isBusiness = !user.isBusiness; // שינוי הסטטוס העסקי
      await user.save(); // שמירת השינויים במסד הנתונים
      console.log(`Updated business status: ${user.isBusiness}`);

      return Promise.resolve(user);
    } catch (error) {
      error.status = 400;
      return Promise.reject(error);
    }
  }
  return Promise.resolve(
    "User business status change not supported in non-MongoDB databases"
  );
};

const deleteUser = async (userId) => {
  if (DB === "MONGODB") {
    try {
      const user = await User.findByIdAndDelete(userId);
      if (!user) throw new Error("User not found");
      return Promise.resolve(`User with id ${userId} deleted!`);
    } catch (error) {
      error.status = 400;
      return Promise.reject(error);
    }
  }
  return Promise.resolve(
    "User deletion not supported in non-MongoDB databases"
  );
};

exports.registerUser = registerUser;
exports.findUserByEmail = findUserByEmail;
exports.loginUser = loginUser;
exports.getUsers = getUsers;
exports.getUser = getUser;
exports.updateUser = updateUser;
exports.changeUserBusinessStatus = changeUserBusinessStatus;
exports.deleteUser = deleteUser;
