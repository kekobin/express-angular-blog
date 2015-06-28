angular.module('eBlog')
.controller('LoginController',['$scope', '$http', '$state', 'userService','$rootScope', function($scope, $http, $state, userService,$rootScope) {
	var element = angular.element(document.getElementById("loginForm"));
	var errorSign = angular.element(document.getElementById("errorSign"));
	var input = element.find("input");

	$scope.login = function() {
		var username = $scope.username;
		var password = $scope.password;
		
		if(!username) {
			errorSign.css({"top":"24px", "display":"block"});
			input[0].focus();
			return false;
		}
		if(!password) {
			errorSign.css({"top":"92px", "display":"block"});
			input[1].focus();
			return false;
		}

		$http.post('/login', {
			username: username,
			password: password
		}).then(function(resp) {
			console.log(resp);
			console.log(resp.data.username);
			if(resp.data && resp.status && resp.status === 200) {
				$rootScope.user = resp.data;
				userService.init(resp.data);
				$state.go('home.articleList');
			}
		}, function(resp) {
			console.log('error:'+JSON.stringify(resp));
		});
	};

	$scope.keyup = function() {
		errorSign.css({"display":"none"});
	};
}]);