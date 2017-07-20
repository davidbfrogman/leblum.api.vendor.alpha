import { User, IUser } from "../models/index";
import { BaseRepo } from "./base/base.repository";

export class UserRepo extends BaseRepo<IUser>{

    public constructor(){
        super();
        super.mongooseModelInstance = User;
    }
}