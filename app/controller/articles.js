var mongoose = require('mongoose');
var Model = mongoose.model('ArticleModel');
var modelInstance = new Model();

exports.add = function(req, res) {
    var data = req.body.data;

    Model.create(data, function(err, docs) {
        if(err) return res.send(err);
        res.send(docs);
    });
};

exports.getByUid = function(req, res) {
    var uid = req.params.uid;

    Model.find({uid: uid}, function(err, docs) {
        if(err) return res.send(err);
        res.send(docs);
    });
};

exports.getByType = function(req, res) {
    var type = req.params.type;

    Model.find({type: type}, function(err, docs) {
        if(err) return res.send(err);
        res.send(docs);
    });
};

exports.getById = function(req, res) {
    var id = req.params.id;
    var user = req.user;

    Model.findById(id, function(err, docs) {
        if(err) return res.send(err);
        //add pv statistics
        if(user == undefined || user.username != docs.user.username) {
            var pv = parseInt(docs.pv) + 1;

            Model.findByIdAndUpdate(id, {
                pv:pv
            }, function(err, docs) {
                if(err) return res.send(err);
                 res.send(docs);
            });
        } else {
            res.send(docs);
        }
    });
};

exports.getAll = function(req, res) {
    Model.find({}, function(err, docs) {
        if(err) return res.send(err);
        res.send(docs);
    });
};

exports.update = function(req, res) {
    var data = req.body.data;
    var id = req.params.id;

    Model.findByIdAndUpdate(id, data, function(err, docs) {
        if(err) return res.send(err);
        res.send(docs);
    });
};

exports.updateUser = function(req, res) {
    var data = req.body.data;
    var uid = req.params.uid;

    Model.find({uid: uid}, function(err, articles) {
        if(err) return res.send(err);

        articles.forEach(function(article) {
            article.set({
                user: {
                    nickname: data.nickname,
                    introduction: data.introduction,
                    avatar: data.avatar
                }
            });

            var comments = article.comment;

            comments.forEach(function(comment) {
                var tuser = comment.tuser;
                var cuser = comment.cuser;
                var replys = comment.reply;

                if(tuser.id == uid) {
                    tuser.nickname = data.nickname;
                    tuser.introduction = data.introduction;
                    tuser.avatar = data.avatar;
                }
                if(cuser.id == uid) {
                    cuser.nickname = data.nickname;
                    cuser.introduction = data.introduction;
                    cuser.avatar = data.avatar;
                }

                replys.forEach(function(reply) {
                    var ruser = reply.user;
                    if(ruser.id == uid) {
                        ruser.nickname = data.nickname;
                        ruser.introduction = data.introduction;
                        ruser.avatar = data.avatar;
                    }
                });
            });

            article.markModified('comment');
            article.save();
        });
    });
};

exports.del = function(req, res) {
    var id = req.params.id;
    
    Model.remove({_id: id}, function(err, docs) {
        if(err) return res.send(err);
        res.send(docs);
    });
};