const topicsRouter = require("express").Router();
const { getTopics } = require("../topics.controllers");

topicsRouter.route("/").get(getTopics);

module.exports = topicsRouter;
