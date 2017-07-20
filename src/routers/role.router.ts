import { Router } from 'express';
import { RoleController } from '../controllers/role.controller';
import { BaseRouter } from './base/base.router';
import { Constants } from '../constants';
import { RoleRepo } from "../repositories";
import { IRole } from "../models";

export class RoleRouter extends BaseRouter<RoleController, RoleRepo, IRole> {
    public router: Router = Router();
    public roleController = new RoleController();
    public resource: string;

    public constructor(){
        super();
        this.resource = Constants.RolesEndpoint;
        super.controller = this.roleController;
    }
}