[![Build Status](https://travis-ci.org/davidbfrogman/leblum.api.vendor.alpha.svg?branch=master)](https://travis-ci.org/davidbfrogman/leblum.api.vendor.alpha)

# Mongoose & Typescript & Express 
 
Implementation of async - await methods in mongoose and express.

- Code coverage with Istanbul
- No need for MongoDB
- Unit tests with Mockgoose
- API documentation using Swagger

## Installation

```bash
npm install
```
be sure to set the cluster policy on windows to RR otherwise your pm2 instance won't round robin
set NODE_CLUSTER_SCHED_POLICY=rr

## Startup

dev
In one terminal  
```
    $ nodemon dist/server.js
```
In another terminal
```
    $ gulp watch
```
In another terminal
```
    $ nodemon dist/file-processor/file-processor.js
```

if you want to run pm2

```
    $ pm2 start ecosystem.config.js
```
you can then monitor using 
```
    $ pm2 monit
```

load testing with artillery use the artillery.yml file.  This won't work without authentication
```
    artillery quick --duration 60 --rate 100 -n 20 http://localhost:8080/api/users

    artillery quick --duration 60 --rate 100 -n 20 https://leblum-vendor-api-alpha.herokuapp.com/api/users
```

If you want to actually start using TLS/HTTPS you need to turn on Helmet to prevent a bunch of attacks on the server:
Uncomment this line in server.ts
//app.use(helmet()); //Protecting the app from a lot of vulnerabilities turn on when you want to use TLS.

## URL

*  "DocumentationLocation": [Docs](http://localhost:8080/api-docs)
*  "APILocation": [Api Base](http://localhost:8080/api)
*  "AuthenticationEndpoint": [Authenticate](http://localhost:8080/api/authenticate)