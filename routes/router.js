var users = require('../app/controller/users');
var registModules = require('../app/controller/registModules');

/* GET home page. */
// router.get('/', function(req, res) {
// 	res.sendFile('public/index.html');
// });

//handle user requests
// router.post('/api/login', function(req, res, next) {
// 	console.log("-------------------wrrrrrronglllllllllll111111111111")
// }, users.login);
// router.post('/api/register', function(req, res, next) {
// 	console.log("-------------------22222222222222222222")
// }, users.register);

//handle module requests
// router.post('/api/regist/add', registModules.add);
// router.get('/api/regist', registModules.getAll);
// router.get('/api/regist/:id', registModules.getOne);
// router.post('/api/regist/:id', registModules.update);
// router.delete('/api/regist/:id', registModules.del);

// module.exports = router;


module.exports = function(app) {
	app.post('/api/login',users.login);
	app.post('/api/register', users.register);
};