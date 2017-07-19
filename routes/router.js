var users = require('../app/controller/users');
var articles = require('../app/controller/articles');
var passport = require('passport');
var formidable = require('formidable');
var fs = require('fs');

module.exports = function(app, config) {
	app.post('/blog/login', passport.authenticate('local'), function(req, res) {
		res.send(req.user);
	});

	app.post('/blog/register', users.register);
	app.post('/blog/api/user/:id', users.update);
	app.get('/blog/api/user', users.getAll);
	app.get('/blog/api/user/:id', users.getById);
	app.delete('/api/user/:id',users.del);

	app.get('/blog/logout', function(req, res) {
		req.logout();
		res.send('redirect');
	});

	//article
	app.post('/blog/api/article',articles.add);
	app.get('/blog/api/article',articles.getAll);
	app.get('/blog/api/article/t/:type',articles.getByType);
	app.get('/blog/api/article/:uid',articles.getByUid);
	app.get('/blog/api/article/d/:id',articles.getById);
	app.put('/blog/api/article/:id',articles.update);
	app.put('/blog/api/article/u/:uid',articles.updateUser);
	app.delete('/blog/api/article/:id',articles.del);

	app.post('/blog/upload', function(req, res) {
	    var form = new formidable.IncomingForm();
	    form.uploadDir = config.root+"/public/upload";

	    //设置上传数据的编码
	    form.encoding='utf-8';
	    //设置是否保持上传文件的拓展名
	    form.keepExtensions = true;
	    //文件上传过程中触发可以做上传进度查看
	    form.on('progress', function(bytesReceived, bytesExpected) {
	        if(bytesExpected>1024*1024*3){//bytesExpected为等待上传的文件的大小，超过大小就返回错手动触发error
	            this.emit('error',"文件过大")
	        };
	    });
	    //文件上传成功后触发
	    form.on('file', function(name, file) {
	    	console.log('.....print file name......');
	    	console.log(file);
	    	console.log(name);
	        //成功上传，把临时文件移动到public文件夹下面ivfg
	        fs.renameSync(file.path, config.root+"/public/upload/" + file.name);
	    });
	    //流程正常处理
	    //form.on('end',function(){
	    //    console.log(arguments);
	    //});
	    //出错
	    //form.on('error',function(err){
	    //    res.end(err);
	    //})
	    //执行文件上传任务
	    form.parse(req,function(err, fields, files){
	        res.send({
	            success : true,
	            file_path : '/upload/' + files.upfile.name
	        });
	    });
	});


	//put all API routes before the route for every path
	app.get('*', function(req, res) {
		res.sendFile(config.root + '/public/index.html');
	});
};