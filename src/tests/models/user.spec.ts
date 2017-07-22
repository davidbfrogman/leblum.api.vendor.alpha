//During the test the env variable is set to test
process.env.NODE_ENV = 'integration';
import { Database } from '../../config/database';
import { App } from '../../server';
import { User } from '../../models';

let mongoose = require("mongoose");
import * as chai from 'chai';
let expect = chai.expect;
let should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

chai.use(chaiHttp);
//Our parent block
describe('Users', () => {
    // beforeEach((done) => { //Before each test we empty the database
    //     User.remove({}, (err) => {
    //         done();
    //     });
    // });

    // Testing the list method.
    describe('list users', () => {
        it('it should list all the users', (done) => {
            chai.request(App)
                .get('/api/v1/users')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });

});