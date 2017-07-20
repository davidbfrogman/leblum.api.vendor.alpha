import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { BaseRouter } from './base/base.router';
import { Constants } from '../constants';
import { UserRepo } from "../repositories";
import { IUser } from "../models";

export class UserRouter extends BaseRouter<UserController, UserRepo, IUser> {
    public router: Router = Router();
    public userController = new UserController();
    public resource: string;

    public constructor(){
        super();
        this.resource = Constants.UsersEndpoint;
        super.controller = this.userController;
    }
}