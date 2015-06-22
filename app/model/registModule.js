//model 层直接与数据库打交道
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ModuleSchema = new Schema({
    account: String,
    apartment: String,
    arriveTime: String,
    company: String,
    name: String,
    productLevel: String,
    projectCharger: String,
    projectClient: String,
    receiptPlace: String,
    register: String,
    registerDate: String,
    remark: String
});

ModuleSchema.methods = {

};


mongoose.model('RegistModel', ModuleSchema);