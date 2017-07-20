import { Role, IRole } from "../../models/index";
import { IBaseRepository, BaseRepository } from "../index";
import { Model } from "mongoose";
import { IRoleRepository } from "../index";

export class RoleRepository extends BaseRepository<IRole> implements IRoleRepository, IBaseRepository<IRole>{
    protected mongooseModelInstance: Model<IRole> = Role;

    public constructor(){
        super();
    }
}