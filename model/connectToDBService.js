const config = require("config");
const dbOption = config.get("dbOption");
const chalk = require("chalk");
const connectToDBMongo = require("./mongodb/connectToDB");

const connectToDB = () => {
    switch (dbOption) {
        case "mongo":
            return connectToDBMongo();
            break;
        default:
            console.log(chalk.yellowBright("Sorr'y, there is no other option of data base."));
    }
};

module.exports = connectToDB;
