angular.module('eBlog')
.controller('LoginController',['$scope', '$http', '$state', 'userService','$rootScope', function($scope, $http, $state, userService,$rootScope) {
	$('.no-write').show();
		$('.home-write').hide();
	var element = angular.element(document.getElementById("loginForm"));
	var errorSign = angular.element(document.getElementById("errorSign"));
	var input = element.find("input");

	$scope.login = function() {
		var username = $scope.username;
		var password = $scope.password;
		
		$http.post('/blog/login', {
			username: username,
			password: password
		}).then(function(resp) {
			if(resp.data && resp.status && resp.status === 200) {
				var user = {
					id:resp.data._id,
					name: resp.data.username,
					nickname: resp.data.nickname,
					avatar: resp.data.avatar,
					introduction: resp.data.introduction
				};

				sessionStorage.setItem('user', JSON.stringify(user));

				$rootScope.user = user;
				userService.init(user);
				$state.go('blog.articleList');
			}
		}, function(resp) {
			$('.login-tip').fadeIn('slow');
			setTimeout(function() {
				$('.login-tip').fadeOut('slow');
			}, 2500);
		});
	};

	$scope.keyup = function() {
		errorSign.css({"display":"none"});
	};
}]);