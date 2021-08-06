const express = require("express");
const app = express();
const apiRouter = require("./routers/api.router");

app.use(express.json());

app.use("/api", apiRouter);


app.use((err, req, res, next) => {
    if (err.status && err.msg) {
        res.status(err.status).send({ msg: err.msg });
      }
    else if (err.code === '22P02') {
        res.status(400).send({ msg: 'Bad Request' });
    }
    else if(err.code === '22003') {
        res.status(404).send({ msg: 'Not Found' });
    } else { 
        res.status(500).send({ msg: 'Internal Server Error' })
        console.log(err);
    }   
    next(err)
})

module.exports = app;
