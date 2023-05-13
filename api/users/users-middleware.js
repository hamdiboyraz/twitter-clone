const userModel = require("../users/users-model.js");

const payLoadCheck = async (req, res, next) => {
  try {
    const { username, email } = req.body;
    if (username.trim().length < 6 || username.trim().length > 20) {
      return next({
        status: 400,
        message: "Username must be between 6 and 20 characters long",
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

const checkUserId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const isExist = await userModel.getById(id);
    if (!isExist) {
      next({ status: 404, message: "User is not found." });
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  payLoadCheck,
  checkUserId,
};
