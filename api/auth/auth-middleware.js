const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../users/users-model.js");
const { JWT_SECRET } = require("../../config/config.js");

const registerPayloadCheck = async (req, res, next) => {
  try {
    const { username, password, passwordConfirm, email } = req.body;

    if (username.trim().length < 6 || username.trim().length > 20) {
      return next({
        status: 400,
        message: "Username must be between 6 and 20 characters long",
      });
    }

    if (password.length < 8 || password.length > 50) {
      return next({
        status: 400,
        message: "Password must be between 8 and 50 characters long",
      });
    }

    if (password !== passwordConfirm) {
      return next({
        status: 400,
        message: "Passwords do not match!",
      });
    }

    const isUsernameExist = await userModel.getBy("username", username);
    if (isUsernameExist) {
      return next({
        status: 400,
        message: "Username already exists",
      });
    }

    const isEmailExist = await userModel.getBy("email", email);
    if (isEmailExist) {
      return next({
        status: 400,
        message: "Email already exists",
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};

const loginPayloadCheck = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return next({
        status: 400,
        message: "Username and password are required",
      });
    }
    next();
  } catch (error) {
    next(error);
  }
};

const credentialsCheck = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await userModel.getBy("username", username);

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return next({
        status: 401,
        message: "Invalid username or password",
      });
    }
    next();
  } catch (error) {
    next(error);
  }
};

// Authorization
const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return next({ status: 401, message: "You must logged in." });
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    next({
      status: 401,
      message: "Invalid token",
    });
  }
};

const protected = async (req, res, next) => {
  try {
    const { role } = req.user;
    if (role !== "admin") {
      return next({ status: 403, message: "Forbidden." });
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerPayloadCheck,
  loginPayloadCheck,
  credentialsCheck,
  isAuthenticated,
  protected,
};
