const articlesRouter = require("express").Router();
const {
  getArticles,
  getArticlesById,
  patchArticleById,
  getArticleComments,
  postCommentByArticleId,
} = require("../constrollers/articles.controller");

articlesRouter.route("/").get(getArticles);

articlesRouter
  .route("/:article_id")
  .get(getArticlesById)
  .patch(patchArticleById);

articlesRouter
  .route("/:article_id/comments")
  .get(getArticleComments)
  .post(postCommentByArticleId);

module.exports = articlesRouter;
