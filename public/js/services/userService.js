angular.module('eBlog')
.factory('userService', function() {
	var user = {};

	return {
		init: function(tempUser) {
			user = tempUser;
		},
		get: function() {
			return user;
		}
	}
});