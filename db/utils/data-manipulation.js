const { articleData } = require("../data/development-data");

// extract any functions you are using to manipulate your data, into this file
exports.formatTopicData = (topicData) => {
  const result = topicData.map((dataObject) => {
    return [dataObject.slug, dataObject.description];
  });
  return result;
};

exports.formatUserData = (userData) => {
  const result = userData.map((object) => {
    return [object.username, object.avatar_url, object.name];
  });
  return result;
};

exports.formatArticleData = (articleData) => {
  const result = articleData.map((object) => {
    return [
      object.title,
      object.body,
      object.votes,
      object.topic,
      object.author,
      object.created_at,
    ];
  });
  return result;
};

exports.formatCommentData = (commentData) => {};
//author from created_by --- change of key
//article_id from articles (based on belongs too key/value pair) --- refObject
// votes
//created_at
// body
