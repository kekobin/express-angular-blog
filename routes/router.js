var users = require('../app/controller/users');
var registModules = require('../app/controller/registModules');
var passport = require('passport');

module.exports = function(app,config) {
	app.post('/api/login', passport.authenticate('local'), function(req, res) {
	    res.send(req.user);
	});

	app.post('/api/register', users.register);

	//put all API routes before the route for every path
	app.get('*', function (req, res) {
	    res.sendFile(config.root + '/public/index.html');
	});
};