import mongoose = require("mongoose");
import log = require('winston');
import { Config } from "./config";

let connectionOptions: mongoose.ConnectionOpenOptions = {
 useMongoClient: true,
}
mongoose.Promise = require('bluebird');

var mongoDB = mongoose.connect(Config.active.get('database.mongoConnectionString'), connectionOptions).then(() => {
    log.info(`Connected To Mongo Database: ${mongoose.connection.db.databaseName}`);
    })
    .catch(function (err) {
        console.log('error while trying to connect with mongodb', err);
    });

export { mongoose };