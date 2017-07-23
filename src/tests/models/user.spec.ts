//During the test the env variable is set to test
import { Database } from '../../config/database';
import { App, server } from '../../server';
import { User, IUser } from '../../models';
import { Config } from '../../config/config';
import { Constants } from "../../constants";
import { AuthenticationUtil } from "../authentication.util.spec";
import { Cleanup } from "../cleanup.util.spec";

import * as chai from 'chai';
const mongoose = require("mongoose");
const expect = chai.expect;
const should = chai.should();
import * as supertest from 'supertest';
chai.use(require('chai-http'));
const api = supertest('http://localhost:8080');

let AuthToken: string;
//Our parent block
describe('Users', () => {

    before(async () => {
        //First we clear the users table.  Start with a clean slate.
        await User.remove({});

        AuthToken = await AuthenticationUtil.generateUserAndAuthToken();
    });

     // Testing the list method.
        it('it should list all the users', async () => {
            let sres = await api.get(`${Constants.APIEndpoint}${Constants.APIVersion1}/${Constants.UsersEndpoint}`).set("x-access-token", AuthToken);
            expect(sres.status === 200);
            expect(sres.body).to.be.an('array');
            expect(sres.body.length).to.be.equal(1); // It's going to be 1, because we have our seed user that we're using for authentication
        });

        it('it should create a user', async () => {
            let user = {
                firstName: "Dave",
                lastName: "Brown",
                username: "testUser2",
                email: "test2@test.com",
                passwordHash: "test1234",
                isTokenExpired: false
            };
            let res = await chai.request(App.express)
                .post(`${Constants.APIEndpoint}${Constants.APIVersion1}/users`)
                .set("x-access-token", AuthToken)
                .send(user)

            res.should.have.status(201);
            res.body.should.be.a('object');
            res.body.should.have.property('model');
            res.body.model.should.have.property('username');
            res.body.model.username.should.be.eql('testUser2');
            res.body.model.passwordHash.should.not.eql('test1234');
            res.body.model.isTokenExpired.should.eql(false);
        });

        it('Should create the user in the db and make sure get by id works', async () => {
            let user = new User({
                username: "test2435",
                email: "test2345@test.com",
                passwordHash: "test",
                isTokenExpired: false,
                firstName: "Dave",
                lastName: "Brown"
            });

            user = await user.save();
            let res = await chai.request(App.express)
                .get(`${Constants.APIEndpoint}${Constants.APIVersion1}/users/${user.id}`)
                .set("x-access-token", AuthToken);
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('username');
            res.body.username.should.eql('test2435');
        })

    after(async () => {
        await Cleanup.cleanup();
    });

});
