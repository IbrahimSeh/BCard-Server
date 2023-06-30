var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const chalk = require("chalk");
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
        const loggerApplication = [
            new Date().toISOString().replace("T", " "),
            tokens.method(req, res),
            `http://localhost:${portNumber}` + tokens.url(req, res),
            tokens.status(req, res),
            "-",
            tokens["response-time"](req, res),
            "ms",
        ];
        if (tokens.status(req, res) >= 100 && tokens.status(req, res) < 200) {
            console.log(chalk.blueBright.bold(loggerApplication.join(" ")));
        }
        if (tokens.status(req, res) >= 200 && tokens.status(req, res) < 300) {
            console.log(chalk.greenBright.bold(loggerApplication.join(" ")));
        }
        if (tokens.status(req, res) >= 300 && tokens.status(req, res) < 400) {
            console.log(chalk.yellowBright.bold(loggerApplication.join(" ")));
        }
        if (tokens.status(req, res) >= 400 && tokens.status(req, res) < 500) {
            console.log(chalk.redBright.bold(loggerApplication.join(" ")));
        }
        if (tokens.status(req, res) >= 500 && tokens.status(req, res) < 600) {
            console.log(chalk.magentaBright.bold(loggerApplication.join(" ")));
        }

    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/public", express.static(path.join(__dirname, "public")));
initialData();
app.use("/api", apiRouter);
app.use((req, res, next) => {
    res.status(404).json({ err: "page not found app.js" });
});
module.exports = app;
