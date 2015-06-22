angular.module('eBlog')
.controller('HomeController', ['$scope', '$state', function($scope, $state) {
	$scope.signIn = function() {
		$state.go("login");
	};

	$scope.regist = function() {
		$state.go("register");
	};
}]);

