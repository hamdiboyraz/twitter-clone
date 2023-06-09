const express = require("express");
const morgan = require("morgan");
const authRouter = require("./auth/auth-router");
const usersRouter = require("./users/users-router");
const tweetsRouter = require("./tweets/tweets-router");
const commentsRouter = require("./comments/comments-router");
const likesRouter = require("./likes/likes-router");
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
server.use("/api/v1/users", usersRouter);
server.use("/api/v1/tweets", tweetsRouter);
server.use("/api/v1/comments", commentsRouter);
server.use("/api/v1/likes", likesRouter);

// Global Error Handler
server.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    statusCode: err.status,
    message: err.message,
  });
});

// Export
module.exports = server;
