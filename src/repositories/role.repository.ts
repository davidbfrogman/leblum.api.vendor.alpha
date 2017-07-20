import { Role, IRole } from "../models/index";
import { BaseRepo } from "./base/base.repository";

export class RoleRepo extends BaseRepo<IRole>{

    public constructor(){
        super();
        super.mongooseModelInstance = Role;
    }
}