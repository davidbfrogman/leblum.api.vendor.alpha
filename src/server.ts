import * as http from 'http';
import * as debug from 'debug';

import App from './application';
import { Config } from "./config/config";

debug('ts-express:server');

const server = http.createServer(App);
server.on('error', onError);
server.on('listening', onListening);

function onError(error: NodeJS.ErrnoException): void {
  if (error.syscall !== 'listen') throw error;
  let bind = (typeof Config.activeConfig().port === 'string') ? 'Pipe ' + Config.activeConfig().port : 'Port ' + Config.activeConfig().port;
  switch(error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening(): void {
  let addr = server.address();
  let bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
}