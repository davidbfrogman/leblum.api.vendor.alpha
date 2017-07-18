import mongoose = require('mongoose');
import { Config } from './config';
import log = require('winston');

let connectionOptions: mongoose.ConnectionOpenOptions = {
 useMongoClient: true,
}
mongoose.Promise = require('bluebird');

var mongoDB = mongoose.connect(Config.active.get('database.mongoConnectionString'), connectionOptions).then(() => {
    log.info(`Connected To Mongo Database: ${mongoose.connection.db.databaseName}`);
    })
    .catch(function (err) {
        log.info('error while trying to connect with mongodb', err);
    });

export { mongoose };