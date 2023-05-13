const router = require("express").Router();
const userModel = require("./users-model");
const userMiddleware = require("./users-middleware");
const authMiddleware = require("../auth/auth-middleware");

// Base URL: /api/v1/users

// Below routes need auth
router.use(authMiddleware.isAuthenticated);

// Get Profile
router.get("/me", async (req, res, next) => {
  delete req.user.exp;
  delete req.user.iat;
  delete req.user.role;
  return res.status(200).json(req.user);
});

// Update Profile
router.put("/me", userMiddleware.payLoadCheck, async (req, res, next) => {
  try {
    const { username, email } = req.body;
    const updatedMe = await userModel.findByIdAndUpdate(req.user.userId, {
      username,
      email,
    });

    return res.status(200).json(updatedMe);
  } catch (error) {
    next(error);
  }
});

// Delete Profile
router.delete("/me", async (req, res, next) => {
  try {
    await userModel.findByIdAndDelete(req.user.userId);
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
});

router.get("/me/tweets", async (req, res, next) => {});
router.get("/me/comments", async (req, res, next) => {});
router.get("/me/likes", async (req, res, next) => {});

// Get All Users
//Below routes are admin only
router.use(authMiddleware.protected);

router.get("/", async (req, res, next) => {
  const users = await userModel.getAll();
  return res.status(200).json(users);
});

// Get User
router.get("/:id", userMiddleware.checkUserId, async (req, res, next) => {
  const { id } = req.params;
  const user = await userModel.getById(id);
  return res.status(200).json(user);
});
// Update User
router.put("/:id", userMiddleware.checkUserId, async (req, res, next) => {
  const { id } = req.params;
  const { username, email, role, active } = req.body;
  const updatedUser = await userModel.findByIdAndUpdate(id, {
    username,
    email,
    role,
    active,
  });
  return res.status(200).json(updatedUser);
});
// Delete User
router.delete("/:id", userMiddleware.checkUserId, async (req, res, next) => {
  const { id } = req.params;
  await userModel.findByIdAndDelete(id);
  return res.status(204).send();
});

module.exports = router;
