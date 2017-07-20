import { User, IUser } from "../models/index";
import { BaseRepo } from "./base/base.repository";
import { Model } from "mongoose";

export class UserRepo extends BaseRepo<IUser>{
    protected mongooseModelInstance: Model<IUser> = User;
    public constructor(){
        super();
    }

    public async getUserForPasswordCheck(username: string): Promise<IUser>{
        return await this.mongooseModelInstance.findOne({ username: username })
                .select('+passwordHash');
    }
}