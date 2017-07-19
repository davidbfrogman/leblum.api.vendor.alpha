import { IPermission, Permission } from '../models/permission';
import mongoose = require('mongoose');
import { Schema, Model, Document } from 'mongoose';
import { BaseController } from './base/base.controller';
import { Constants } from '../constants';
var Promise = require('bluebird');

export class PermissionController extends BaseController<IPermission> {
  public defaultPopulationArgument = null;

  constructor() {
    super();
    super.mongooseModelInstance = Permission;
  }

  public preCreateHook(model: IPermission): Promise<IPermission>{
    model.href = `${Constants.APIEndpoint}${Constants.PermissionsEndpoint}/${model._id}`;
    return Promise.resolve(model);
  }

  public preUpdateHook(model: IPermission): Promise<IPermission>{
    model.href = `${Constants.APIEndpoint}${Constants.PermissionsEndpoint}/${model._id}`;
    return Promise.resolve(model);
  }
}
