const newRelic = require('newrelic');
import * as express from 'express';
import * as http from 'http';
import * as compression from 'compression';
import * as morgan from 'morgan';
import * as fs from 'fs';
import * as helmet from 'helmet';

import { ObjectId } from 'bson';
import { join } from 'path';
import { json, urlencoded } from 'body-parser';
import { mongoose, Database } from './config/database';
import { Constants } from './constants';
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
  public currentDatabase: Database;

  private setupComplete: boolean = false;

  // Run configuration methods on the Express instance.
  constructor() {
    log.info('Starting up Express Server.');

    this.checkEnvironment();

    this.express = express();
    this.logging();      // Initialize logging 
    this.healthcheck();  // Router for the healthcheck
    this.connectDatabase();     // Setup database connection
    this.secure();       // Turn on security measures
    this.swagger();      // Serve up swagger, this is before authentication, as swagger is open
    this.configureJWT(); // Sets up the way that json web tokens works
    this.middleware();   // Setup the middleware
    this.routes();       // Setup routers for all the controllers
    this.handlers();     // Any additional handlers, home page, etc.

    this.express.listen(Config.active.get('port'));
    log.info(`Listening on http://localhost:${Config.active.get('port')}`);
  }

  private connectDatabase(){
    this.currentDatabase = new Database();
    this.currentDatabase.connect().then(connected =>{
      this.setupComplete = connected as boolean;
      log.info('Completed Setup, database now online');
    });
  }

  private healthcheck() {
    this.express.get('/healthcheck', (request: express.Request, response: express.Response) => {
      response.statusCode = this.setupComplete ? 200 : 500;
      response.json({
        ApplicationName: Constants.ApplicationName,
        StatusCode: this.setupComplete ? 200 : 500,
        SetupComplete: this.setupComplete,
      });
    });
  }

  private secure(){
    //app.use(helmet()); //Protecting the app from a lot of vulnerabilities turn on when you want to use TLS.
  }

  // Here we're going to make sure that the environment is setup.  
  // We're also going to double check that nothing goofy is going on.
  private checkEnvironment(){
    if(!process.env.NODE_ENV){
      throw JSON.stringify({
        error: 'You must have a node environment set: NODE_ENV',
        message: 'You can set a node environemnt using set NODE_ENV development. Be sure to close and reopen any active console windows',
      });
    }
    else{
      log.info(`Current Environment set via environment variables (NODE_ENV):${process.env.NODE_ENV}`);
    }
  }

  // We want to configure logging so that if we're outputting it to the console
  // it's nice and colorized, otherwise we remove that transport.
  private logging(): void {
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
    // The authentication endpoint is 'Open', and should be added to the router pipeline before the other routers
    this.express.use('/authenticate', new routers.AuthenticationRouter().getRouter());
    this.express.use('/api*', new routers.AuthenticationRouter().authMiddleware);
    this.express.use(Constants.APIEndpoint + Constants.APIVersion1, new routers.UserRouter().getRouter());
    this.express.use(Constants.APIEndpoint + Constants.APIVersion1, new routers.RoleRouter().getRouter());
    this.express.use(Constants.APIEndpoint + Constants.APIVersion1, new routers.PermissionRouter().getRouter());

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
        name: Constants.ApplicationName,
        DocumentationLocation:`${Config.active.get('publicURL')}:${Config.active.get('port')}/api-docs`,
        APILocation: `${Config.active.get('publicURL')}:${Config.active.get('port')}/api`,
        AuthenticationEndpoint: `${Config.active.get('publicURL')}:${Config.active.get('port')}/api/authenticate`,
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