const { articleData } = require("../data/development-data");
const db = require("../connection.js");

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

exports.renameKeys = (inputArr, keyToChange, newKey) => {
  const newArr = [];
  inputArr.forEach((object) => {
    newArr.push({...object})
  })
  newArr.map((element) => {
    element[newKey] = element[keyToChange]
    delete element[keyToChange]
  })
  return newArr
};

exports.articleRef = async (newArticleData, article_id, title) => {
  const articleRef = {};
  newArticleData.forEach((article)=>{
    articleRef[article[title]] = article[article_id] 
  })
    return articleRef;
}


exports.formatCommentData = (commentData, articleRef) => {
  console.log(articleRef)

};
//author from created_by --- change of key = done
//article_id from articles (based on belongs too key/value pair) --- refObject
// votes
//created_at
// body
