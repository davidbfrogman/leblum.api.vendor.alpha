import * as express from 'express';
import * as http from 'http';
import * as compression from 'compression';
import * as morgan from 'morgan';
import * as fs from 'fs';
import * as helmet from 'helmet';

import { ObjectId } from "bson";
import { join } from 'path';
import { json, urlencoded } from 'body-parser';
import { mongoose } from './config/database';
import { Constants } from "./constants";
import { Config } from './config/config';
import { Router } from 'express';
import { ApiErrorHandler } from './api-error-handler';
import * as routers from './routes';

import methodOverride = require('method-override');
import log = require('winston');
import jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

// Creates and configures an ExpressJS web server.
class Application {

  // ref to Express instance
  public express: express.Application;

  // Run configuration methods on the Express instance.
  constructor() {
    log.info('Starting up Express Server.');

    this.express = express();
    this.configureLogging();
    this.configureJWT();
    this.middleware();
    this.routes();
    this.handlers();
    this.swagger();

    this.express.listen(Config.active.get('port'));
    log.info(`Listening on http://localhost:${Config.active.get('port')}`);
  }

  // We want to configure logging so that if we're outputting it to the console
  // it's nice and colorized, otherwise we remove that transport.
  private configureLogging(): void {
    if (Config.active.get('isConsoleLoggingActive')) {
      log.remove(log.transports.Console);
      log.add(log.transports.Console, { colorize: true });
      this.express.use(morgan('dev')); //Using morgan middleware for logging all requests.  the 'dev' here is just a particular format.
    }
    else {
      log.remove(log.transports.Console);
    }
  }

  // Sets up authentication, and sets it with our jwt secret token.
  private configureJWT() {
    this.express.set('jwtSecretToken', Config.active.get('jwtSecretToken'));
  }

  // Configure Express middleware.
  private middleware(): void {
    log.info('Initializing Middleware');
    //app.use(helmet()); //Protecting the app from a lot of vulnerabilities turn on when you want to use TLS.
    this.express.disable('x-powered-by');
    this.express.use(json());
    this.express.use(urlencoded({ extended: true }));
    this.express.use(methodOverride(function (req) {
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        const method = req.body._method;
        delete req.body._method;
        return method;
      }
    }));
    // compress all requests
    this.express.use(compression());
  }


  private routes(): void {
    log.info('Initializing Routers');
    // The authentication endpoint is "Open", and should be added to the router pipeline before the other routers
    this.express.use('/authenticate', new routers.AuthenticationRouter().getRouter());
    this.express.use('/api*', new routers.AuthenticationRouter().authMiddleware);
    this.express.use(Constants.AdminEndpoint, new routers.UserRouter().getRouter());
    this.express.use(Constants.AdminEndpoint, new routers.RoleRouter().getRouter());
    this.express.use(Constants.AdminEndpoint, new routers.PermissionRouter().getRouter());

    log.info('Instantiating Default Error Handler Route');
    this.express.use((error: Error & { status: number }, request: express.Request, response: express.Response, next: express.NextFunction): void => {
      ApiErrorHandler.HandleApiError(error, request, response, next);
    });
  }

  // We want to return a json response that will at least be helpful for 
  // the root route of our api.
  private handlers(): void {
    this.express.get('/', (request: express.Request, response: express.Response) => {
      response.json({
        name: 'leblum.api.vendor.alpha',
        DocumentationLocation: 'http://localhost:8080/api-docs',
        APILocation: 'http://localhost:8080/api',
        AuthenticationEndpoint: 'http://localhost:8080/api/authenticate',
      })
    });

    this.express.get('*', function (req, res, next) {
      var err = new Error(`No router was found for your request, page not found.  Requested Page: ${req.originalUrl}`);
      err['status'] = 404;
      next(err);
    });
  }

  // This will allow us to serve the static homepage for our swagger definition
  // along with the swagger ui explorer.
  private swagger(): void {
    this.express.use(Constants.APIDocsEndpoint, express.static(__dirname + '/swagger/swagger-ui'));
    this.express.use(Constants.APISwaggerDefinitionEndpoint, express.static(__dirname + '/swagger/'));
  }
}

export default new Application().express;