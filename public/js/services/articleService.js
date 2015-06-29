angular.module('eBlog')
.factory('articleService', function() {
	var article = {};

	return {
		set: function(target) {
			article = target;
		}, 
		get: function() {
			return article;
		}
	};
});