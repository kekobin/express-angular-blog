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
	app.get('/api/article',articles.getAll);
	app.get('/api/article/t/:type',articles.getByType);
	app.get('/api/article/:uid',articles.getByUid);
	app.get('/api/article/d/:id',articles.getById);
	app.put('/api/article/:id',articles.update);
	app.delete('/api/article/:id',articles.del);


	//put all API routes before the route for every path
	app.get('*', function(req, res) {
		res.sendFile(config.root + '/public/index.html');
	});
};