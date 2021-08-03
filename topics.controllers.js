const { selectTopics } = require("./topic.models");

exports.getTopics = (req, res, next) => {
  selectTopics();
};
