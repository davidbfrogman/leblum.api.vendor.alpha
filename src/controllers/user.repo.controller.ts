import { IUser, User } from '../models/user';
import { Router, Request, Response, RequestParamHandler, NextFunction, RequestHandler } from 'express';
import mongoose = require('mongoose');
import { Schema, Model, Document } from 'mongoose';
import { BaseController } from './base/base.controller';
import { Constants } from '../constants';
import { BaseRepoController } from "./base/base.repo.controller";
import { UserRepo } from "../repository/user.repository";
var bcrypt = require('bcrypt');
var Promise = require('bluebird');

export class UserRepoController extends BaseRepoController<IUser, UserRepo> {
  private saltRounds: Number = 10;
  public defaultPopulationArgument =
  {
    path: 'roles',
    // Permissions for the roles
    populate: { path: 'permissions' }
  };

  public repo: UserRepo = new UserRepo();

  constructor() {
    super();
  }
  
  public create(request: Request, response: Response, next: NextFunction): Promise<IUser> {
    let user: IUser = <IUser>request.body;
    return bcrypt.hash(user.passwordHash, this.saltRounds, (err, hash) => {
      user.passwordHash = hash;
      request.body = user;  //If we push this back onto the request, then the rest of our architecture will just work. 
      //return super.create(request, response, next);
    });
  }

  public preCreateHook(model: IUser): Promise<IUser>{
    model.href = `${Constants.APIEndpoint}${Constants.UsersEndpoint}/${model._id}`;
    return Promise.resolve(model);
  }

  public preUpdateHook(model: IUser): Promise<IUser>{
    model.href = `${Constants.APIEndpoint}${Constants.UsersEndpoint}/${model._id}`;
    return Promise.resolve(model);
  }
}
