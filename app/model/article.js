var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    user: String,
    title: String,
    content: String,
    type: String,
    time: String
});

ArticleSchema.methods = {};


mongoose.model('ArticleModel', ArticleSchema);