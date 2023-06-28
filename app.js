var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// const port = require("./bin/www");

const apiRouter = require("./routes/api");

var app = express();

//app.use(logger('dev'));
// app.use(
//     logger(
//         ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"'
//     )
// );
app.use(
    logger((tokens, req, res) => {
        console.log("http://localhost:8181" + tokens.url(req, res));
        //console.log('port = ', port);
        return [
            new Date().toISOString().replace("T", " "),
            tokens.method(req, res),
            "http://localhost:8181" + tokens.url(req, res),
            tokens.status(req, res),
            //tokens.res(req, res, "content-length"),
            "-",
            tokens["response-time"](req, res),
            "ms",
        ].join(" ");
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use("/api", apiRouter);
app.use((req, res, next) => {
    res.status(404).json({ err: "page not found app.js" });
});
module.exports = app;
