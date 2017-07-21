import { User, IUser } from "../../models/index";
import { Model } from "mongoose";
import {BaseRepository} from '../base/base.repository';
import {IBaseRepository} from '../base/base.repository.interface';
import {IUserRepository} from '../interfaces/user.repository.interface';

export class UserRepository extends BaseRepository<IUser> implements IUserRepository, IBaseRepository<IUser> {
    protected mongooseModelInstance: Model<IUser> = User;
    public constructor(){
        super();
    }

    public async getUserForPasswordCheck(username: string): Promise<IUser>{
        return await this.mongooseModelInstance.findOne({ username: username })
                .select('+passwordHash');
    }

    public async updatePassword(id: string, hashedPassword: string): Promise<IUser>{
        user.passwordHash = hashedPassword;
        return await user.save();
    }
}