const router = require("express").Router();

const likeModel = require("./likes-model");
const authMiddleware = require("../auth/auth-middleware");
const likeMiddleware = require("./likes-middleware");

// Base URL: /api/v1/likes

router.use(authMiddleware.isAuthenticated);

router.get("/", authMiddleware.isProtected, async (req, res, next) => {
  try {
    const likes = await likeModel.getAll();
    return res.status(200).json({ "Total Likes": likes.length, likes });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const like = {
      user_id: req.user.user_id,
      tweet_id: req.body.tweet_id,
    };
    const [newLikeID] = await likeModel.create(like);
    const newLike = await likeModel.getById(newLikeID);
    return res.status(201).json(newLike);
  } catch (error) {
    next(error);
  }
});
router.get("/:id", likeMiddleware.checkLikeId, async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedLike = await likeModel.findByIdAndUpdate(id);
    return res.status(200).json(updatedLike);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
