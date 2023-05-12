const dotenv = require("dotenv").config();
const { PORT } = require("./config/config");
const server = require("./api/server");

server.listen(PORT, () => {
  console.log(`\n== API running on port ${PORT} ==\n`);
});
