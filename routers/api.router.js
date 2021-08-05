const apiRouter = require("express").Router();
const topicsRouter = require("./topicsRouter.js");
const articlesRouter = require('./articlesRouter')

apiRouter.route('/').get()

apiRouter.use("/topics", topicsRouter);
apiRouter.use('/articles', articlesRouter)

module.exports = apiRouter;
