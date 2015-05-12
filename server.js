'use strict';

var express = require('express');
var app = express();
var petRouter = express.Router();

require('./routes/pet_routes')(petRouter);

app.use('/api', petRouter);
app.listen(3000, function() {
  console.log('server running');
});