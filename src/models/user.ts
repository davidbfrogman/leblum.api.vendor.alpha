import { mongoose } from '../config/database';
import { Schema, Model, Document, model } from 'mongoose';
import { IRole, RoleSchema } from './role';

export interface IUser extends Document {
    username: string;
    passwordHash: string;
    email: string;
    roles: Array<IRole>;
    href: string;
    // This will be set to true whenever a user changes their password / or we require them to login again
    // This is used by the authentication controller to revoke the renewal of a token.  
    isTokenExpired: boolean; 
    createdAt?: Date; //Automatically created by mongoose.
    modifiedAt?: Date; //Automatically created by mongoose.
}

const UserSchema = new Schema({
    username: {
        type: String, 
        unique:true,
        trim:true,
        required:true
    },
    passwordHash: {type: String, required: true, select: false},
    isTokenExpired: {type : Boolean, required: true, default: true},
    href: {type:String},
    email: {type:String, unique:true},
    roles: [{ type : Schema.Types.ObjectId, ref: 'role' }]
},{timestamps:true});

//If you do any pre save methods, and you use fat arrow syntax 'this' doesn't refer to the document.
UserSchema.pre('save',function(next){
    //If there's any validators, this field requires validation.
    next();
});

export interface IUserComposite extends IUser, Document {};

export const UserComposite:Model<IUserComposite> = mongoose.model<IUserComposite>('user', UserSchema);