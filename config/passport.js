var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function(app, config) {
	// passport config
	var User = require(config.root + '/app/model/user');
	passport.use(new LocalStrategy(User.authenticate()));
	passport.serializeUser(User.serializeUser());
	passport.deserializeUser(User.deserializeUser());
}