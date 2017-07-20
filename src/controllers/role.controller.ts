import { Role, IRole } from '../models';
import mongoose = require('mongoose');
import { Schema, Model, Document } from 'mongoose';
import { BaseController } from './base/base.controller';
import { Constants } from '../constants';
import { RoleRepo } from '../repositories'

export class RoleController extends BaseController{
  public defaultPopulationArgument =
  {
    path: 'permissions'
  }

  protected repository: RoleRepo = new RoleRepo();

  constructor() {
    super();
  }

  public preCreateHook(model: IRole): Promise<IRole>{
    model.href = `${Constants.APIEndpoint}${Constants.RolesEndpoint}/${model._id}`;
    return Promise.resolve(model);
  }

  public preUpdateHook(model: IRole): Promise<IRole>{
    model.href = `${Constants.APIEndpoint}${Constants.RolesEndpoint}/${model._id}`;
    return Promise.resolve(model);
  }
}
