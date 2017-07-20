import { Role, IRole } from "../models/index";
import { BaseRepo } from "./base/base.repository";
import { Model } from "mongoose";

export class RoleRepo extends BaseRepo<IRole>{
    protected mongooseModelInstance: Model<IRole> = Role;

    public constructor(){
        super();
    }
}