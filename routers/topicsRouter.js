const topicsRouter = require("express").Router();
const { getTopics } = require("../constrollers/topics.controller");

topicsRouter.route("/").get(getTopics);

module.exports = topicsRouter;
