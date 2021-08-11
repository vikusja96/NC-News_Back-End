const { articleData } = require("../data/development-data");
const db = require("../connection.js");

exports.formatTopicData = (topicData) => {
  const topicDataInArr = topicData.map((topic) => {
    return [topic.slug, topic.description];
  });
  return topicDataInArr;
};

exports.formatUserData = (userData) => {
  const userDataInArr = userData.map((user) => {
    return [user.username, user.avatar_url, user.name];
  });
  return userDataInArr;
};

exports.formatArticleData = (articleData) => {
  const articleDataInArr = articleData.map((article) => {
    return [
      article.title,
      article.body,
      article.votes,
      article.topic,
      article.author,
      article.created_at,
    ];
  });
  return articleDataInArr;
};

exports.articleRef = (newArticleData, article_id, title) => {
  const articleRef = {};
  newArticleData.forEach((article) => {
    articleRef[article[title]] = article[article_id];
  });
  return articleRef;
};

exports.formatCommentData = (commentData, articleRef) => {
  const commentDataInArr = commentData.map((comment) => {
    if (Object.keys(comment).length === 0) return [];
    const { body, belongs_to, created_by, votes, created_at } = comment;
    return [created_by, articleRef[belongs_to], votes, created_at, body];
  });
  return commentDataInArr;
};
