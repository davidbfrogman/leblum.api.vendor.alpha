import { Router } from 'express';
import { AuthenticationController } from '../controllers/authentication.controller';
import { Request, Response, RequestHandler, } from 'express';
import { RequestHandlerParams, NextFunction } from 'express-serve-static-core';
import { UserRepoController } from "../controllers/user.repo.controller";
import { Constants } from "../constants";

export class UserRepoRouter {
    public router: Router = Router();
    public userController = new UserRepoController();
    public resource: string;

    public constructor() {
        //super();
        this.resource = Constants.UsersEndpoint;
    }

    public getRouter(): Router {
        return this.router
            .get(`${this.resource}/:id`, async (request: Request, response: Response, next: NextFunction) => {
                await this.userController.single(request,response,next);
            });
    }
}