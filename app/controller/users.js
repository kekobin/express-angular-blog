var mongoose = require('mongoose');
var User = mongoose.model('User');

exports.login = function(req, res) {
	var name = req.body.name;
	var password = req.body.password;
	console.log('login start......');
	console.log(req.body);
	User.findOne({
		name: name
	}, function(err, user) {
		console.log('---find user---');
		console.log(user);
		if(user) {
			if(user.password === password) {
				res.send(user);
			} else {
				res.send('errorPwd');
			}
		} else {
			res.send('noExist');
		}
	});
};

exports.register = function(req, res) {
	var name = req.body.name;
	var password = req.body.password;

	User.findOne({
		name: name
	}, function(err, user) {
		if (!user) {
			var user = new User({
				name: name,
				password: password
			});

			user.save(function(err, user) {
				if (!err)
					res.send('success');
				else
					res.send('error');
			});
		} else {
			res.send('exist');
		}
	});
};