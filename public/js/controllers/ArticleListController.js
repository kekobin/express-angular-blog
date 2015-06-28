angular.module('eBlog')
.controller('ArticleListController', ['$scope', '$state', '$http', 'userService', function($scope, $state, $http, userService) {
	$scope.user = userService.get();
	console.log($scope.user);
	$scope.goToDetail = function() {
		$state.go("home.articleDetail");
	}
}]);

