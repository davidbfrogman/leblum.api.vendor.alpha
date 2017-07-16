import log = require('winston');
import { Config } from './config'
import { Constants } from "../constants";

let jackrabbit = require('jackrabbit');
let url = Config.activeConfig().AMPQConnectionString;

let rabbit = jackrabbit(url);
log.info(`Connected to RabbitMQ on url:${url}`);

let exchange = rabbit.default();

let queue = exchange.queue({ name: Constants.LEBLUM_API_Q_BACKPLANE, durable: true, prefetch:1 });
log.info(`Started Queue Name:${Constants.LEBLUM_API_Q_BACKPLANE}`);

export { rabbit, exchange, queue };