angular.module('eBlog')
	.controller('RegisterController', function($scope, $http, $state) {
		var element = angular.element(document.getElementById("registerForm"));
		var errorSign = angular.element(document.getElementById("errorSign2"));
		var input = element.find("input");

		$scope.register = function() {
			var username = $scope.username;
			var nickname = $scope.nickname;
			var password = $scope.password;
			var password2 = $scope.password2;

			if(password2 != password) return;

			$http.post('/blog/register', {
				username: username,
				nickname: nickname,
				password: password,
				introduction: '世界很大，我想去看看!~',
				avatar: '/img/avatar-default.png'
			}).then(function(resp) {
				console.log("----this is register------");
				console.log(resp)
				if (resp.data && resp.status && resp.status === 200) {
					$state.go('blog.login');
				}
			}, function(resp) {
				console.log('error:' + JSON.stringify(resp));
			});
		};

		$scope.keyup = function() {
			errorSign.css({"display": "none"});
		};
	});