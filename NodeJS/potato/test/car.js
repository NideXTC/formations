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
                expect(res).to.have.status(200);
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
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('object');
                expect(res.body).to.have.property('error');
                expect(res.body).to.have.property('error').eql('toto');
                /*expect(res.body).to.be.a('object');
                 expect(res.body.car).to.have.property('name');
                 expect(res.body.car).to.have.property('firstname');
                 expect(res.body.car).to.have.property('email');
                 expect(res.body.car).to.property('message').eql('User successfully added!');*/
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
                expect(res).to.have.status(200);
                /*expect(res.body).to.be.a('object');
                 expect(res.body.car).to.have.property('name');
                 expect(res.body.car).to.have.property('firstname');
                 expect(res.body.car).to.have.property('email');
                 expect(res.body.car).to.property('message').eql('User successfully added!');*/
                done();
            });
    });
});