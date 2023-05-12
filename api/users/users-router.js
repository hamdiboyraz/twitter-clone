const router = require("express").Router();
const userModel = require("./users-model");
const authMiddleware = require("../auth/auth-middleware");

// Base URL: /api/v1/users

router.get("/me", async (req, res, next) => {});
router.get("/me/tweets", async (req, res, next) => {});
router.get("/me/comments", async (req, res, next) => {});
router.get("/me/likes", async (req, res, next) => {});

// Get All Users
router.get("/", authMiddleware.isAuthenticated, async (req, res, next) => {
  const users = await userModel.getAll();
  return res.status(200).json(users);
});
// Get User
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  const user = await userModel.getById(id);
  return res.status(200).json(user);
});
// Update User
router.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { username } = req.body;
  const updatedUser = await userModel.findByIdAndUpdate(id, { username });
  return res.status(200).json(updatedUser);
});
// Delete User
router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  await userModel.findByIdAndDelete(id);
  return res.status(204).send();
});

module.exports = router;
