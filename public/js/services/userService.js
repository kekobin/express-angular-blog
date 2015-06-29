angular.module('eBlog')
.factory('userService', function() {
	var user = {};

	return {
		init: function(tempUser) {
			user = tempUser;
		},
		get: function() {
			return user;
		},
		getId: function() {
			return user.id;
		},
		getName: function() {
			return user.name;
		}
	}
});