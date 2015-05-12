'use strict';

require('../server.js');

var chai = require('chai');
var chaihttp = require('chai-http');
chai.use = (chaihttp);
var expect = chai.expect;

var Pet = require('../models/Pet.js');