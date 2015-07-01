var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    uid: String,
    user: {
        id:String,
        username: String,
        nickname: String,
        avatar: String,
        introduction: String
    },
    title: String,
    content: String,
    type: String,
    time: String,
    pv: String,
    comment: Array
});

ArticleSchema.methods = {};


mongoose.model('ArticleModel', ArticleSchema);