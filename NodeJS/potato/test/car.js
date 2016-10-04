'use strict';

process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../bin/www');
const should = chai.should();

chai.use(chaiHttp);

describe('/GET cars', _ => {
    it('should list all cars on /cars GET', done => {
        chai.request(server)
            .get('/users')
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            });
    });
});


describe('POST /cars ', _ => {

    it('it should NOT POST a car', done => {
        const car = {};

        chai.request(server)
            .post('/cars')
            .send(car)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.user.should.have.property('error');
                res.body.user.should.have.property('error').eql('toto');
                /*res.body.should.be.a('object');
                 res.body.user.should.have.property('name');
                 res.body.user.should.have.property('firstname');
                 res.body.user.should.have.property('email');
                 res.body.should.have.property('message').eql('User successfully added!');*/
                done();
            });
    });

    it('it should POST a car', done => {
        const car = {
            name: "Bob",
            firstname: "Josh",
            email: "bob.josh@aol.fr"
        };

        chai.request(server)
            .post('/cars')
            .send(car)
            .end((err, res) => {
                res.should.have.status(200);
                /*res.body.should.be.a('object');
                 res.body.user.should.have.property('name');
                 res.body.user.should.have.property('firstname');
                 res.body.user.should.have.property('email');
                 res.body.should.have.property('message').eql('User successfully added!');*/
                done();
            });
    });
});