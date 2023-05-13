const tweetModel = require("./tweets-model");

const checkTwitterId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const isExist = await tweetModel.getById(id);
    if (!isExist) {
      next({ status: 404, message: "Tweet is not found." });
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  checkTwitterId,
};
