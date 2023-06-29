var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors");
const initialData = require("./initialData/initialData");
const apiRouter = require("./routes/api");
const config = require("config");
const portNumber = config.get("portNumber");

var app = express();

app.use(
    cors({
        origin: "http://192.168.0.108:3000",
        optionsSuccessStatus: 200,
    })
);

app.use(
    logger((tokens, req, res) => {
        return [
            new Date().toISOString().replace("T", " "),
            tokens.method(req, res),
            `http://localhost:${portNumber}` + tokens.url(req, res),
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
initialData();

app.use("/api", apiRouter);
app.use((req, res, next) => {
    res.status(404).json({ err: "page not found app.js" });
});
module.exports = app;
