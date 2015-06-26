angular.module('eBlog')
.controller('LoginController', function($scope, $http, $state) {
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

		$http.post('/api/login', {
			username: username,
			password: password
		}).then(function(resp) {
			console.log(resp);
			console.log(resp.data.username);
			if(resp.data && resp.status && resp.status === 200) {
				$state.go('home.articleList',{
					user: resp.data.username
				});
			}
		}, function(resp) {
			console.log('error:'+JSON.stringify(resp));
		});
	};

	$scope.keyup = function() {
		errorSign.css({"display":"none"});
	};
});