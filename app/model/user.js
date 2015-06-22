//model 层直接与数据库打交道 
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var UserSchema = new Schema({
	name: String,
	password: String
});

UserSchema.methods = {

};


mongoose.model('User', UserSchema);