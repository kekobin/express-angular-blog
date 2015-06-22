var path = require('path'),
	rootPath = path.normalize(__dirname + '/..');

module.exports = {
	db: 'mongodb://localhost/eBlog',
	root: rootPath,
	app: {
		name: 'eBlog'
	}
};