const router = require("express").Router();

const tweetModel = require("./tweets-model");
const tweetMiddleware = require("./tweets-middleware");
const authMiddleware = require("../auth/auth-middleware");
// Base URL: /api/v1/tweets

router.get("/", async (req, res, next) => {
  try {
    const tweets = await tweetModel.getAll();
    return res.status(200).json(tweets);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", tweetMiddleware.checkTwitterId, async (req, res, next) => {
  try {
    const { id } = req.params;
    const tweet = await tweetModel.getById(id);
    return res.status(200).json(tweet);
  } catch (error) {
    next(error);
  }
});

router.use(authMiddleware.isAuthenticated);

router.post("/", async (req, res, next) => {
  try {
    let post = {
      user_id: req.user.user_id,
      tweet: req.body.tweet,
    };
    const [newTweetID] = await tweetModel.create(post);
    const newTweet = await tweetModel.getById(newTweetID);
    return res.status(201).json(newTweet);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", tweetMiddleware.checkTwitterId, async (req, res, next) => {
  const tweet_id = req.params.id;
  const { tweet } = req.body;
  const updatedTweet = await tweetModel.findByIdAndUpdate(tweet_id, tweet);
  return res.status(200).json(updatedTweet);
});

router.delete(
  "/:id",
  tweetMiddleware.checkTwitterId,
  async (req, res, next) => {
    const tweet_id = req.params.id;
    tweetModel.findByIdAndDelete(tweet_id);
    return res.status(204).send();
  }
);

module.exports = router;
