const express = require("express");

// Initialize express server
const server = express();

// Global Middlewares
server.use(express.json());

// API
server.use("/", (req, res) => {
  res.json({ message: "Server is up and running!..." });
});

// Global Error Handler
server.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    customMessage: "Bir hata oluştu...",
    message: err.message,
  });
});

// Export
module.exports = server; 
