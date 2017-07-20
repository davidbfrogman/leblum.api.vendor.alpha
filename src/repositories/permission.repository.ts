import { Permission, IPermission } from "../models/index";
import { BaseRepo } from "./base/base.repository";
import { Model } from "mongoose";

export class PermissionRepo extends BaseRepo<IPermission>{
    protected mongooseModelInstance: Model<IPermission> = Permission;

    public constructor(){
        super();
    }
}