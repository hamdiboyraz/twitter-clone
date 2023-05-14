const router = require("express").Router();

const commentModel = require("./comments-model");
const commentMiddleware = require("./comments-middleware");
const authMiddleware = require("../auth/auth-middleware");

// Base URL: /api/v1/comments

router.get("/", async (req, res, next) => {
  try {
    const comments = await commentModel.getAll();
    return res
      .status(200)
      .json({ "Total Comments": comments.length, comments });
  } catch (error) {
    next(error);
  }
});
router.get("/:id", commentMiddleware.checkCommentId, async (req, res, next) => {
  try {
    const { id } = req.params;
    const comment = await commentModel.getById(id);
    return res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
});

router.use(authMiddleware.isAuthenticated);

router.post("/", async (req, res, next) => {
  try {
    const { tweet_id, comment } = req.body;
    const post = {
      user_id: req.user.user_id,
      tweet_id,
      comment,
    };
    const [newCommentID] = await commentModel.create(post);
    const newTComment = await commentModel.getById(newCommentID);
    return res.status(201).json(newTComment);
  } catch (error) {
    next(error);
  }
});
router.put("/:id", commentMiddleware.checkCommentId, async (req, res, next) => {
  try {
    const comment_id = req.params.id;
    const { comment } = req.body;
    const updatedComment = await commentModel.findByIdAndUpdate(
      comment_id,
      comment
    );
    return res.status(200).json(updatedComment);
  } catch (error) {
    next(error);
  }
});
router.delete(
  "/:id",
  commentMiddleware.checkCommentId,
  async (req, res, next) => {
    try {
      const comment_id = req.params.id;
      await commentModel.findByIdAndDelete(comment_id);
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
