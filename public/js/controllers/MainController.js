angular.module('eBlog')
.controller('MainController', ['$rootScope','userService','$http','articleService','$state', '$timeout', function($rootScope,userService,$http,articleService,$state,$timeout) {
	var user = JSON.parse(sessionStorage.getItem('user'));

	if(user) {
		// console.log(user)
		userService.init(user);
	}

	$rootScope.user = user;

	$rootScope.logout = function() {
		$http.get('/blog/logout').then(function(resp) {
			sessionStorage.removeItem('user');
			articleService.clear();
			userService.clear();

			$state.go('blog.articleList');
			$timeout(function() {
				location.reload();
			},100);
		});
	};
}]);

