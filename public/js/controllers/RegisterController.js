angular.module('eBlog')
	.controller('RegisterController', function($scope, $http, $state) {
		var element = angular.element(document.getElementById("registerForm"));
		var errorSign = angular.element(document.getElementById("errorSign2"));
		var input = element.find("input");

		$scope.register = function() {
			var name = $scope.username;
			var password = $scope.password;
			var password2 = $scope.password2;

			if (!name) {
				errorSign.css({"top": "24px","display": "block"});
				input[0].focus();
				return false;
			}
			if (!password) {
				errorSign.css({"top": "92px","display": "block"});
				input[1].focus();
				return false;
			}
			if (!password2 || password !== password2) {
				errorSign.css({"top": "120px","display": "block"});
				input[1].focus();
				return false;
			}

			$http.post('/api/register', {
				name: name,
				password: password
			}).then(function(resp) {
				console.log("----this is register------");
				console.log(resp)
				if (resp.data && resp.status && resp.status === 200) {
					$state.go('login');
				}
			}, function(resp) {
				console.log('error:' + JSON.stringify(resp));
			});
		};

		$scope.keyup = function() {
			errorSign.css({"display": "none"});
		};
	});