const router = require("express").Router();
const userModel = require("./users-model");
const userMiddleware = require("./users-middleware");
const authMiddleware = require("../auth/auth-middleware");
const likeModel = require("../likes/likes-model");

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
  try {
    return res.status(200).json({ "Total Users": users.length, users });
  } catch (error) {
    next(error);
  }
});

// Get User
router.get("/:id", userMiddleware.checkUserId, async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await userModel.getById(id);
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});
// Update User
router.put("/:id", userMiddleware.checkUserId, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { username, email, role, active } = req.body;
    const updatedUser = await userModel.findByIdAndUpdate(id, {
      username,
      email,
      role,
      active,
    });
    return res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
});
// Delete User
router.delete("/:id", userMiddleware.checkUserId, async (req, res, next) => {
  const { id } = req.params;
  await userModel.findByIdAndDelete(id);
  return res.status(204).send();
});

router.get("/:id/likes", userMiddleware.checkUserId, async (req, res, next) => {
  const { id } = req.params;
  const likesByUser = await likeModel.getLikesByUser(id);

  //reduce
  // const formattedLikes = likesByUser.reduce((result, like) => {
  //   const { user_id, tweet, ...likeData } = like;
  //   if (!result[user_id]) {
  //     result[user_id] = { user_id, likes: [] };
  //   }
  //   result[user_id].likes.push({ tweet, ...likeData });
  //   return result;
  // }, {});

  const formattedLikes = {};

  likesByUser.forEach((like) => {
    const { user_id, tweet, ...likeData } = like;

    if (!formattedLikes[user_id]) {
      formattedLikes[user_id] = { user_id, likes: [] };
    }

    formattedLikes[user_id].likes.push({ tweet, ...likeData });
  });

  res.json(Object.values(formattedLikes));
});

module.exports = router;
