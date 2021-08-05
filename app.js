const express = require("express");
const app = express();
const apiRouter = require("./routers/api.router");

app.use(express.json());

app.use("/api", apiRouter);

//error handling
app.use((err, req, res, next) => {
    console.log(err);
    next(err)
})

module.exports = app;
