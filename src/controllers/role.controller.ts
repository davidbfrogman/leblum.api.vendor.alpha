import { Role, IRole } from '../models/role';
import mongoose = require('mongoose');
import { Schema, Model, Document } from 'mongoose';
import { BaseController } from './base/base.controller';
import { Constants } from '../constants';
var Promise = require('bluebird');

export class RoleController extends BaseController<IRole> {
  public defaultPopulationArgument =
  {
    path: 'permissions'
  }

  constructor() {
    super();
    super.mongooseModelInstance = Role;
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
