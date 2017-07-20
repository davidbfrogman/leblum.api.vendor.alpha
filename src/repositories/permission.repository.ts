import { Permission, IPermission } from "../models/index";
import { BaseRepo } from "./base/base.repository";

export class PermissionRepo extends BaseRepo<IPermission>{

    public constructor(){
        super();
        super.mongooseModelInstance = Permission;
    }
}