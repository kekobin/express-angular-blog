var express = require('express');
var mongoose = require('mongoose');
var config = require('./config/config');
var fs = require('fs');
var app = express();
var passport = require('passport');

//connect to mongodb
var connect = function() {
    mongoose.connect(config.db);
};

connect();
mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', connect);

//require all models
var models_path = config.root + '/app/model';
fs.readdirSync(models_path).forEach(function(file) {
    require(models_path + '/' + file);
});

//require base setting
require('./config/setting')(app, config, passport);

//require passport
require('./config/passport')(app, config);

//handle all router of API
// require('./routes/router')(app, config);

module.exports = app;
