const express = require("express");
const morgan = require("morgan");
const authRouter = require("./auth/auth-router");
const userRouter = require("./users/users-router");

// Initialize express server
const server = express();

// Global Middlewares
server.use(express.json());
server.use(morgan("dev"));

// API
// server.use("/", (req, res) => {
//   res.json({ message: "Server is up and running!..." });
// });

server.use("/api/v1/auth", authRouter);
server.use("/api/v1/users", userRouter);
// server.use("/api/v1/tweets");
// server.use("/api/v1/comments");
// server.use("/api/v1/likes");

// Global Error Handler
server.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    statusCode: err.status,
    message: err.message,
  });
});

// Export
module.exports = server;
