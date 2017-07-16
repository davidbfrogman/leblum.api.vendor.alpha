import { IRoleComposite, RoleComposite } from '../models/role';
import mongoose = require('mongoose');
import { Schema, Model, Document } from 'mongoose';
import { BaseController } from "./base/base.controller";
import { Constants } from "../constants";
var Promise = require("bluebird");

export class RoleController extends BaseController<IRoleComposite> {
  public defaultPopulationArgument =
  {
    path: 'permissions'
  }

  constructor() {
    super();
    super.mongooseModelInstance = RoleComposite;
  }

  public preCreateHook(model: IRoleComposite): Promise<IRoleComposite>{
    model.href = `${Constants.AdminEndpoint}${Constants.RolesEndpoint}/${model._id}`;
    return Promise.resolve(model);
  }

  public preUpdateHook(model: IRoleComposite): Promise<IRoleComposite>{
    model.href = `${Constants.AdminEndpoint}${Constants.RolesEndpoint}/${model._id}`;
    return Promise.resolve(model);
  }
}
