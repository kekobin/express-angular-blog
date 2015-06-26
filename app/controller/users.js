var mongoose = require('mongoose');
var User = mongoose.model('User');
var passport = require('passport');

exports.register = function(req, res) {
	User.register(new User({ username : req.body.username }), req.body.password, function(err, user) {
        if (err) {
          return res.send(err);
        }

        passport.authenticate('local')(req, res, function () {
            res.send(user);
        });
    });
};