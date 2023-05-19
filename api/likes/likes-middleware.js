const likeModel = require("./likes-model");

const checkLikeId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const isExist = await likeModel.getById(id);
    if (!isExist) {
      next({ status: 404, message: "Like is not found." });
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  checkLikeId,
};
