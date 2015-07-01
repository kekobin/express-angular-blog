var mongoose = require('mongoose');
var User = mongoose.model('User');
var passport = require('passport');

exports.register = function(req, res) {
	var u = new User({ 
		username : req.body.username, 
		nickname: req.body.nickname,
		introduction: req.body.introduction,
		avatar: req.body.avatar
	});

	User.register(u, req.body.password, function(err, user) {
        if (err) {
          return res.send(err);
        }

        passport.authenticate('local')(req, res, function () {
            res.send(user);
        });
    });
};

exports.update = function(req, res) {
	var data = req.body.data;
    var id = req.params.id;
    var u = { 
		username : data.username, 
		nickname: data.nickname,
		introduction: data.introduction,
		avatar: data.avatar,
		password: data.password
	};
	
    User.findById(id, function(err, user) {
        if(err) res.send(err);
        user.nickname = u.nickname;
        user.introduction = u.introduction;
        user.avatar = u.avatar;
        user.setPassword(u.password, function() {
        	user.save(function(err, docs) {
        		if(err) res.send(err);
	       		res.send(docs);
	        });
        });
    });
};

exports.getAll = function(req, res) {
    User.find({}, function(err, docs) {
        if(err) res.send(err);
        res.send(docs);
    });
};

exports.del = function(req, res) {
    var id = req.params.id;
    
    User.remove({_id: id}, function(err, docs) {
        if(err) res.send(err);
        res.send(docs);
    });
};;