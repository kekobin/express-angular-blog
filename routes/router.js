var users = require('../app/controller/users');
var articles = require('../app/controller/articles');
var passport = require('passport');

module.exports = function(app, config) {
	app.post('/login', passport.authenticate('local'), function(req, res) {
		res.send(req.user);
	});

	app.post('/register', users.register);

	app.get('/logout', function(req, res) {
		req.logout();
		res.send('redirect');
	});

	//article
	app.post('/api/article',articles.add);


	//put all API routes before the route for every path
	app.get('*', function(req, res) {
		res.sendFile(config.root + '/public/index.html');
	});
};