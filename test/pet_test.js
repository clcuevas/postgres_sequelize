'use strict';

require('../server.js');

var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;
var Sql = require('sequelize');
var sql = new Sql('pet_dev', 'pet_dev', 'soccer15', {
  dialect: 'postgres'
});

var Pet = require('../models/Pet.js');

describe('Pet REST API', function() {
  it('should create a new Pet', function(done) {
    chai.request('localhost:3000')
    .post('/api/pets')
    .send({id: 99, name: 'velia', owner: 'tiana', weight: 2, type: 'hedgehog'})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body).to.have.property('id');
      expect(res.body.owner).to.equal('tiana');
      done();
    });
  });

  it('should GET a Pet document from the collection', function(done) {
    chai.request('localhost:3000')
      .get('/api/pets')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(typeof res.body).to.equal('object');
        expect(res.body[0].name).to.equal('peanut');
        expect(res.body[1].name).to.equal('butter');
        done();
      });
  });

  it('should DELETE a pet collection', function(done) {
    chai.request('localhost:3000')
      .del('/api/pets/99')
      .end(function(err, res) {
        expect(err).to.eql(null);
        console.log(res.body.msg);
        expect(res.body.msg).to.equal('successfully deleted');
        done();
      });
  });
});