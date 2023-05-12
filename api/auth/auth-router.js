const router = require("express").Router();
const bcrypt = require("bcryptjs");
const { HASH_ROUND } = require("../../config/config");
const generateToken = require("../utils/generateToken");

const userModel = require("../users/users-model");
const authMiddleware = require("./auth-middleware");

// Base URL: /api/v1/auth

router.post(
  "/register",
  authMiddleware.registerPayloadCheck,
  async (req, res, next) => {
    try {
      let { username, email, password } = req.body;
      password = bcrypt.hashSync(password, Number(HASH_ROUND));
      const newUser = await userModel.create({ username, email, password });
      return res
        .status(201)
        .json({ message: "Registered Successfully", data: newUser });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/login",
  authMiddleware.loginPayloadCheck,
  authMiddleware.credentialsCheck,
  async (req, res, next) => {
    try {
      const { username } = req.body;
      const user = await userModel.getBy("username", username);
      const token = generateToken(user, res);
      return res
        .status(200)
        .json({ message: `${user.username} is back!`, token });
    } catch (error) {
      next(error);
    }
  }
);

router.get("/logout", async (req, res, next) => {
  return res.status(200).json({ message: "Successfully logged out." });
});

module.exports = router;
