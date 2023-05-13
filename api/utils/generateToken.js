const jwt = require("jsonwebtoken");

const { JWT_SECRET, JWT_EXPIRES_IN } = require("../../config/config.js");

const generateToken = (user) => {
  const payload = {
    user_id: user.user_id,
    username: user.username,
    email: user.email,
    role: user.role,
  };

  const secret = JWT_SECRET;
  const options = {
    expiresIn: JWT_EXPIRES_IN,
  };

  return jwt.sign(payload, secret, options);
};

module.exports = generateToken;
