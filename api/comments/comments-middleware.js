const commentModel = require("./comments-model");

const checkCommentId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const isExist = await commentModel.getById(id);
    if (!isExist) {
      next({ status: 404, message: "Comment is not found." });
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  checkCommentId,
};
