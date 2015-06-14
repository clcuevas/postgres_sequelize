'use strict';

var bodyparser = require('body-parser');
var Pet = require('../models/Pet.js');
var Sql = require('sequelize');
var sql = new Sql('pet_dev', 'pet_dev', 'soccer15', {
  dialect: 'postgres'
});

module.exports = function(router) {
  router.use(bodyparser.json());

  router.post('/pets', function(req, res) {
    sql.sync()
    .then(function() {
      Pet.create(req.body)
      .then(function(data) {
        res.json(data);
      })
      .error(function(err) {
        console.log(err);
        res.status(500).json({msg: 'internal server error'});
      });
    });
  });

  router.get('/pets', function(req, res) {
    sql.sync()
    .then(function() {
      Pet.all()
      .then(function(data) {
        res.json(data);
      })
      .error(function(err) {
        console.log(err);
        res.status(500).json({msg: 'internal server error'});
      });
    });
  });

  router.put('/pets/:id', function(req, res) {
    sql.sync()
    .then(function() {
      Pet.find(req.params.id)
      .then(function(data) {
        data.updateAttributes(req.body)
        .then(function() {
          res.json({msg: 'successfully updated'});
        })
        .error(function(err) {
          console.log(err);
          res.status(500).json({msg: 'internal server error'});
        });
      });
    });
  });

  router.delete('/pets/:id', function(req, res) {
    sql.sync()
    .then(function() {
      Pet.find(req.params.id)
      .then(function(data) {
        data.destroy()
        .then(function() {
          res.json({msg: 'successfully deleted'});
        })
        .error(function(err) {
          console.log(err);
          res.status(500).json({msg: 'internal server error'});
        });
      });
    });
  });
};