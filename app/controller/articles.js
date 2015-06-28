var mongoose = require('mongoose');
var Model = mongoose.model('ArticleModel');
var modelInstance = new Model();

exports.add = function(req, res) {
    console.log('---this is article adding---');
    console.log(req.body.data);
    var data = req.body.data;

    Model.create(data, function(err, docs) {
        if(err) res.send(err);
        res.send(docs);
    });
};
