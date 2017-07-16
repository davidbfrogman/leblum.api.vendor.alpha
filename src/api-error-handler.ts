import { NextFunction, Request, Response } from "express";
import log = require('winston');
import { Config } from "./config/config";

export class ApiErrorHandler {
    public static HandleApiError(error: Error & { status: number }, request: Request, response: Response, next: NextFunction) {
        log.error(error.stack);
        if(!response.statusCode) {response.status(error.status || 500);}

        //If there was an authentication errror.
        if (error.name == 'JWTExpressError') {
            response.status(401);
        }
        response.json({
            message: error.message || 'Server Error',
            status: error.status,
            URL: request.url,
            method: request.method,
            stack: Config.activeConfig().returnCallStackOnError ? error.stack : '',
            requestBody: request.body
        });
    }
}