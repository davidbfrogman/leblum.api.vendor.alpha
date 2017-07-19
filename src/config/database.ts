import mongoose = require('mongoose');
import { Config } from './config';
import log = require('winston');
import { User2 } from "../models/index";
import { createConnection, Connection } from "typeorm";
import { ConnectionOptions } from 'mongoose';

export class Database {

    public connectMongoose(): Promise<boolean | void> {
        const connectionOptions: ConnectionOptions = {
            useMongoClient: true,
        }
        mongoose.Promise = require('bluebird');

        return mongoose.connect(Config.active.get('database.mongoConnectionString'), connectionOptions).then(() => {
            log.info(`Connected To Mongo Database: ${mongoose.connection.db.databaseName}`);
            return true;
        }).catch(function (err) {
            log.info('error while trying to connect with mongodb', err);
        });
    }

    public connect(): Promise<boolean> {
        return createConnection({
            type: 'postgres',
            host: "localhost",
            port: 5432,
            username: "leblum",
            password: "password123",
            database: "leblum.vendor.api",
            entities: [
                User2
            ],
            autoSchemaSync: true,
        }).then(connection => {
            // Here you can start to work with your entities
            log.info('Connected to pgsql database');
            return true;
        }).catch(error => {
            log.error(error);
            return false;
        });
    }

}

export { mongoose }