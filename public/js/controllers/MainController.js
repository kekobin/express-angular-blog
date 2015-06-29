angular.module('eBlog')
.controller('MainController', ['$rootScope','userService','$http', function($rootScope,userService,$http) {
	var user = JSON.parse(sessionStorage.getItem('user'));

	if(user) {
		console.log(user)
		userService.init(user);
	}

	$rootScope.user = user;
}]);

