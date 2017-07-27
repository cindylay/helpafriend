"use strict";

//call the packages that we need
var express = require('express');
var app = express();
var router = require('./routes')
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');
var validator = require('express-validator');
var mongoose = require('mongoose');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Now I am registering the routes. All routes will be prefixed with /api
app.use('/api', router);

var port = process.env.PORT || 8080; //setting our port to run locally first!!!!!!!!!!!!!!!!!!!!!

mongoose.connect(process.env.MONGODB_URI);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(validator());

app.use(express.static(path.join(__dirname, 'public')));

var routes = require('./routes');
app.use('/', routes)

app.listen(process.env.PORT || 8080);
