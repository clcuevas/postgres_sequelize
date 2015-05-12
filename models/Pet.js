'use strict';

var Sql = require('sequelize');
var sql = new Sql('pet_dev', 'pet_dev', 'soccer15', {
  dialect: 'postgres'
});

var NewPet = module.exports = sql.define('NewPet', {
  name: Sql.STRING,
  owner: Sql.STRING,
  weight: Sql.INTEGER,
  type: Sql.STRING
});

NewPet.sync();