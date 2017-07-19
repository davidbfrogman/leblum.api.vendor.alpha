import { NextFunction, Request, RequestHandler, RequestParamHandler, Response, Router } from 'express';
import { Document, DocumentQuery, Model, Schema } from 'mongoose';
import * as log from 'winston';
import { IValidationError, SearchCriteria } from '../../models/';
import { ObjectId } from 'bson';
import { BaseRepo } from "../../repository/base/base.repository";

export abstract class BaseRepoController<IModel extends Document, Repository extends BaseRepo<IModel>>{

    public abstract repo: Repository;
    public abstract defaultPopulationArgument: object;

    public async single(request: Request, response: Response, next: NextFunction): Promise<IModel> {
        try{
            let item: IModel = await this.repo.single(this.getId(request), this.defaultPopulationArgument);
            if (!item) 
                throw ({ message: 'Item Not Found', status: 404 });

            response.json(item);

            log.info(`Executed Single Operation: ${this.repo.mongooseModelInstance.collection.name}, item._id: ${item._id}`);

            return item;
        }
        catch(error){
            next(error);
        }
    }

    protected getId(request: Request): string {
        return request && request.params ? request.params['id'] : null;
    }

}