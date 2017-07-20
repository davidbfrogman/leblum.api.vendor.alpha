import { User, IUser } from "../../models/index";
import { BaseRepository } from "../base/base.repository";
import { Model } from "mongoose";
import {  } from "./user.repository.interface";
import { IBaseRepository, IUserRepository } from "../index";

export class UserRepository extends BaseRepository<IUser> implements IUserRepository, IBaseRepository<IUser> {
    protected mongooseModelInstance: Model<IUser> = User;
    public constructor(){
        super();
    }

    public async getUserForPasswordCheck(username: string): Promise<IUser>{
        return await this.mongooseModelInstance.findOne({ username: username })
                .select('+passwordHash');
    }
}