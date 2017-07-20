import { Router } from 'express';
import { PermissionController } from '../controllers/permission.controller';
import { BaseRouter } from './base/base.router';
import { Constants } from '../constants';
import { PermissionRepo } from "../repositories";
import { IPermission } from "../models";

export class PermissionRouter extends BaseRouter {
    public router: Router = Router();
    public controller = new PermissionController();
    public resource: string;

    public constructor(){
        super();
        this.resource = Constants.PermissionsEndpoint;
    }
}