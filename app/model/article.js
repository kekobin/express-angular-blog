var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    uid: String,
    username: String,
    title: String,
    content: String,
    type: String,
    time: String,
    pv: String,
    comment: Array
});

ArticleSchema.methods = {};


mongoose.model('ArticleModel', ArticleSchema);