import { Permission, IPermission } from "../../models/index";
import { BaseRepository, IPermissionRepository, IBaseRepository } from "../index";
import { Model } from "mongoose";

export class PermissionRepository extends BaseRepository<IPermission> implements IPermissionRepository, IBaseRepository<IPermission>{
    protected mongooseModelInstance: Model<IPermission> = Permission;

    public constructor(){
        super();
    }
}