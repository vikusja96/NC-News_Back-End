const {
  selectArticleById,
  updateArticleById,
  selectArticles,
  selectArticleComments,
  insertCommentByArticleId
} = require("../models/articles.model");

exports.getArticlesById = (req, res, next) => {
  const { article_id } = req.params;
  selectArticleById(article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchArticleById = (req, res, next) => {
  const { article_id } = req.params;
  const votesUpdate = req.body;
  updateArticleById(article_id, votesUpdate)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getArticles = (req, res, next) => {
  const { sort_by, order, topict } = req.query;
  selectArticles(sort_by, order, topict)
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getArticleComments = (req, res, next) => {
  const { article_id } = req.params;
  selectArticleComments(article_id)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postCommentByArticleId = (req, res, next) => {
    const { article_id } = req.params;
    const comment = req.body;
    insertCommentByArticleId(article_id, comment)
    .then((insertComment) => {
        res.status(201).send({insertComment})
    }).catch((err) => {
        next(err)
    });
};

