import { PermissionComposite, IPermissionComposite } from '../models/permission';
import mongoose = require('mongoose');
import { Schema, Model, Document } from 'mongoose';
import { BaseController } from './base/base.controller';
import { Constants } from '../constants';
var Promise = require('bluebird');

export class PermissionController extends BaseController<IPermissionComposite> {
  public defaultPopulationArgument = null;

  constructor() {
    super();
    super.mongooseModelInstance = PermissionComposite;
  }

  public preCreateHook(model: IPermissionComposite): Promise<IPermissionComposite>{
    model.href = `${Constants.APIEndpoint}${Constants.PermissionsEndpoint}/${model._id}`;
    return Promise.resolve(model);
  }

  public preUpdateHook(model: IPermissionComposite): Promise<IPermissionComposite>{
    model.href = `${Constants.APIEndpoint}${Constants.PermissionsEndpoint}/${model._id}`;
    return Promise.resolve(model);
  }
}
