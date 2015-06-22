angular.module('eBlog')
.controller('LoginController', function($scope, $http, $state) {
	var element = angular.element(document.getElementById("loginForm"));
	var errorSign = angular.element(document.getElementById("errorSign"));
	var input = element.find("input");

	$scope.login = function() {
		var name = $scope.username;
		var password = $scope.password;
		
		if(!name) {
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
			name: name,
			password: password
		}).then(function(resp) {
			console.log('success:'+JSON.stringify(resp));
			if(resp.data && resp.status && resp.status === 200) {
				if(resp.data === 'success') {
					$state.go('home.articleList');
				} else {

				}
			}
		}, function(resp) {
			console.log('error:'+JSON.stringify(resp));
		});
	};

	$scope.keyup = function() {
		errorSign.css({"display":"none"});
	};
});