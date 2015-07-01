var mongoose = require('mongoose');
var Model = mongoose.model('ArticleModel');
var modelInstance = new Model();

exports.add = function(req, res) {
    var data = req.body.data;

    Model.create(data, function(err, docs) {
        if(err) res.send(err);
        res.send(docs);
    });
};

exports.getByUid = function(req, res) {
    var uid = req.params.uid;

    Model.find({uid: uid}, function(err, docs) {
        if(err) res.send(err);
        res.send(docs);
    });
};

exports.getByType = function(req, res) {
    var type = req.params.type;

    Model.find({type: type}, function(err, docs) {
        if(err) res.send(err);
        res.send(docs);
    });
};

exports.getById = function(req, res) {
    var id = req.params.id;
    var user = req.user;

    Model.findById(id, function(err, docs) {
        if(err) res.send(err);
        //add pv statistics
        if(user == undefined || user.username != docs.username) {
            var pv = parseInt(docs.pv) + 1;

            Model.findByIdAndUpdate(id, {
                pv:pv
            }, function(err, docs) {
                if(err) res.send(err);
                 res.send(docs);
            });
        } else {
            res.send(docs);
        }
    });
};

exports.getAll = function(req, res) {
    Model.find({}, function(err, docs) {
        if(err) res.send(err);
        res.send(docs);
    });
};

exports.update = function(req, res) {
    var data = req.body.data;
    var id = req.params.id;

    Model.findByIdAndUpdate(id, data, function(err, docs) {
        if(err) res.send(err);
        res.send(docs);
    });
};

exports.del = function(req, res) {
    var id = req.params.id;
    
    Model.remove({_id: id}, function(err, docs) {
        if(err) res.send(err);
        res.send(docs);
    });
};