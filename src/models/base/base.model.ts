import { Schema, Model, Document } from 'mongoose';

export interface IBaseModel extends Document {
    createdOn: Date;
    createdBy: string;
    modifiedOn: Date;
    modifiedBy: string;
}