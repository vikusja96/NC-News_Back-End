const apiRouter = require("express").Router();
const topicsRouter = require("./topicsRouter.js");
const articlesRouter = require('./articlesRouter.js')
const {getEndpoints} = require('../constrollers/api.constroller.js')

apiRouter.get('/', getEndpoints);

apiRouter.use("/topics", topicsRouter);
apiRouter.use('/articles', articlesRouter)

module.exports = apiRouter;
