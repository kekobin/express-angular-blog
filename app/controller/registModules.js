var mongoose = require('mongoose');
var Model = mongoose.model('RegistModel');
var modelInstance = new Model();

exports.add = function(req, res) {
    var data = req.body.data;

    Model.create(data, function(err, docs) {
        if(err) res.send(err);
        res.send(docs);
    });
};

exports.getOne = function(req, res) {
    var id = req.params.id;

    Model.findById(id, function(err, docs) {
        if(err) res.send(err);
        res.send(docs);
    });
};

exports.getAll= function(req, res) {
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
    
    Model.remove({_id: id}, function(err) {
        res.send(err);
    });
};